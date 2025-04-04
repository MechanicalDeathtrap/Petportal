import style from "./chat-message.module.sass";

export const ChatMessage = () => {
  return (
    <div className={`${style["chat-message"]} ${style["chat-message--mine"]}`}>
      <div
        className={`${style["chat-message__wrapper"]} ${style["chat-message__mine-message"]}`}
      >
        Жоская копирка с телеги причем даже вёрстки
        <br />
        Вот так вот дамы и господа
        <span>19:00</span>
      </div>
    </div>
  );
};
