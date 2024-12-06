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
        sx={{
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(177, 177, 177, 1)", //TODO заменить на нормальный стиль в сасе
          },
        }}
        renderValue={(selected) =>
          selected.length === 0 ? (
            <em>Языки программирования</em>
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
        <MenuItem key="Role1" value="Role1">
          Role1
        </MenuItem>
        <MenuItem key="Role2" value="Role2">
          Role2
        </MenuItem>
      </Select>
    </FormControl>
  );
};
