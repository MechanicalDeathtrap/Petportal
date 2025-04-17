import { ChatItem } from "../chat-item/chat-item.tsx";
import style from "./chat-side-list.module.sass";
import { ChatUser } from "../chat-type.ts";
import { useState } from "react";
import { HubConnection } from "@microsoft/signalr";

type ChatSideList = {
  chatsList: ChatUser[];
};

export const ChatsSideList = () => {
  const [listLenght, setListLenght] = useState(0);

  return (
    <aside className={style["chat-side-list"]}>
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
    </aside>
  );
};
