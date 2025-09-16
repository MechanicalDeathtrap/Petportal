import style from "./chat-window.module.sass";
import { ChatMessage } from "../chat-message/chat-message.tsx";
import { MessageInputBar } from "../message-input-bar/message-input-bar.tsx";
import { observer } from "mobx-react-lite";
import { chatStore } from "../../../stores/chat-store.ts";
import { userStore } from "../../../stores/user-store.ts";
import { useEffect, useRef } from "react";

export const ChatWindow = observer(() => {
  const activeChat = chatStore.activeChat;
  const messages = chatStore.activeChatMessages;
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Прокрутка к последнему сообщению при загрузке новых
  useEffect(() => {
    if (messagesContainerRef.current && messages.length > 0) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages.length]);

  // Функция для получения имени собеседника
  const getChatDisplayName = () => {
    if (!activeChat) return "";

    // Если это чат с самим собой (один участник)
    if (activeChat.participants.length === 1) {
      return `${userStore.user.firstName} ${userStore.user.lastName}`.trim() || "Вы";
    }

    // Если это чат с одним собеседником
    if (activeChat.participants.length === 2) {
      const otherParticipant = activeChat.participants.find(id => id !== userStore.user.id);
      if (otherParticipant) {
        // Пока используем ID, в будущем можно добавить API для получения имени
        return `${otherParticipant.slice(0, 8)}...`;
      }
    }

    // Для групповых чатов или если не удалось определить собеседника
    return activeChat.name;
  };

  if (!activeChat) {
    return (
      <section
        className={`${style["chat-window__no-dialog"]} ${style["chat-window"]}`}
      >
        <div className={style["chat-window__no-dialog-message"]}>
          <p>
            Вы ещё не выбрали диалог. <br />
            Нажмите на один из них, чтобы начать общение.{" "}
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className={style["chat-window"]}>
      <div className={style["chat-window__dialog-header"]}>
        <div
          className={style["chat-window__avatar"]}
          style={{ backgroundImage: `url(/img/blank-avatar.png)` }}
        />
        <div className={style["chat-window__opponent-info"]}>
          <h6>{getChatDisplayName()}</h6>
          <span>
            {activeChat.participants.length > 0
              ? `${activeChat.participants.length} участников`
              : "Нет участников"
            }
          </span>
        </div>
      </div>
      <section
        className={style["chat-window__dialog-main"]}
        ref={messagesContainerRef}
      >
        {chatStore.isLoading ? (
          <div className={style["chat-window__loading"]}>
            <p>Загрузка сообщений...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className={style["chat-window__empty"]}>
            <p>Нет сообщений в этом чате</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </>
        )}
      </section>
      <div className={style["chat-window__message-input"]}>
        <MessageInputBar />
      </div>
    </div>
  );
});