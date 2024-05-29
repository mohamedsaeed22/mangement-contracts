import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

const MyDatePicker = ({
  name,
  title,
  value,
  onChangeDate,
  width,
  error,
  helperText,
  disabled,
}) => {
  return (
    <DatePicker
      label={title}
      value={value}
      onChange={onChangeDate}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          sx={{ width: width }}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};

export default MyDatePicker;
