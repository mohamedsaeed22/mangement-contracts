import { DatePicker } from "@mui/x-date-pickers";
import { Grid, Stack, Typography } from "@mui/material";

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
    <Stack justifyContent="center" alignContent="center" alignItems="center">
      <Stack gap={1} width={width} >
        <Typography variant="body1" color="initial" fontWeight="600">
          {title}
        </Typography>
        <DatePicker
        
          value={value}
          onChange={onChangeDate}
          disabled={disabled}
          format="DD-MM-YYYY"
          sx={{}}
          slotProps={{
            textField: {
              error: error,
              helperText: helperText ? helperText : " ",
              "& .muiformhelpertext-root": {
                color: "red",
                fontSize: "10px !important",
                margin: "3px 0px 0px !important",
              },
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default MyDatePicker;
