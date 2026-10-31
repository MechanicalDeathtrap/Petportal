import { useTranslation } from "react-i18next";
import styles from "./notification-popup.module.sass";

export const NotificationPopup = () => {
  const { t } = useTranslation();
  return (
    <div className={styles["notification-popup"]}>
      <ul className={styles["notification-popup__notification-list"]}>
        <li className={styles["notification-popup__notification-list-item"]}>
          <picture
            className={styles["notification-popup__notification-image-wrapper"]}
          >
            <img
              src="/img/blank-avatar.png"
              alt="notification-image"
              className={styles["notification-popup__notification-image"]}
            />
          </picture>
          <div
            className={
              styles["notification-popup__notification-list-item-content"]
            }
          >
            <h2>{t("notifications.sampleTitle")}</h2>
            <p>{t("notifications.sampleText")}</p>
          </div>
        </li>
        <li className={styles["notification-popup__notification-list-item"]}>
          <picture
            className={styles["notification-popup__notification-image-wrapper"]}
          >
            <img
              src="/img/blank-avatar.png"
              alt="notification-image"
              className={styles["notification-popup__notification-image"]}
            />
          </picture>
          <div
            className={
              styles["notification-popup__notification-list-item-content"]
            }
          >
            <h2>{t("notifications.sampleTitle")}</h2>
            <p>{t("notifications.sampleText")}</p>
          </div>
        </li>
      </ul>
      <button
        type="button"
        className={styles["notification-popup__load-more-button"]}
      >
        {t("notifications.showMore")}
      </button>
    </div>
  );
};
