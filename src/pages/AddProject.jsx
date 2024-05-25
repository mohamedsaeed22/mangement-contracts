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
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [plannedCost, setPlannedCost] = useState("");
  const [actualCost, setActualCost] = useState("");
  const [progress, setProgress] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    setEndDate(null); // Clear the end date when start date changes
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const isFormValid = () => {
    return (
      age &&
      projectName &&
      projectDesc &&
      plannedCost &&
      actualCost &&
      progress &&
      startDate &&
      endDate
    );
  };

  const handleSubmit = () => {
    const projectData = {
      name: projectName,
      description: projectDesc,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      budget: parseFloat(plannedCost),
      spentBudget: parseFloat(actualCost),
      percentage: parseFloat(progress),
      status: age,
      branchId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      supervisorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    };
    console.log(projectData);
    // Replace the console.log with your backend call
    // fetch('your-backend-url', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(projectData),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Handle the response data
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
  };

  return (
    <>
      <Heading title="اضافة مشروع" />
      <Box border="1px dashed #ccc" borderRadius={2} m={4}>
        <Box p={2}>
          {/* activity */}
          <Stack ml={1}>
            <Box>
              <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
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
          {/* name and desc */}
          <Stack
            mt={3}
            sx={{
              border: "1px solid #ddd ",
              borderRadius: "8px",
              padding: "24px 18px",
              position: "relative",
              gap: 3,
              flexDirection: "row",
              flexWrap: "wrap",
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
              size="small"
              id="project-name"
              label=" الاسم"
              variant="outlined"
              sx={{ width: "250px" }}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />

            <TextField
              size="small"
              id="project-desc"
              label="الوصف"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
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
              flexWrap: "wrap",
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
              size="small"
              id="planned-cost"
              type="number"
              label="التكلفة المخططة"
              variant="outlined"
              sx={{ width: "250px" }}
              value={plannedCost}
              onChange={(e) => setPlannedCost(e.target.value)}
            />
            <TextField
              size="small"
              id="actual-cost"
              type="number"
              label="المنصرف الفعلى"
              variant="outlined"
              sx={{ width: "250px" }}
              value={actualCost}
              onChange={(e) => setActualCost(e.target.value)}
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
              flexWrap: "wrap",
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
              size="small"
              id="progress"
              label="نسبة مؤية %"
              variant="outlined"
              sx={{ width: "250px" }}
              type="number"
              value={progress}
              onChange={(e) => {
                const newValue = Math.min(Math.max(e.target.value, 0), 100); // Ensure the value is between 0 and 100
                setProgress(newValue);
              }}
              inputProps={{
                min: 0,
                max: 100,
              }}
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
              flexWrap: "wrap",
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
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ width: "250px" }}>
                  <DatePicker
                    label="بداية المشروع"
                    slotProps={{ textField: { size: "small" } }}
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
                    slotProps={{ textField: { size: "small" } }}
                    disabled={!startDate}
                  />
                </Box>
              </Box>
            </LocalizationProvider>
          </Stack>
          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              sx={{
                minWidth: 180,
                backgroundColor: "black",
                "&:hover": { backgroundColor: "#000", color: "#FFC100" },
              }}
              onClick={handleSubmit}
              disabled={!isFormValid()}
            >
              اضافة
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddProject;
