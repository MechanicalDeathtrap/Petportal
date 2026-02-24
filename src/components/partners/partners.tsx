import styles from "./partners.module.sass";

export const Partners = () => {
  return (
    <div className={styles["partners"]}>
      <h1 className={styles["partners__heading"]}>Работаем с лучшими</h1>
      <div className={styles["partners__list"]}>
        <img
          className={styles["partners__fsi-logo"]}
          src="/img/fsi.png"
          alt="Фонд Содействия Инновациям"
        />
        <img
          className={styles["footer__fsi-image"]}
          src="/img/kfu_logo_3l_rus.png"
          alt="Казанский федеральный университет"
        />
      </div>
    </div>
  );
};
