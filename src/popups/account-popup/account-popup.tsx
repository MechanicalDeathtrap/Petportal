import styles from "./account-popup.module.sass";
import { Link, useNavigate } from "react-router-dom";
import { authStore } from "../../stores/auth-store.ts";
import { popupStore } from "../../stores/popups-store.ts";
import { userStore } from "../../stores/user-store.ts";
import { observer } from "mobx-react-lite";
import { deleteAuthCookie } from "../../utils/cookies.ts";

export const AccountPopup = observer(() => {
  const navigate = useNavigate();
  const user = userStore.user;
  const userAvatar = user.avatarUrl || "/img/blank-avatar.png";

  const exitFromProfile = () => {
    deleteAuthCookie();
    authStore.setAuthorized(false);
    popupStore.toggleAccountPopupOpen();
    navigate("/");
  };

  return (
    <div className={styles["account-popup"]}>
      <div className={styles["account-popup__account-info"]}>
        <picture>
          <img
            className={styles["account-popup__account-image"]}
            src={userAvatar}
            alt="profile-photo"
          />
        </picture>
        <div className={styles["account-popup__account-names"]}>
          <h6>{user.firstName + " " + user.lastName}</h6>
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
              <button onClick={exitFromProfile} type="button">
                Выйти
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});
