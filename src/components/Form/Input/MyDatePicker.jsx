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
      <Typography variant="body1" color="initial" fontWeight="600">
        {title}
      </Typography>
      <DatePicker
        value={value}
        onChange={onChangeDate}
        format="DD-MM-YYYY"
        //  sx={{ backgroundColor: "#fff !important" }}
        slotProps={{
          textField: {
            size:'small',
            error: error,
            helperText: helperText,
            "& .muiformhelpertext-root": {
              color: "red",
              fontSize: "10px !important",
              margin: "3px 0px 0px !important",
              // backgroundColor:'#F5F5F5 !important'
            },
          },
        }}
      />
    </Stack>
  );
};

export default MyDatePicker;
