import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { InputLabel, Stack, TextField } from "@mui/material";

const MyInput = ({
  value,
  label,
  placeholder,
  width,
  multiline = false,
  fullWidth = false,
  rows = 0,
  type = "text",
  error,
  helperText,
  size = "small",
  onBlur,
  onChange,
  name,
  select = false,
  disabled = false,
  children,
}) => {
  return (
    <Stack gap={1} maxWidth="100%" width={fullWidth ? "100%" : width}>
      <FormControl
        sx={{
          width: fullWidth ? "100%" : width,
          "& .muiformhelpertext-root": {
            color: "red",
            fontSize: "10px !important",
            margin: "3px 0px 0px !important",
          },
        }}
        variant="outlined"
        error={error}
      >
        {/* <InputLabel id={`my-input-${name}`}>Age</InputLabel> */}
        {select ? (
          <Select
            labelId={`my-input-${name}`}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            name={name}
            size="small"
            displayEmpty
            // sx={{ backgroundColor: "#fff !important" }}
            // inputProps={{ "aria-label": "Without label" }}
            renderValue={value !== "" ? undefined : () => placeholder}
          >
            {children}
          </Select>
        ) : (
          <TextField
            variant="outlined"
            id={`my-input-${name}`}
            size={size}
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            // sx={{ backgroundColor: "#fff !important" }}
            onBlur={onBlur}
            // placeholder={placeholder}
            multiline={multiline}
            rows={rows}
            name={name}
            fullWidth={fullWidth}
            // sx={{ "&::placeholder": { fontSize: "12px" } }}
          />
        )}
        {helperText ? <FormHelperText>{helperText}</FormHelperText> : " "}
      </FormControl>
    </Stack>
  );
};

export default MyInput;
