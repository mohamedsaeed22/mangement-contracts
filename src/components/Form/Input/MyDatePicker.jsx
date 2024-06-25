import { DatePicker } from "@mui/x-date-pickers";
import { Stack } from "@mui/material";

const MyDatePicker = ({
  name,
  title,
  value,
  onChangeDate,
  error,
  width,
  helperText,
  disabled,
  readOnly, // Add readOnly prop
}) => {
  return (
    <Stack gap={1} width={width}>
      <DatePicker
        disabled={disabled}
        label={title}
        value={value}
        onChange={onChangeDate}
        format="DD-MM-YYYY"
        slotProps={{
          textField: {
            size: "small",
            error: error,
            helperText: helperText,
            InputProps: {
              readOnly: readOnly, // Make the input read-only
            },
            sx: {
              "& .muiformhelpertext-root": {
                color: "red",
                fontSize: "10px !important",
                margin: "3px 0px 0px !important",
              },
            },
          },
        }}
      />
    </Stack>
  );
};

export default MyDatePicker;
