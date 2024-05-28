import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const MySelect = ({ width = 250, label, value, onChangeValue, list }) => {
  return (
    <FormControl sx={{ minWidth: width }} size="small">
      <InputLabel id={`my-custom-select-for-${label}`}>{label}</InputLabel>
      <Select
        labelId={`my-custom-select-for-${label}`}
        id={`my-custom-select-${label}`}
        value={value}
        label={label}
        onChange={onChangeValue}
      >
        {list.length > 0 ? (
          list.map((el) => (
            <MenuItem key={el.id} value={el.id}>
              {el.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem>لا يوجد بيانات</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default MySelect;
