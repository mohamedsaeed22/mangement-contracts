import { TextField } from "@mui/material";
import React from "react";

const MyInput = ({
  value,
  onChangeValue,
  label,
  width ,
  multiline = false,
  fullWidth = false,
  rows = 0,
  helperText,
  type = "text",
}) => {
  return (
    <TextField
      sx={{
        width: width,
        "& .MuiFormHelperText-root": {
          color: "red",
          fontSize: "12px !important ",
        },
      }}
      size="small"
      id={`my-input-${label}`}
      label={label}
      type={type}
      variant="outlined"
      multiline={multiline}
      rows={rows}
      fullWidth={fullWidth}
      value={value}
      onChange={onChangeValue}
      helperText={helperText && helperText}
    />
  );
};

export default MyInput;
