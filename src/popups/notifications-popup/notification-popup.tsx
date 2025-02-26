import styles from "./notification-popup.module.sass"

export const NotificationPopup = () =>{
  return(
    <div className={styles["notification-popup"]}>
      <ul className={styles["notification-popup__notification-list"]}>
        <li className={styles["notification-popup__notification-list-item"]}>
          <picture className={styles["notification-popup__notification-image-wrapper"]}>
            <img src="/img/blank-avatar.png" alt="notification-image" className={styles["notification-popup__notification-image"]}/>
          </picture>
          <div className={styles["notification-popup__notification-list-item-content"]}>
            <h2>Заголовок уведы</h2>
            <p>Текст уведы очень большой, длинный и очень очень очень очень очень очень очень очень очень очень очень очень очень очень содержательный</p>
          </div>
        </li>
        <li className={styles["notification-popup__notification-list-item"]}>
          <picture className={styles["notification-popup__notification-image-wrapper"]}>
            <img src="/img/blank-avatar.png" alt="notification-image" className={styles["notification-popup__notification-image"]}/>
          </picture>
          <div className={styles["notification-popup__notification-list-item-content"]}>
            <h2>Заголовок уведы</h2>
            <p>Текст уведы очень большой, длинный и очень очень очень очень очень очень очень очень очень очень очень очень очень очень содержательный</p>
          </div>
        </li>
      </ul>
      <button type='button' className={styles["notification-popup__load-more-button"]}>
        Посмотреть ещё
      </button>
    </div>
  )
}