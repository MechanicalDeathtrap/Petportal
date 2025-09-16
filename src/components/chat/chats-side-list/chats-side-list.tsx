import { ChatItem } from "../chat-item/chat-item.tsx";
import style from "./chat-side-list.module.sass";
import { observer } from "mobx-react-lite";
import { chatStore } from "../../../stores/chat-store.ts";
import { useEffect } from "react";
import { userStore } from "../../../stores/user-store.ts";

export const ChatsSideList = observer(() => {
  useEffect(() => {
    // Загружаем чаты при монтировании компонента
    const loadChats = async () => {
      if (userStore.user.id) {
        await chatStore.loadChatRooms();
      }
    };

    loadChats();
  }, [userStore.user.id]); // Добавляем зависимость от ID пользователя

  if (chatStore.isLoading) {
    return (
      <aside className={style["chat-side-list"]}>
        <div className={style["chat-side-list__loading"]}>
          <p>Загрузка чатов...</p>
        </div>
      </aside>
    );
  }

  if (chatStore.error) {
    return (
      <aside className={style["chat-side-list"]}>
        <div className={style["chat-side-list__error"]}>
          <p>Ошибка: {chatStore.error}</p>
          <button onClick={() => chatStore.loadChatRooms()}>
            Попробовать снова
          </button>
        </div>
      </aside>
    );
  }

  if (chatStore.chats.length === 0) {
    return (
      <aside className={style["chat-side-list"]}>
        <div className={style["chat-side-list__empty"]}>
          <p>У вас пока нет чатов</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className={style["chat-side-list"]}>
      {chatStore.chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </aside>
  );
});