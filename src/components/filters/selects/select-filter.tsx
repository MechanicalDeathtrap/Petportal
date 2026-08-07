import { ReactNode, useMemo, useState } from "react";
import {
  FormControl,
  InputBase,
  ListSubheader,
  MenuItem,
  SelectChangeEvent,
  Select,
} from "@mui/material";
import styles from "./select-filter.module.sass";

export type SelectGroup = {
  label: string;
  items: string[];
};

type MenuSearchBoxProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

/**
 * Строка поиска, закреплённая внизу выпадающего списка.
 * Отдельный компонент нужен, чтобы Select не навесил на DOM-элемент свои
 * onClick/selected — тогда клик по полю выбирал бы пункт и закрывал меню.
 */
const MenuSearchBox = ({ value, placeholder, onChange }: MenuSearchBoxProps) => (
  <div
    className={styles["select__search"]}
    // не даём списку перехватывать ввод (поиск по первой букве, стрелки и т.д.)
    onKeyDown={(event) => {
      if (event.key !== "Escape" && event.key !== "Tab") {
        event.stopPropagation();
      }
    }}
  >
    <InputBase
      value={value}
      autoComplete="off"
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={styles["select__search-input"]}
      inputProps={{ "aria-label": placeholder }}
    />
  </div>
);

type Props = {
  placeholder: string;
  menuItems?: string[];
  /** Пункты, разбитые по темам. Если задано — menuItems игнорируется. */
  groups?: SelectGroup[];
  sizeStyle: "small" | "big";
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  menuMaxHeight?: number;
  /** Минимальная ширина выпадающего меню (по умолчанию — ширина самого селекта). */
  menuMinWidth?: number;
  /** Подпись пункта, сбрасывающего фильтр (например, "Не указано"). */
  emptyOptionLabel?: string;
  /** Показывать строку поиска, закреплённую внизу списка. */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Пункты, которые видны всегда — даже если поиск ничего не нашёл. */
  pinnedItems?: string[];
};

export const SelectFilter = (props: Props) => {
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const { groups: groupsProp, menuItems, pinnedItems } = props;

  const groups = useMemo<SelectGroup[]>(
    () => groupsProp ?? [{ label: "", items: menuItems ?? [] }],
    [groupsProp, menuItems]
  );

  const visibleGroups = useMemo(() => {
    if (!query) return groups;

    const pinned = pinnedItems ?? [];

    return groups
      .map((group) => ({
        label: group.label,
        items: group.items.filter(
          (item) => pinned.includes(item) || item.toLowerCase().includes(query)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, query, pinnedItems]);

  const options: ReactNode[] = [];

  if (props.emptyOptionLabel && !query) {
    options.push(
      <MenuItem key="__empty__" value="">
        {props.emptyOptionLabel}
      </MenuItem>
    );
  }

  visibleGroups.forEach((group) => {
    if (group.label) {
      options.push(
        <ListSubheader
          key={`group-${group.label}`}
          className={styles["select__group-label"]}
        >
          {group.label}
        </ListSubheader>
      );
    }

    group.items.forEach((item) => {
      options.push(
        <MenuItem key={`${group.label}-${item}`} value={item}>
          {item}
        </MenuItem>
      );
    });
  });

  return (
    <div>
      <FormControl>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          onChange={props.onChange}
          onClose={() => setSearch("")}
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "0.75px solid rgba(177, 177, 177, 1)", //TODO заменить на нормальный стиль в сасе
            },
          }}
          displayEmpty
          className={`${styles["select"]} ${props.sizeStyle === "small" ? styles["select--small"] : styles["select--big"]}`}
          renderValue={(selected) => {
            if (!selected || selected.length === 0) {
              return <em>{props.placeholder}</em>;
            }
            // Показываем плейсхолдер и выбранное значение в скобках
            return (
              <span>
                {props.placeholder}
                {selected ? `: ${selected}` : ""}
              </span>
            );
          }}
          MenuProps={{
            // без этого список забирает фокус у строки поиска
            autoFocus: props.searchable ? false : undefined,
            PaperProps: {
              style: {
                maxHeight: props.menuMaxHeight || 200, // по умолчанию 200px
                minWidth: props.menuMinWidth,
              },
            },
            MenuListProps: {
              className: props.searchable ? styles["select__menu-list"] : undefined,
            },
          }}
        >
          {options}

          {props.searchable && (
            <MenuSearchBox
              key="__search__"
              value={search}
              placeholder={props.searchPlaceholder || "Поиск"}
              onChange={setSearch}
            />
          )}
        </Select>
      </FormControl>
    </div>
  );
};
