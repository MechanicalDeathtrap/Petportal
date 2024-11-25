import styles from "./partners.module.sass";

export const Partners = () => {
  return (
    <div className={styles["partners"]}>
      <h1 className={styles["partners__heading"]}>Работаем с лучшими</h1>
      <div>
        <ul className={styles["partners__list"]}>
          <li>
            <img src="/src/assets/img/surface1.png" alt="sberbank-logo" />
          </li>
          <li>
            <img src="/src/assets/img/IU_logo%201.png" alt="innopolis-logo" />
          </li>
        </ul>
      </div>
    </div>
  );
};
