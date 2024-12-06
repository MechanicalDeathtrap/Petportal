import { SelectFilter } from "./selects/select-filter.tsx";
import styles from "./aside-filters.module.sass";
import { InputFilters } from "./input-filters.tsx";
import { MultiSelectFilter } from "./selects/multi-select-filter.tsx";

export const AsideFilters = () => {
  return (
    <aside className={styles["filters"]}>
      <div className={styles["filters--flex"]}>
        <SelectFilter sizeStyle="small" placeholder="Роль" menuItems={[]} />
        <SelectFilter sizeStyle="small" placeholder="Сроки" menuItems={[]} />
      </div>
      <SelectFilter sizeStyle="big" placeholder="Коммерческий" menuItems={[]} />
      <div>
        <InputFilters />
      </div>
      <MultiSelectFilter />
    </aside>
  );
};
