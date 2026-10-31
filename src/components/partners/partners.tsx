import { useTranslation } from "react-i18next";
import styles from "./partners.module.sass";

export const Partners = () => {
  const { t } = useTranslation();
  return (
    <div className={styles["partners"]}>
      <h1 className={styles["partners__heading"]}>{t("home.partners.heading")}</h1>
      <div>
        <ul className={styles["partners__list"]}>
          <li>
            <img src="/img/surface1.png" alt="sberbank-logo" />
          </li>
          <li>
            <img src="/img/IU_logo%201.png" alt="innopolis-logo" />
          </li>
        </ul>
      </div>
    </div>
  );
};
