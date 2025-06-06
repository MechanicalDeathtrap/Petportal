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
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
};

export const SelectFilter = (props: Props) => {

  return (
    <div>
      <FormControl>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          onChange={props.onChange}
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "0.75px solid rgba(177, 177, 177, 1)", //TODO заменить на нормальный стиль в сасе
            },
          }}
          displayEmpty
          className={`${styles["select"]} ${props.sizeStyle === "small" ? styles["select--small"] : styles["select--big"]}`}
          renderValue={(selected) =>{
              if (!selected || selected.length === 0) {
                return <em>{props.placeholder}</em>;
              }
              return selected;
            }}
          >

        {props.menuItems.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
        </Select>
      </FormControl>
    </div>
  );
};
