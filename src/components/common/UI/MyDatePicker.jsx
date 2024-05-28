import { Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";

const MyDatePicker = ({
  width,
  value,
  onChangeDate,
  title,
  disabled = false,
}) => {
  return (
    <Box sx={{ width: width }}>
      <DatePicker
        label={title}
        slotProps={{ textField: { size: "small" } }}
        value={value}
        onChange={onChangeDate}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="MM/DD/YYYY"
        disabled={disabled}
      />
    </Box>
  );
};

export default MyDatePicker;
