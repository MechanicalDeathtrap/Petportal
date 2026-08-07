import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { API_BASE_URL } from "../config/api";
import { ChatMessage } from "../types/chat-types";
import { chatStore } from "../stores/chat-store";
import { authStore } from "../stores/auth-store";
import { userStore } from "../stores/user-store";

class ChatRealtimeService {
  private connection: HubConnection | null = null;
  private starting: Promise<void> | null = null;

  async start() {
    if (!authStore.isAuthorized || !userStore.user.id) return;
    if (this.connection?.state === "Connected") return;
    if (this.starting) return this.starting;

    this.starting = this.connect().finally(() => {
      this.starting = null;
    });
    return this.starting;
  }

  private async connect() {
    if (this.connection) {
      try {
        await this.connection.stop();
      } catch {
        /* ignore */
      }
      this.connection = null;
    }

    this.connection = new HubConnectionBuilder()
      .withUrl(`${API_BASE_URL}/chat`, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build();

    this.connection.on("ReceiveMessage", (message: ChatMessage) => {
      chatStore.handleIncomingMessage(message);
    });

    this.connection.onreconnected(async () => {
      await this.joinAllRooms();
    });

    await this.connection.start();
    await this.joinAllRooms();
  }

  async joinAllRooms() {
    if (!this.connection || this.connection.state !== "Connected") return;
    const roomIds = chatStore.chats.map((c) => c.id);
    for (var roomId of roomIds) {
      try {
        await this.connection.invoke("JoinRoom", roomId);
      } catch {
        /* room may be invalid */
      }
    }
  }

  async joinRoom(roomId: string) {
    if (!this.connection || this.connection.state !== "Connected") return;
    try {
      await this.connection.invoke("JoinRoom", roomId);
    } catch {
      /* ignore */
    }
  }

  async stop() {
    if (this.connection) {
      try {
        await this.connection.stop();
      } catch {
        /* ignore */
      }
      this.connection = null;
    }
  }
}

export const chatRealtimeService = new ChatRealtimeService();
