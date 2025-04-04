import styles from "./account-popup.module.sass";
import { Link } from "react-router-dom";

export const AccountPopup = () => {
  return (
    <div className={styles["account-popup"]}>
      {/*TODO заменить фотку, имя и тег*/}
      <div className={styles["account-popup__account-info"]}>
        <picture>
          <img
            className={styles["account-popup__account-image"]}
            src="/img/blank-avatar.png"
            alt="profile-photo"
          />
        </picture>
        <div className={styles["account-popup__account-names"]}>
          <h6>Василиса Премудрая</h6>
          <span>@bombachka</span>
        </div>
      </div>
      <div className={styles["account-popup__buttons"]}>
        <button
          type="button"
          className={styles["account-popup__go-to-account-button"]}
        >
          <Link to="/account">Перейти в личный кабинет</Link>
        </button>
        <div>
          <ul className={styles["account-popup__links-list"]}>
            <li className={styles["account-popup__list-item"]}>
              <img src="/img/Opened%20Folder.svg" alt="folder-icon" />
              <Link to="/account/my-projects">Мои проекты</Link>
            </li>
            <li
              className={[
                styles["account-popup__list-item"],
                styles["account-popup__list-item--border-top"],
              ].join(" ")}
            >
              <img src="/img/Rating.svg" alt="rating-icon" />
              <Link to="/account/my-reviews">Отзывы</Link>
            </li>
            <li
              className={[
                styles["account-popup__list-item"],
                styles["account-popup__list-item--bordered"],
              ].join(" ")}
            >
              <img src="/img/Bookmark.svg" alt="bookmark-icon" />
              <Link to="/account/favourites">Избранное</Link>
            </li>
            <li
              className={[
                styles["account-popup__list-item"],
                styles["account-popup__list-item--border-bottom"],
              ].join(" ")}
            >
              <img src="/img/Settings.svg" alt="setting-icon" />
              <Link to="/account/settings">Настройки</Link>
            </li>
            <li className={styles["account-popup__list-item"]}>
              <img src="/img/Logout%20Rounded.svg" alt="logout-icon" />
              <button type="button">Выйти</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
