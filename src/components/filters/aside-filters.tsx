import { SelectFilter } from "./select-filter.tsx";
import styles from "./aside-filters.module.sass"

export const AsideFilters = () => {
  return (
    <aside className={styles["filters"]}>
        <SelectFilter />
      <div>
        <SelectFilter />
        <SelectFilter />
      </div>
    </aside>
  );
};
