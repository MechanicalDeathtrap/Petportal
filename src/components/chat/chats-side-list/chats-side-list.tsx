import { ChatItem } from "../chat-item/chat-item.tsx";
import style from "./chat-side-list.module.sass";

export const ChatsSideList = () => {
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
