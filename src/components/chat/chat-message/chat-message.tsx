import style from "./chat-message.module.sass";

type MessageProps = {
  message: string;
};

export const ChatMessage = (props: MessageProps) => {
  return (
    <div className={`${style["chat-message"]} ${style["chat-message--mine"]}`}>
      <div
        className={`${style["chat-message__wrapper"]} ${style["chat-message__mine-message"]}`}
      >
        {props.message}
      </div>
      {/*      <span>19:00</span>*/}
    </div>
  );
};
