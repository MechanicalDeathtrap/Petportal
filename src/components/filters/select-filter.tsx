import { useState } from "react";
import { FormControl, MenuItem, SelectChangeEvent, Select, styled } from "@mui/material";
import styles from "./select-filter.module.sass";

type Props = {
  placeholder: string
  menuItems: string[]
}

/*const StyledSelect = styled(Select)(() => ({
  "& .MuiSelect-select": {
    padding: "5px 9.3px",
    fontSize: "15px",// Настраиваем отступы текста
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none"
  }
}));*/

export const SelectFilter = () => {
  const [filter, setFilter] = useState<string>("");

  const handleFilterChange = (e:  SelectChangeEvent) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <FormControl  >
        <Select    labelId="demo-simple-select-label"
                   id="demo-simple-select"
                   value={filter}
                   onChange={handleFilterChange}
                   displayEmpty className={styles["select"]}>
          <MenuItem disabled value="" sx={{ padding: 0 }} className={styles["select__placeholder"]}>
            <em>Placeholder</em>
          </MenuItem>
          <MenuItem key="Role1" value="Role1">Role1</MenuItem>
          <MenuItem key="Role2" value="Role2">Role2</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
