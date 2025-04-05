
export type ChatUser = {
  id: number;
  userName: string;
  lastMessage: string;
  sentTime?: Date
  isRead?: boolean
}