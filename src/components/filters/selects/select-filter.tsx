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
  menuMaxHeight?: number;
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
          PaperProps: {
            style: {
              maxHeight: props.menuMaxHeight || 200, // по умолчанию 200px
            },
            className: props.menuMaxHeight
              ? undefined
              : "", // можно добавить className, если нужно
            },
          }}
          >

        {props.menuItems.map((item, index) => (
          <MenuItem key={index} value={item}
          
                  sx={{
              // Для "Другое" — закрепляем внизу
              ...(item === "Другое" && {
                position: "sticky",
                bottom: 0,
                backgroundColor: "#fff",
                fontWeight: 600,
                color: "#1976d2",
                borderTop: "1px solid #e0e0e0",
                zIndex: 99,
                boxShadow: "0 -2px 4px -1px rgba(0,0,0,0.1)", // тень сверху
              }),
            }}>
            
            {item}
          </MenuItem>
        ))}
        </Select>
      </FormControl>
    </div>
  );
};
