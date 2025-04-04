import style from "./chat-window.module.sass";
import { ChatMessage } from "../chat-message/chat-message.tsx";
import { MessageInputBar } from "../message-input-bar/message-input-bar.tsx";

export const ChatWindow = () => {
  const isChosenDialog = true;
  const imageUrlFromBackend = "/img/medium-hot-woman-with-laptop.png";

  return (
    <>
      {!isChosenDialog && (
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
      )}
      {isChosenDialog && (
        <div className={style["chat-window"]}>
          <div className={style["chat-window__dialog-header"]}>
            <div
              className={style["chat-window__avatar"]}
              style={{ backgroundImage: `url(${imageUrlFromBackend})` }}
            />
            <div className={style["chat-window__opponent-info"]}>
              <h6>Василиса Премудрая</h6>
              <span>Последний раз в сети в 18:56</span>
            </div>
          </div>
          <section className={style["chat-window__dialog-main"]}>
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
            <ChatMessage />
          </section>
          <div className={style["chat-window__message-input"]}>
            <MessageInputBar />
          </div>
        </div>
      )}
    </>
  );
};
