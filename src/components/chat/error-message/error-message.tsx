import style from "./error-message.module.sass";
import { useTranslation } from "react-i18next";

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  const { t } = useTranslation();
  return (
    <div className={style["error-message"]}>
      <p className={style["error-message__text"]}>{message}</p>
      {onRetry && (
        <button
          className={style["error-message__retry-button"]}
          onClick={onRetry}
        >
          {t("common.retry")}
        </button>
      )}
    </div>
  );
}; 