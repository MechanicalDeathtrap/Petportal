import { SelectFilter } from "./selects/select-filter.tsx";
import styles from "./aside-filters.module.sass";
import { InputFilters } from "./input-filters.tsx";
import { MultiSelectFilter } from "./selects/multi-select-filter.tsx";
import { Button, SelectChangeEvent } from "@mui/material";
import { useFilterContext } from "../../context/filter-context.tsx";
import { getStateLabel, getStateValue, StateOfProject } from "../../types/project-type.ts";

export enum IsCommercialProjectFilter {
  YES = "Да",
  NO = "Нет",
}

export const AsideFilters = () => {
  const { tempFilters, setTempFilters, applyFilters, resetFilters } = useFilterContext();

  const handleChangeRole = (e: SelectChangeEvent<string>) => {
    setTempFilters({ role: e.target.value });
  };

  const handleChangeTerms = (e: SelectChangeEvent<string>) => {
    const value = getStateValue(e.target.value);
      if (value !== undefined) {
        setTempFilters({ terms: value });
      }
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
          menuItems={["Фронтенд", "Бэкенд", "Дизайнер"]} //передавать сюда список ролей с бэка (или держать список ролей на  фронте)
          value={tempFilters.role}
          onChange={handleChangeRole}
        />
         <SelectFilter
          sizeStyle="small"
          placeholder="Статус"
          menuItems={[
          getStateLabel(StateOfProject.Open),
          getStateLabel(StateOfProject.InProgress),
          getStateLabel(StateOfProject.Closed),
          ]}
          value={tempFilters.terms !== null ? getStateLabel(tempFilters.terms) : ""}
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
          variant="text"
          className={styles["reset-button"]}
          onClick={resetFilters}
        >
          Сбросить фильтры
        </Button>
      </div>

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
