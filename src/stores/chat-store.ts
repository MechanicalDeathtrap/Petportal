import { makeAutoObservable } from "mobx";

type Chat = {
  id: string;
  participants: string[];
};

type Message = {
  id: string;
  userName: string;
  message: string;
};

export class ChatStore {
  chats: Chat[] = [];
  messages: Record<string, Message[]> = {};
  activeChatId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setChats(chats: Chat[]) {
    this.chats = chats;
  }

  setActiveChatId(id: string) {
    this.activeChatId = id;
  }
}
