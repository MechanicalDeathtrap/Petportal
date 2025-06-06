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
import { tags } from "../../../data/tags";

export const MultiSelectFilter = () => {
  const [progLang, setProgLang] = useState<string[]>([]);

  const handleFilterChange = (event: SelectChangeEvent<typeof progLang>) => {
    const {
      target: { value },
    } = event;
    setProgLang(typeof value === "string" ? value.split(",") : value);
  };  

  return (
    <FormControl>
      <Select
        id="demo-simple-select"
        value={progLang}
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
            {tags.map((tag) => (
          <MenuItem key={tag.id} value={tag.label}>
            {tag.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
