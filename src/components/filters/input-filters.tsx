import { useTranslation } from "react-i18next";
import styles from "./input-filters.module.sass";

export const InputFilters = () => {
  const { t } = useTranslation();
  return (
    <form className={styles["filter-form"]} action="">
      <div className={styles["filter-form__input"]}>
        <span>{t("filters.from")}</span>
        <input placeholder="0" type="number" />
      </div>
      <div className={styles["filter-form__input"]}>
        <span>{t("filters.to")}</span>
        <input placeholder="10000*" type="number" />
      </div>
    </form>
  );
};
