import { DatePicker } from "@mui/x-date-pickers";
import { Box, FormHelperText, Stack, TextField, Typography } from "@mui/material";

const MyDatePicker = ({
  name,
  title,
  value,
  onChangeDate,
  error,
  helperText,
  disabled,
}) => {
  return (
    <Stack width={250} gap={1} >
      <Typography variant="body1" color="initial" fontWeight="600">
        {title}
      </Typography>
      <DatePicker
        value={value}
        onChange={onChangeDate}
        disabled={disabled}
        format="DD-MM-YYYY"

        // renderInput={(params) => (
        //   <TextField
        //     {...params}
        //     name={name}
        //     error={error}
        //     helperText={helperText}
        //   />
        // )}
        sx={{}}
        slotProps={{
          textField: {
            error:error,
            helperText: helperText ? helperText : " ",
            "& .MuiFormHelperText-root": {
              color: "red",
              fontSize: "10px !important",
              margin: "3px 0px 0px !important",
            },
          },
        }}
      />
      {/* {helperText ? <FormHelperText>{helperText}</FormHelperText> : " "} */}
    </Stack>
  );
};

export default MyDatePicker;
