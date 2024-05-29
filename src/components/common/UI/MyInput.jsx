import { TextField } from "@mui/material";
import React from "react";

const MyInput = ({
  value,
  label,
  width,
  multiline = false,
  fullWidth = false,
  rows = 0,
  type = "text",
  error,
  helperText,
  onBlur,
  onChange,
  name,
  select = false,
  children,
}) => {
  return (
    <TextField
      sx={{
        width: width,
        "& .MuiFormHelperText-root": {
          color: "red",
          fontSize: "10px !important ",
          margin: "3px 0px 0px !important",
        },
      }}
      size="small"
      id={`my-input-${name}`}
      label={label}
      type={type}
      variant="outlined"
      multiline={multiline}
      rows={rows}
      fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      helperText={helperText}
      error={error}
      onBlur={onBlur}
      name={name}
      select={select}
    >
      {children}
    </TextField>
  );
};

export default MyInput;
