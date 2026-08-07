import style from "./chat-item.module.sass";
import { ChatRoom } from "../../../types/chat-types";
import { observer } from "mobx-react-lite";
import { chatStore, getChatPeerName } from "../../../stores/chat-store";
import { userStore } from "../../../stores/user-store";

type ChatItemProps = {
  chat: ChatRoom;
};

export const ChatItem = observer(({ chat }: ChatItemProps) => {
  const isActive = chatStore.activeChatId === chat.id;

  const handleClick = () => {
    chatStore.setActiveChatId(chat.id);
    chatStore.loadMessages(chat.id);
  };

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return "";
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return "";
    }
  };

  const lastMessage =
    chat.lastMessage ||
    (() => {
      const msgs = chatStore.messages[chat.id];
      return msgs?.length ? msgs[msgs.length - 1].message : "Нет сообщений";
    })();

  return (
    <div
      className={`${style["chat-item"]} ${isActive ? style["chat-item--active"] : ""}`}
      onClick={handleClick}
    >
      <div
        className={style["chat-item__image"]}
        style={{ backgroundImage: `url(/img/blank-avatar.png)` }}
      />
      <div className={style["chat-item__small-info"]}>
        <h6>
          {getChatPeerName(chat, userStore.user.id)}
          {(chat.unreadCount || 0) > 0 && (
            <span className={style["chat-item__unread"]}>{chat.unreadCount}</span>
          )}
        </h6>
        <p>{lastMessage}</p>
      </div>
      <span className={style["chat-item__time"]}>
        {formatTime(chat.lastMessageTime)}
      </span>
    </div>
  );
});
