import { TextField } from "@mui/material";
import React from "react";

const MuiInput = ({
  handleChange,
  handleBlur,
  value,
  name,
  error,
  helperText,
  label,
}) => {
  return (
    <TextField
      size="small"
      name={name}
      fullWidth
      onChange={handleChange}
      onBlur={handleBlur}
      error={error}
      helperText={helperText}
      label={label}
      value={value}
    />
  );
};

export default MuiInput;
