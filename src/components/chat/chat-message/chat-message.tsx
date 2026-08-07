import style from "./chat-message.module.sass";
import { ChatMessage as ChatMessageType } from "../../../types/chat-types";
import { userStore } from "../../../stores/user-store";
import { isSystemChatMessage } from "../../../stores/chat-store";
import { observer } from "mobx-react-lite";

type MessageProps = {
  message: ChatMessageType;
};

export const ChatMessage = observer(({ message }: MessageProps) => {
  const isSystem = isSystemChatMessage(message.message);
  const isMyMessage = !isSystem && message.senderId === userStore.user.id;

  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);

      if (isNaN(date.getTime())) {
        return new Date().toLocaleString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        });
      }
      return date.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return "--:--";
    }
  };

  if (isSystem) {
    return (
      <div className={style["chat-message--system"]}>
        <p>{message.message}</p>
        <span className={style["chat-message__time--system"]}>
          {formatTime(message.sentAt)}
        </span>
      </div>
    );
  }

  return (
    <div className={`${style["chat-message"]} ${isMyMessage ? style["chat-message--mine"] : style["chat-message--other"]}`}>
      <div
        className={`${style["chat-message__wrapper"]} ${isMyMessage ? style["chat-message__mine-message"] : style["chat-message__other-message"]}`}
      >
        {!isMyMessage && (
          <div className={style["chat-message__sender"]}>
            {message.senderName}
          </div>
        )}
        <div className={style["chat-message__text"]}>
          {message.message}
        </div>
        <span
          className={`${style["chat-message__time"]} ${
            isMyMessage ? style["chat-message__time--mine"] : style["chat-message__time--other"]
          }`}
        >
          {formatTime(message.sentAt)}
        </span>
      </div>
    </div>
  );
});
