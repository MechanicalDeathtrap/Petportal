import { SelectFilter } from "./selects/select-filter.tsx";
import styles from "./aside-filters.module.sass";
import { InputFilters } from "./input-filters.tsx";
import { MultiSelectFilter } from "./selects/multi-select-filter.tsx";
import { SelectChangeEvent } from "@mui/material";
import { useMemo } from "react";
import { useFilterContext } from "../../context/filter-context.tsx";
import { getStateLabel, getStateValue, StateOfProject } from "../../types/project-type.ts";
import { groupRoleNames, OTHER_ROLE_NAME } from "../../data/role-categories.ts";
import { Button } from "../button/button.tsx";

export enum IsCommercialProjectFilter {
  YES = "Да",
  NO = "Нет",
}

/** Пункт, сбрасывающий фильтр в «любое значение». */
export const NOT_SPECIFIED_LABEL = "Не указано";

export const AsideFilters = () => {
  const { tempFilters, setTempFilters, applyFilters, resetFilters, roles } = useFilterContext();

  const handleChangeRole = (e: SelectChangeEvent<string>) => {
    const selectedName = e.target.value;

    if (!selectedName) {
      setTempFilters({ roleId: "" });
      return;
    }

    const selectedRole = roles.find(role => role.name === selectedName);
    setTempFilters({
      roleId: selectedRole ? selectedRole.id : undefined
    });
  };

  const handleChangeTerms = (e: SelectChangeEvent<string>) => {
    if (!e.target.value) {
      setTempFilters({ terms: null });
      return;
    }

    const value = getStateValue(e.target.value);
      if (value !== undefined) {
        setTempFilters({ terms: value });
      }
  };

  const handleChangeCommercial = (e: SelectChangeEvent<string>) => {
    setTempFilters({ isCommercial: e.target.value });
  };

  const roleGroups = useMemo(
    () => groupRoleNames(roles.map((r) => r.name)),
    [roles]
  );

  return (
    <aside className={styles["filters"]}>
      <div className={styles["filters--flex"]}>
        <SelectFilter
          sizeStyle="small"
          placeholder="Роль"
          groups={roleGroups}
          emptyOptionLabel={NOT_SPECIFIED_LABEL}
          searchable
          searchPlaceholder="Поиск роли"
          pinnedItems={[OTHER_ROLE_NAME]}
          value={tempFilters.roleId
            ? roles.find(role => role.id === tempFilters.roleId)?.name || ""
            : ""
          }
          onChange={handleChangeRole}
          menuMaxHeight={450}
          // селект узкий (105px), а названия ролей и групп длинные
          menuMinWidth={280}
        />
         <SelectFilter
          sizeStyle="small"
          placeholder="Статус"
          emptyOptionLabel={NOT_SPECIFIED_LABEL}
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
          emptyOptionLabel={NOT_SPECIFIED_LABEL}
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
