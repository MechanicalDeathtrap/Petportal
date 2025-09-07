import style from "./error-message.module.sass";

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className={style["error-message"]}>
      <p className={style["error-message__text"]}>{message}</p>
      {onRetry && (
        <button
          className={style["error-message__retry-button"]}
          onClick={onRetry}
        >
          Попробовать снова
        </button>
      )}
    </div>
  );
}; 