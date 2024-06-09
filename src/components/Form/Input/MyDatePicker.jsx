import { DatePicker } from "@mui/x-date-pickers";
import { Stack, Typography } from "@mui/material";

const MyDatePicker = ({
  name,
  title,
  value,
  onChangeDate,
  error,
  width,
  helperText,
  disabled,
}) => {
  return (
    <Stack gap={1} width={width}>
      <DatePicker
        label={title}
        value={value}
        onChange={onChangeDate}
        format="DD-MM-YYYY"
        slotProps={{
          textField: {
            size: "small",
            error: error,
            helperText: helperText,
            "& .muiformhelpertext-root": {
              color: "red",
              fontSize: "10px !important",
              margin: "3px 0px 0px !important",
            },
          },
        }}
      />
    </Stack>
  );
};

export default MyDatePicker;
