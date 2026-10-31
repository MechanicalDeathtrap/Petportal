import { SelectFilter } from "./selects/select-filter.tsx";
import styles from "./aside-filters.module.sass";
import { InputFilters } from "./input-filters.tsx";
import { MultiSelectFilter } from "./selects/multi-select-filter.tsx";
import { SelectChangeEvent } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFilterContext } from "../../context/filter-context.tsx";
import {
  getRoleGroupLabel,
  getRoleLabel,
  groupRoleNames,
  OTHER_ROLE_NAME,
} from "../../data/role-categories.ts";
import { Button } from "../button/button.tsx";

// Значения хранятся в сохранённых фильтрах, поэтому остаются прежними; на экране — перевод.
export enum IsCommercialProjectFilter {
  YES = "Да",
  NO = "Нет",
}

export const AsideFilters = () => {
  const { t } = useTranslation();
  const { tempFilters, setTempFilters, applyFilters, resetFilters, roles } = useFilterContext();

  const commercialLabel = (value: string) =>
    value === IsCommercialProjectFilter.YES
      ? t("common.yes")
      : value === IsCommercialProjectFilter.NO
        ? t("common.no")
        : value;

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

  const handleChangeCommercial = (e: SelectChangeEvent<string>) => {
    setTempFilters({ isCommercial: e.target.value });
  };

  const roleGroups = useMemo(
    () => groupRoleNames(roles.map((r) => r.name)),
    [roles]
  );

  return (
    <aside className={styles["filters"]}>
        <SelectFilter
          sizeStyle="big"
          placeholder={t("filters.role")}
          groups={roleGroups}
          getItemLabel={getRoleLabel}
          getGroupLabel={getRoleGroupLabel}
          emptyOptionLabel={t("filters.notSpecified")}
          searchable
          searchPlaceholder={t("filters.roleSearch")}
          pinnedItems={[OTHER_ROLE_NAME]}
          value={tempFilters.roleId
            ? roles.find(role => role.id === tempFilters.roleId)?.name || ""
            : ""
          }
          onChange={handleChangeRole}
          menuMaxHeight={450}
          // селект уже, чем названия ролей и групп
          menuMinWidth={280}
        />
        <SelectFilter
          sizeStyle="big"
          placeholder={t("filters.commercial")}
          emptyOptionLabel={t("filters.notSpecified")}
          menuItems={[IsCommercialProjectFilter.YES, IsCommercialProjectFilter.NO]}
          getItemLabel={commercialLabel}
          value={tempFilters.isCommercial}
          onChange={handleChangeCommercial}
        />
      <div>
        {t("filters.budget")}
        <InputFilters />
      </div>
      <MultiSelectFilter />

      <label className={styles["checkbox-filter"]}>
        <input
          type="checkbox"
          checked={tempFilters.showArchived}
          onChange={(e) => setTempFilters({ showArchived: e.target.checked })}
        />
        {t("filters.showArchived")}
      </label>

      <div className={styles["buttons"]}>
        <div className={styles["button-wrapper"]}>
          <Button
            type="button"
            style="grey-button"
            text={t("filters.reset")}
            onClick={resetFilters}
          />
        </div>

        <div className={styles["button-wrapper"]}>
          <Button
            style="blue-button-header"
            onClick={applyFilters}
            type="submit"
            text={t("filters.apply")}
          />
        </div>
      </div>

    </aside>
  );
};
