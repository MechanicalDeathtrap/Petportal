  import {
    Box,
    Chip,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
  } from "@mui/material";
  import { useState } from "react";
  import styles from "./select-filter.module.sass";
  import { tags , labelToIdMap} from "../../../data/tags";
  import { useFilterContext } from "../../../context/filter-context";

  export const MultiSelectFilter = () => {
    const { tempFilters, setTempFilters } = useFilterContext();
    const selectedTags = tempFilters.tags.map(
      (id) => tags[id as keyof typeof tags]
    );

    const handleFilterChange = (event: SelectChangeEvent<typeof selectedTags>) => {
      const {
        target: { value },
      } = event;

      const newValue = typeof value === "string" ? value.split(",") : value;
      const tagIds = newValue.map((label) => labelToIdMap[label as keyof typeof labelToIdMap]);

      setTempFilters({
        ...tempFilters,
        tags: tagIds,
      });
    };  

    return (
      <FormControl>
        <Select
          id="demo-simple-select"
          value={selectedTags}
          onChange={handleFilterChange}
          displayEmpty
          multiple
          className={styles["select"]}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300, // Максимальная высота меню
                overflowY: "auto", // Прокрутка по вертикали
              },
            },
          }}
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "0.75px solid rgba(177, 177, 177, 1)", //TODO заменить на нормальный стиль в сасе
            },
          }}
          renderValue={(selected) =>
            selected.length === 0 ? (
              <em>Теги</em>
            ) : (
              <Box
                className={styles["select__chip-box"]}
                sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
              >
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )
          }
        >
            {Object.values(tags).map((label) => (
            <MenuItem key={label} value={label}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
