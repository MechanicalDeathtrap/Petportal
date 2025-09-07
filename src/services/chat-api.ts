import { ChatRoom, ChatMessage, CreateRoomRequest, SendMessageRequest } from '../types/chat-types';

class ChatApiService {
  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`http://localhost:5140/api${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: 'include', // Добавляем cookies для авторизации
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return response.json();
  }

  // Получить чаты пользователя
  async getChatRooms(userId: string): Promise<ChatRoom[]> {
    return this.request<ChatRoom[]>(`/chat/rooms/${userId}`);
  }

  // Получить чат по идентификатору
  async getChatRoom(roomId: string): Promise<ChatRoom> {
    return this.request<ChatRoom>(`/chat/room/${roomId}`);
  }

  // POST /api/chat/room
  async createChatRoom(data: CreateRoomRequest): Promise<ChatRoom> {
    return this.request<ChatRoom>(`/chat/room`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // GET /api/chat/messages/{roomId}
  async getMessages(roomId: string): Promise<ChatMessage[]> {
    return this.request<ChatMessage[]>(`/chat/messages/${roomId}`);
  }

  // POST /api/chat/messages/send
  async sendMessage(data: SendMessageRequest): Promise<ChatMessage> {
    return this.request<ChatMessage>(`/chat/messages/send`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // GET /api/chat/messages/{roomId}/last/{count}
  async getLastMessages(roomId: string, count: number): Promise<ChatMessage[]> {
    return this.request<ChatMessage[]>(`/chat/messages/${roomId}/last/${count}`);
  }

  // DELETE /api/chat/messages/{messageId}
  async deleteMessage(messageId: string): Promise<void> {
    return this.request<void>(`/chat/messages/${messageId}`, {
      method: 'DELETE',
    });
  }
}

export const chatApiService = new ChatApiService(); 