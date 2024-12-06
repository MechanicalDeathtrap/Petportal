import { useState } from "react";
import {
  FormControl,
  MenuItem,
  SelectChangeEvent,
  Select,
} from "@mui/material";
import styles from "./select-filter.module.sass";

type Props = {
  placeholder: string;
  menuItems: string[];
  sizeStyle: "small" | "big";
};

export const SelectFilter = (props: Props) => {
  const [filter, setFilter] = useState<string>("");

  const handleFilterChange = (e: SelectChangeEvent) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <FormControl>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          onChange={handleFilterChange}
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(177, 177, 177, 1)", //TODO заменить на нормальный стиль в сасе
            },
          }}
          displayEmpty
          className={`${styles["select"]} ${props.sizeStyle === "small" ? styles["select--small"] : styles["select--big"]}`}
          renderValue={(selected) =>
            selected.length === 0 ? <em>{props.placeholder}</em> : <></>
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
    </div>
  );
};
