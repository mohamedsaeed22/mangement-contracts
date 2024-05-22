import React, { useState } from "react";
import Heading from "../components/common/Heading/Heading";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const AddProject = () => {
  const [age, setAge] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    setEndDate(null); // Clear the end date when start date changes
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box>
      <Heading title="اضافة مشروع" />
      <Box p={2}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
          mt={2}
        >
          <Typography variant="body1" color="initial">
            اختر النشاط
          </Typography>
          <Box sx={{ minWidth: 220 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">النشاط</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="النشاط"
                onChange={handleChange}
              >
                <MenuItem value={10}>التعدين</MenuItem>
                <MenuItem value={20}>المحاجر</MenuItem>
                <MenuItem value={30}>الزراعة</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <Stack
          mt={3}
          sx={{
            border: "1px solid #ddd ",
            borderRadius: "8px",
            padding: "24px 18px",
            position: "relative",
            gap: 3,
            flexDirection: "row",
          }}
        >
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: "13px",
              position: "absolute",
              top: "-10px",
              paddingInline: "6px",
              backgroundColor: "#fff",
            }}
          >
            اسم و وصف المشروع
          </Typography>
          <TextField
            id="project-name"
            label=" الاسم"
            variant="outlined"
            sx={{ minWidth: "250px" }}
          />
          <TextField
            id="project-desc"
            label="الوصف"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
          />
        </Stack>

        <Stack
          mt={3}
          sx={{
            border: "1px solid #ddd ",
            borderRadius: "8px",
            padding: "24px 18px",
            position: "relative",
            gap: 3,
            flexDirection: "row",
          }}
        >
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: "13px",
              position: "absolute",
              top: "-10px",
              paddingInline: "6px",
              backgroundColor: "#fff",
            }}
          >
            تكلفة المشروع
          </Typography>
          <TextField
            id="project-name"
            type="number"
            label="التكلفة المخططة"
            variant="outlined"
            sx={{ width: "250px" }}
          />
          <TextField
            id="project-desc"
            type="number"
            label="المنصرف الفعلى"
            variant="outlined"
            sx={{ width: "250px" }}
          />
        </Stack>

        <Stack
          mt={3}
          sx={{
            border: "1px solid #ddd ",
            borderRadius: "8px",
            padding: "24px 18px",
            position: "relative",
            gap: 3,
            flexDirection: "row",
          }}
        >
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: "13px",
              position: "absolute",
              top: "-10px",
              paddingInline: "6px",
              backgroundColor: "#fff",
            }}
          >
            ما تم انجازة من المشروع
          </Typography>
          <TextField
            id="project-desc"
            label="نسبة مؤية %"
            variant="outlined"
            sx={{ width: "250px" }}
            type="number"
          />
        </Stack>

        <Stack
          mt={3}
          sx={{
            border: "1px solid #ddd ",
            borderRadius: "8px",
            padding: "24px 18px",
            position: "relative",
            gap: 3,
            flexDirection: "row",
          }}
        >
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: "13px",
              position: "absolute",
              top: "-10px",
              paddingInline: "6px",
              backgroundColor: "#fff",
            }}
          >
            الخطة الزمنية للمشروع
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                mt: 2,
                gap: 3,
              }}
            >
              <Box sx={{ width: "250px" }}>
                <DatePicker
                  label="بداية المشروع"
                  value={startDate}
                  onChange={handleStartDateChange}
                  renderInput={(params) => <TextField {...params} />}
                  inputFormat="MM/DD/YYYY"
                />
              </Box>
              <Box sx={{ width: "250px" }}>
                <DatePicker
                  label="نهاية المشروع"
                  value={endDate}
                  onChange={handleEndDateChange}
                  renderInput={(params) => <TextField {...params} />}
                  inputFormat="MM/DD/YYYY"
                  minDate={startDate || null}
                  disabled={!startDate}
                />
              </Box>
            </Box>
          </LocalizationProvider>
        </Stack>
        <Box mt={3} textAlign="center">

        <Button variant="contained">اضافة</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddProject;
