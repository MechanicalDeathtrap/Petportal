import { makeAutoObservable, runInAction } from "mobx";
import { ChatRoom, ChatMessage } from "../types/chat-types";
import { chatApiService } from "../services/chat-api";
import { userStore } from "./user-store";

export class ChatStore {
  chats: ChatRoom[] = [];
  messages: Record<string, ChatMessage[]> = {};
  activeChatId: string | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Загрузка чатов пользователя
  async loadChatRooms() {
    if (!userStore.user.id) return;

    this.setLoading(true);
    this.setError(null);

    try {
      const chats = await chatApiService.getChatRooms(userStore.user.id);
      this.setChats(chats);
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Ошибка загрузки чатов');
    } finally {
      this.setLoading(false);
    }
  }

  // Загрузка сообщений для конкретного чата
  async loadMessages(roomId: string) {
    this.setLoading(true);
    this.setError(null);

    try {
      // Загружаем все сообщения для чата
      const messages = await chatApiService.getMessages(roomId);
      this.setMessages(roomId, messages);
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Ошибка загрузки сообщений');
    } finally {
      this.setLoading(false);
    }
  }

  // Отправка сообщения
  async sendMessage(roomId: string, message: string) {
    if (!userStore.user.id) return;

    try {
      // Формируем payload для отправки
      const messagePayload = {
        chatRoomId: roomId,
        message,
        senderId: userStore.user.id,
        senderName: userStore.user.firstName || "Вы",
      };

      // Отправляем сообщение на сервер
      const newMessage = await chatApiService.sendMessage(messagePayload);

      // Создаём локальное сообщение с правильными данными
      const localMessage: ChatMessage = {
        id: newMessage.id || `local-${Date.now()}`,
        chatRoomId: roomId,
        senderId: userStore.user.id, // Используем ID текущего пользователя
        senderName: userStore.user.firstName || "Вы", // Используем имя текущего пользователя
        message: message, // Используем исходный текст сообщения
        sentAt: newMessage.sentAt, // Используем время от сервера
        isRead: false
      };

      // Добавляем новое сообщение в список
      runInAction(() => {
        if (!this.messages[roomId]) {
          this.messages[roomId] = [];
        }
        this.messages[roomId].push(localMessage);

        // Обновляем последнее сообщение в чате
        const chatIndex = this.chats.findIndex(chat => chat.id === roomId);
        if (chatIndex !== -1) {
          this.chats[chatIndex].lastMessage = message;
          this.chats[chatIndex].lastMessageTime = newMessage.sentAt;
      }});
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
      this.setError(error instanceof Error ? error.message : 'Ошибка отправки сообщения');
    }
  }

  // Создание нового чата
  async createChatRoom(name: string, userIds: string[]) {

    // Проверяем, есть ли уже такой чат в текущем состоянии
    const existing = this.chats.find(
      chat =>
        chat.participants.length === userIds.length &&
        chat.participants.every(id => userIds.includes(id))
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
      this.chats.push(newRoom);
      return newRoom;
    } catch (error) {
      console.error('Ошибка создания чата:', error);

      const errorMessage = error instanceof Error ? error.message : String(error);

      // Если ошибка 409 (чат уже существует) — загружаем чаты и активируем существующий
      if (errorMessage.includes('409')) {
        console.log('Чат уже существует, загружаем чаты с сервера...');
        try {
          await this.loadChatRooms();
          const loadedChat = this.chats.find(
            chat =>
              chat.participants.length === userIds.length &&
              chat.participants.every(id => userIds.includes(id))
          );
          if (loadedChat) {
            this.setActiveChatId(loadedChat.id);
            return loadedChat;
          }
        } catch (loadError) {
          console.error('Ошибка загрузки чатов:', loadError);
        }
      }

      this.setError(error instanceof Error ? error.message : 'Ошибка создания чата');
      throw error;
    }
  }

  // Создание чата с самим собой для тестирования
  async createSelfChat() {
    if (!userStore.user.id) return;

    try {
      const selfChat = await this.createChatRoom("Чат с собой", [userStore.user.id]);
      return selfChat;
    } catch (error) {
      console.error('Ошибка создания чата с собой:', error);
    }
  }

  // Удаление сообщения
  async deleteMessage(messageId: string, roomId: string) {
    try {
      await chatApiService.deleteMessage(messageId);

      // Удаляем сообщение из локального состояния
      if (this.messages[roomId]) {
        this.messages[roomId] = this.messages[roomId].filter(
          message => message.id !== messageId
        );
      }
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Ошибка удаления сообщения');
    }
  }

  setChats(chats: ChatRoom[]) {

    // Приводим участников к единому виду
    const normalizedChats = chats.map(chat => ({
      ...chat,
      participants: chat.participants ?? chat.userIds ?? [],
    }));

    // Убираем дубликаты по ID
    const uniqueChats = normalizedChats.filter(
      (chat, index, self) => index === self.findIndex(c => c.id === chat.id)
    );

    // Убираем дубликаты по составу участников
    const deduplicatedChats = uniqueChats.filter((chat, index, self) => {
      const chatUserIdsSorted = [...chat.participants].sort();
      return index === self.findIndex(otherChat => {
        const otherUserIdsSorted = [...otherChat.participants].sort();
        return (
          chatUserIdsSorted.length === otherUserIdsSorted.length &&
          chatUserIdsSorted.every((id, i) => id === otherUserIdsSorted[i])
        );
      });
    });

    // Фильтруем чаты по текущему пользователю
    const userChats = deduplicatedChats.filter(chat =>
      chat.participants.includes(userStore.user.id)
    );

    this.chats = userChats;
  }


  setMessages(roomId: string, messages: ChatMessage[]) {
    // Маппим сообщения от сервера к нашему формату
    const mappedMessages = messages.map(msg => ({
      ...msg,
      timestamp: msg.sentAt, // Используем sentAt если есть, иначе timestamp
      roomId: msg.chatRoomId, // Используем chatRoomId если есть, иначе roomId
    }));

    // Сортируем сообщения по времени (от старых к новым)
    const sortedMessages = mappedMessages.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return dateA - dateB;
    });

    // Убеждаемся, что timestamp в правильном формате
    const normalizedMessages = sortedMessages.map(msg => ({
      ...msg,
      timestamp: this.normalizeTimestamp(msg.timestamp)
    }));

    this.messages[roomId] = normalizedMessages;
  }

  // Нормализация timestamp для корректного отображения
  private normalizeTimestamp(timestamp: string): string {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        // Если timestamp некорректный, используем текущее время
        return new Date().toISOString();
      }
      return date.toISOString();
    } catch {
      // В случае ошибки парсинга используем текущее время
      return new Date().toISOString();
    }
  }

  setActiveChatId(id: string) {
    this.activeChatId = id;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  // Getters
  get activeChat() {
    return this.activeChatId ? this.chats.find(chat => chat.id === this.activeChatId) : null;
  }

  get activeChatMessages() {
    return this.activeChatId ? this.messages[this.activeChatId] || [] : [];
  }

  // Очистка состояния
  clearError() {
    this.error = null;
  }

  clearChats() {
    this.chats = [];
    this.messages = {};
    this.activeChatId = null;
  }
}

export const chatStore = new ChatStore();
