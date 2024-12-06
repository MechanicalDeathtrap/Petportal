import styles from "./input-filters.module.sass";

export const InputFilters = () => {
  return (
    <form className={styles["filter-form"]} action="">
      <div className={styles["filter-form__input"]}>
        <span>От</span>
        <input placeholder="0" type="number" />
      </div>
      <div className={styles["filter-form__input"]}>
        <span>До</span>
        <input placeholder="100000" type="number" />
      </div>
    </form>
  );
};
