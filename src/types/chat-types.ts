export type ChatRoom = {
  id: string;
  name: string;
  participants: string[];
  userIds?: string[]; // добавлено для поддержки маппинга с бэкенда
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
};

export type ChatMessage = {
  id: string;
  chatRoomId: string;
  senderId: string;
  senderName: string;
  message: string;
  sentAt: string;
  isRead: boolean;
};

export type CreateRoomRequest = {
  name: string;
  userIds: string[];
};

export type SendMessageRequest = {
  chatRoomId: string;
  message: string;
  senderId: string;
  senderName: string;
};

export type ChatUser = {
  id: string;
  userName: string;
  avatarUrl?: string;
  lastMessage?: string;
  sentTime?: string;
  isRead?: boolean;
  unreadCount?: number;
}; 