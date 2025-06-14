import { SelectFilter } from "./selects/select-filter.tsx";
import styles from "./aside-filters.module.sass";
import { InputFilters } from "./input-filters.tsx";
import { MultiSelectFilter } from "./selects/multi-select-filter.tsx";
import { Button, SelectChangeEvent } from "@mui/material";
import { useFilterContext } from "../../context/filter-context.tsx";

export enum IsCommercialProjectFilter {
  YES = "Да",
  NO = "Нет",
}

export const AsideFilters = () => {
  const { tempFilters, setTempFilters, applyFilters } = useFilterContext();

  const handleChangeRole = (e: SelectChangeEvent<string>) => {
    setTempFilters({ role: e.target.value });
  };

  const handleChangeTerms = (e: SelectChangeEvent<string>) => {
    setTempFilters({ terms: e.target.value });
  };

  const handleChangeCommercial = (e: SelectChangeEvent<string>) => {
    setTempFilters({ isCommercial: e.target.value });
  };

  return (
    <aside className={styles["filters"]}>
      <div className={styles["filters--flex"]}>
        <SelectFilter
          sizeStyle="small"
          placeholder="Роль"
          menuItems={["Фронтенд", "Бэкенд", "Дизайнер"]} //передавать сюда список ролей с бэка (или держать список ролей на фронте)
          value={tempFilters.role}
          onChange={handleChangeRole}
        />
         <SelectFilter
          sizeStyle="small"
          placeholder="Сроки"
          menuItems={["Краткосрочный", "Среднесрочный", "Долгосрочный"]}
          value={tempFilters.terms}
          onChange={handleChangeTerms}
        />
      </div >
        <SelectFilter
          sizeStyle="big"
          placeholder="Коммерческий"
          menuItems={[IsCommercialProjectFilter.YES, IsCommercialProjectFilter.NO]}
          value={tempFilters.isCommercial}
          onChange={handleChangeCommercial}
        />
      <div>
        <InputFilters />
      </div>
      <MultiSelectFilter />

      <div className={styles["button-wrapper"]}>
        <Button
          variant="outlined"
          className={styles["apply-button"]}
          onClick={applyFilters}
          type="submit"
        >
          Применить
        </Button>
      </div>
    </aside>
  );
};
