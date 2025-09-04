import { SelectFilter } from "./selects/select-filter.tsx";
import styles from "./aside-filters.module.sass";
import { InputFilters } from "./input-filters.tsx";
import { MultiSelectFilter } from "./selects/multi-select-filter.tsx";
import {SelectChangeEvent } from "@mui/material";
import { useFilterContext } from "../../context/filter-context.tsx";
import { getStateLabel, getStateValue, StateOfProject } from "../../types/project-type.ts";
import { Button } from "../button/button.tsx";

export enum IsCommercialProjectFilter {
  YES = "Да",
  NO = "Нет",
}



export const AsideFilters = () => {
  const { tempFilters, setTempFilters, applyFilters, resetFilters, roles } = useFilterContext();

  const handleChangeRole = (e: SelectChangeEvent<string>) => {
    const selectedName = e.target.value;
    const selectedRole = roles.find(role => role.name === selectedName);
    setTempFilters({ 
      roleId: selectedRole ? selectedRole.id : undefined 
    });
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

  const roleNames = roles.map((r) => r.name);
  const otherIndex = roleNames.indexOf("Другое");
  const sortedRoleNames =
    otherIndex > -1
      ? [...roleNames.filter((n) => n !== "Другое"), "Другое"]
      : roleNames;

  return (
    <aside className={styles["filters"]}>
      <div className={styles["filters--flex"]}>
        <SelectFilter
          sizeStyle="small"
          placeholder="Роль"
          menuItems={sortedRoleNames}
          value={tempFilters.roleId 
            ? roles.find(role => role.id === tempFilters.roleId)?.name || "" 
            : ""
          }
          onChange={handleChangeRole}
          menuMaxHeight={450} 
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
        Бюджет
        <InputFilters />
      </div>
      <MultiSelectFilter />
      <div className={styles["buttons"]}>
        <div className={styles["button-wrapper"]}>
          <Button
            type="button"
            style="grey-button"
            text="Сбросить фильтры"
            onClick={resetFilters}
          />
        </div>

        <div className={styles["button-wrapper"]}>
          <Button
            style="blue-button-header"
            onClick={applyFilters}
            type="submit"
            text="Применить"
          />
        </div>
      </div>

    </aside>
  );
};
