import { makeAutoObservable, runInAction } from "mobx";
import { ChatRoom, ChatMessage } from "../types/chat-types";
import { chatApiService } from "../services/chat-api";
import { userStore } from "./user-store";

const BASE_TITLE = "PetPortal";
const RESPOND_SYSTEM_RE = /откликнулся на ваш проект\.?$/i;

export function isSystemChatMessage(message: string): boolean {
  return RESPOND_SYSTEM_RE.test(message.trim());
}

export function getChatPeerName(chat: ChatRoom, currentUserId: string): string {
  const participants = chat.participants ?? chat.userIds ?? [];
  const names = chat.participantNames ?? {};

  if (participants.length === 1) {
    const selfName = names[participants[0]]
      || `${userStore.user.firstName} ${userStore.user.lastName}`.trim();
    return selfName || "Вы";
  }

  if (participants.length === 2) {
    const otherId = participants.find((id) => id !== currentUserId);
    if (otherId) {
      return names[otherId] || "Пользователь";
    }
  }

  // Групповой / fallback: имя не из сырого id комнаты
  if (chat.name && !chat.name.startsWith("Отклик ·") && !chat.name.startsWith("Команда ·")) {
    return chat.name;
  }

  const other = participants.find((id) => id !== currentUserId);
  if (other && names[other]) return names[other];
  return "Чат";
}

export class ChatStore {
  chats: ChatRoom[] = [];
  messages: Record<string, ChatMessage[]> = {};
  activeChatId: string | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  totalUnread: number = 0;
  private titleFlashTimer: ReturnType<typeof setInterval> | null = null;
  private originalTitle = BASE_TITLE;

  constructor() {
    makeAutoObservable(this);
  }

  async loadChatRooms() {
    if (!userStore.user.id) return;

    this.setLoading(true);
    this.setError(null);

    try {
      const chats = await chatApiService.getChatRooms(userStore.user.id);
      this.setChats(chats);
      void import("../services/chat-realtime").then((m) =>
        m.chatRealtimeService.joinAllRooms()
      );
    } catch (error) {
      this.setError(error instanceof Error ? error.message : "Ошибка загрузки чатов");
    } finally {
      this.setLoading(false);
    }
  }

  async loadMessages(roomId: string) {
    this.setLoading(true);
    this.setError(null);

    try {
      const messages = await chatApiService.getMessages(roomId);
      this.setMessages(roomId, messages);
      this.markChatRead(roomId);
    } catch (error) {
      this.setError(error instanceof Error ? error.message : "Ошибка загрузки сообщений");
    } finally {
      this.setLoading(false);
    }
  }

  async sendMessage(roomId: string, message: string) {
    if (!userStore.user.id) return;

    try {
      const messagePayload = {
        chatRoomId: roomId,
        message,
        senderId: userStore.user.id,
        senderName:
          `${userStore.user.firstName} ${userStore.user.lastName}`.trim() || "Вы",
      };

      const newMessage = await chatApiService.sendMessage(messagePayload);

      const localMessage: ChatMessage = {
        id: newMessage.id || `local-${Date.now()}`,
        chatRoomId: roomId,
        senderId: userStore.user.id,
        senderName:
          newMessage.senderName ||
          `${userStore.user.firstName} ${userStore.user.lastName}`.trim() ||
          "Вы",
        message: newMessage.message || message,
        sentAt: newMessage.sentAt || new Date().toISOString(),
        isRead: true,
      };

      this.appendMessage(localMessage, { fromSelf: true });
    } catch (error) {
      console.error("Ошибка отправки сообщения:", error);
      this.setError(error instanceof Error ? error.message : "Ошибка отправки сообщения");
    }
  }

  handleIncomingMessage(raw: ChatMessage) {
    if (!raw) return;

    const message: ChatMessage = {
      id: raw.id,
      chatRoomId: raw.chatRoomId,
      senderId: raw.senderId,
      senderName: raw.senderName || "Пользователь",
      message: raw.message,
      sentAt: this.normalizeTimestamp(raw.sentAt),
      isRead: false,
    };

    const fromSelf = message.senderId === userStore.user.id;
    this.appendMessage(message, { fromSelf });
  }

  private appendMessage(message: ChatMessage, opts: { fromSelf: boolean }) {
    const roomId = message.chatRoomId;
    if (!roomId) return;

    runInAction(() => {
      if (!this.messages[roomId]) {
        this.messages[roomId] = [];
      }

      if (this.messages[roomId].some((m) => m.id === message.id)) {
        return;
      }

      this.messages[roomId].push({
        ...message,
        sentAt: this.normalizeTimestamp(message.sentAt),
      });

      let chat = this.chats.find((c) => c.id === roomId);
      if (!chat) {
        // Новый чат (например, отклик) — подтянем список
        void this.loadChatRooms();
        chat = {
          id: roomId,
          name: "",
          participants: [],
          lastMessage: message.message,
          lastMessageTime: message.sentAt,
          unreadCount: opts.fromSelf ? 0 : 1,
        };
        this.chats = [chat, ...this.chats];
      } else {
        chat.lastMessage = message.message;
        chat.lastMessageTime = message.sentAt;
      }

      const isViewingThisChat =
        this.activeChatId === roomId &&
        typeof window !== "undefined" &&
        window.location.pathname.startsWith("/chat") &&
        !document.hidden;

      if (!opts.fromSelf && !isViewingThisChat) {
        chat.unreadCount = (chat.unreadCount || 0) + 1;
        this.recalcTotalUnread();
        this.flashTabTitle(message.senderName || "Новое сообщение");
      } else if (!opts.fromSelf && isViewingThisChat) {
        this.markChatRead(roomId);
      }
    });
  }

  markChatRead(roomId: string) {
    const chat = this.chats.find((c) => c.id === roomId);
    if (chat && chat.unreadCount) {
      chat.unreadCount = 0;
      this.recalcTotalUnread();
    }
    if (this.totalUnread === 0) {
      this.stopTitleFlash();
    }
    void chatApiService.markRoomAsRead(roomId).catch(() => {
      /* ignore */
    });
  }

  private recalcTotalUnread() {
    this.totalUnread = this.chats.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
    if (this.totalUnread === 0) {
      this.stopTitleFlash();
    }
  }

  private flashTabTitle(preview: string) {
    if (typeof document === "undefined") return;
    this.stopTitleFlash();
    this.originalTitle = document.title || BASE_TITLE;
    let showAlt = true;
    document.title = `(${this.totalUnread}) Новое сообщение`;
    this.titleFlashTimer = setInterval(() => {
      document.title = showAlt
        ? `(${this.totalUnread}) ${preview}`
        : this.originalTitle;
      showAlt = !showAlt;
    }, 1200);
  }

  stopTitleFlash() {
    if (this.titleFlashTimer) {
      clearInterval(this.titleFlashTimer);
      this.titleFlashTimer = null;
    }
    if (typeof document !== "undefined") {
      document.title = this.originalTitle || BASE_TITLE;
    }
  }

  async createChatRoom(name: string, userIds: string[]) {
    const existing = this.chats.find(
      (chat) =>
        chat.participants.length === userIds.length &&
        chat.participants.every((id) => userIds.includes(id))
    );
    if (existing) {
      this.setActiveChatId(existing.id);
      return existing;
    }

    try {
      const newRoom = await chatApiService.createChatRoom({
        name,
        userIds,
      });
      this.chats.push(this.normalizeRoom(newRoom));
      void import("../services/chat-realtime").then((m) =>
        m.chatRealtimeService.joinRoom(newRoom.id)
      );
      return newRoom;
    } catch (error) {
      console.error("Ошибка создания чата:", error);

      const errorMessage = error instanceof Error ? error.message : String(error);

      if (errorMessage.includes("409")) {
        try {
          await this.loadChatRooms();
          const loadedChat = this.chats.find(
            (chat) =>
              chat.participants.length === userIds.length &&
              chat.participants.every((id) => userIds.includes(id))
          );
          if (loadedChat) {
            this.setActiveChatId(loadedChat.id);
            return loadedChat;
          }
        } catch (loadError) {
          console.error("Ошибка загрузки чатов:", loadError);
        }
      }

      this.setError(error instanceof Error ? error.message : "Ошибка создания чата");
      throw error;
    }
  }

  async createSelfChat() {
    if (!userStore.user.id) return;

    try {
      return await this.createChatRoom("Чат с собой", [userStore.user.id]);
    } catch (error) {
      console.error("Ошибка создания чата с собой:", error);
    }
  }

  async deleteMessage(messageId: string, roomId: string) {
    try {
      await chatApiService.deleteMessage(messageId);

      if (this.messages[roomId]) {
        this.messages[roomId] = this.messages[roomId].filter(
          (message) => message.id !== messageId
        );
      }
    } catch (error) {
      this.setError(error instanceof Error ? error.message : "Ошибка удаления сообщения");
    }
  }

  private normalizeRoom(chat: ChatRoom): ChatRoom {
    return {
      ...chat,
      participants: chat.participants ?? chat.userIds ?? [],
      participantNames: chat.participantNames ?? {},
      unreadCount: chat.unreadCount ?? 0,
    };
  }

  setChats(chats: ChatRoom[]) {
    const normalizedChats = chats.map((chat) => this.normalizeRoom(chat));

    const uniqueChats = normalizedChats.filter(
      (chat, index, self) => index === self.findIndex((c) => c.id === chat.id)
    );

    const userChats = uniqueChats.filter((chat) =>
      chat.participants.includes(userStore.user.id)
    );

    // Сохраняем локальные unread при перезагрузке списка
    const prevUnread = new Map(this.chats.map((c) => [c.id, c.unreadCount || 0]));
    this.chats = userChats.map((c) => ({
      ...c,
      unreadCount: prevUnread.get(c.id) ?? c.unreadCount ?? 0,
    }));
    this.recalcTotalUnread();
  }

  setMessages(roomId: string, messages: ChatMessage[]) {
    const mappedMessages = messages.map((msg) => ({
      ...msg,
      senderName: msg.senderName || "Пользователь",
      sentAt: this.normalizeTimestamp(msg.sentAt),
    }));

    const sortedMessages = mappedMessages.sort((a, b) => {
      return new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime();
    });

    this.messages[roomId] = sortedMessages;
  }

  private normalizeTimestamp(timestamp: string): string {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return new Date().toISOString();
      }
      return date.toISOString();
    } catch {
      return new Date().toISOString();
    }
  }

  setActiveChatId(id: string) {
    this.activeChatId = id;
    this.markChatRead(id);
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  get activeChat() {
    return this.activeChatId
      ? this.chats.find((chat) => chat.id === this.activeChatId)
      : null;
  }

  get activeChatMessages() {
    return this.activeChatId ? this.messages[this.activeChatId] || [] : [];
  }

  clearError() {
    this.error = null;
  }

  clearChats() {
    this.chats = [];
    this.messages = {};
    this.activeChatId = null;
    this.totalUnread = 0;
    this.stopTitleFlash();
  }
}

export const chatStore = new ChatStore();
