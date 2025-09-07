import style from "./chat-item.module.sass";
import { ChatRoom } from "../../../types/chat-types";
import { observer } from "mobx-react-lite";
import { chatStore } from "../../../stores/chat-store";
import { userStore } from "../../../stores/user-store";

type ChatItemProps = {
  chat: ChatRoom;
};

export const ChatItem = observer(({ chat }: ChatItemProps) => {
  const isActive = chatStore.activeChatId === chat.id;

  const handleClick = () => {
    chatStore.setActiveChatId(chat.id);
    // Всегда загружаем сообщения при клике на чат
    chatStore.loadMessages(chat.id);
  };

  // Функция для получения имени собеседника
  const getChatDisplayName = () => {
    // Если это чат с самим собой (один участник)
    if (chat.participants.length === 1) {
      return `${userStore.user.firstName} ${userStore.user.lastName}`.trim() || "Вы";
    }

    // Если это чат с одним собеседником
    if (chat.participants.length === 2) {
      const otherParticipant = chat.participants.find(id => id !== userStore.user.id);
      if (otherParticipant) {
        // Пока используем ID, в будущем можно добавить API для получения имени
        return `Пользователь ${otherParticipant.slice(0, 8)}...`;
      }
    }

    // Для групповых чатов или если не удалось определить собеседника
    return chat.name;
  };

  // Функция для получения последнего сообщения
  const getLastMessage = () => {
    // Сначала проверяем lastMessage из чата
    if (chat.lastMessage) {
      return chat.lastMessage;
    }

    // Если нет lastMessage, пытаемся получить из локальных сообщений
    const chatMessages = chatStore.messages[chat.id];
    if (chatMessages && chatMessages.length > 0) {
      const lastMessage = chatMessages[chatMessages.length - 1];
      return lastMessage.message;
    }

    return "Нет сообщений";
  };

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return "";
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        console.warn('Некорректный timestamp в ChatItem:', timestamp);
        return "";
      }
      return date.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (error) {
      console.error('Ошибка форматирования времени в ChatItem:', error, timestamp);
      return "";
    }
  };

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
        <h6>{getChatDisplayName()}</h6>
        <p>{getLastMessage()}</p>
      </div>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
        >
          <path
            d="M1 5.59863L4.64715 9.24578"
            stroke="#666666"
            strokeLinecap="round"
          />
          <path
            d="M13.0696 1L4.73446 9.33512"
            stroke="#666666"
            strokeLinecap="round"
          />
        </svg>
        {formatTime(chat.lastMessageTime)}
      </span>
    </div>
  );
});