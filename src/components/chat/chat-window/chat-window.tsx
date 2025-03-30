import style from "./chat-window.module.sass";

export const ChatWindow = () => {
  const isChosenDialog = false;

  return (
    <>
      {!isChosenDialog && (
        <div
          className={`${style["chat-window__no-dialog"]} ${style["chat-window"]}`}
        >
          <div className={style["chat-window__no-dialog-message"]}>
            <p>
              Вы ещё не выбрали диалог. <br />
              Нажмите на один из них, чтобы начать общение.{" "}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
