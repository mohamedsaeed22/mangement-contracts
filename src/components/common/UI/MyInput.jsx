import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

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
  onBlur,
  onChange,
  name,
  select = false,
  children,
}) => {
  return (
    <Stack gap={1} mb={2}>
      <Typography variant="body1" color="initial" fontWeight="600">
        {label}
      </Typography>
      <FormControl
        sx={{
          width: fullWidth ? "100%" : width,
          "& .MuiFormHelperText-root": {
            color: "red",
            fontSize: "10px !important",
            margin: "3px 0px 0px !important",
          },
        }}
        variant="outlined"
        error={error}
      >
        {select ? (
          <Select
            id={`my-input-${name}`}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            renderValue={value !== "" ? undefined : () => placeholder}
          >
            {/* <MenuItem value="" disabled>
            {label}
          </MenuItem> */}

            {children}
          </Select>
        ) : (
          <OutlinedInput
            id={`my-input-${name}`}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            multiline={multiline}
            rows={rows}
            name={name}
            sx={{
              textarea: {
                // resize: "horizontal",
                // maxWidth: "250px",
              },
            }}
          />
        )}
        {helperText ? <FormHelperText>{helperText}</FormHelperText> : " "}
      </FormControl>
    </Stack>
  );
};

export default MyInput;
