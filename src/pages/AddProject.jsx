import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { actGetBranches } from "../store/branch/branchSlice";
import { actGetSupervisors } from "../store/supervisor/supervisorSlice";
import actCreateProject from "../store/project/act/actCreateProject";
import { notifyFailed, notifySuccess } from "../components/feedback/alerts";

const AddProject = () => {
  const dispatch = useDispatch();
  const { branches } = useSelector((state) => state.branch);
  const { supervisors } = useSelector((state) => state.supervisor);
  const [branche, setBranch] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [plannedCost, setPlannedCost] = useState("");
  const [actualCost, setActualCost] = useState("");
  const [progress, setProgress] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    setEndDate(null);
  };

  useEffect(() => {
    dispatch(actGetBranches());
    dispatch(actGetSupervisors());
  }, [dispatch]);

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleChangeBranche = (event) => {
    setBranch(event.target.value);
  };
  const handleChangeSupervisor = (event) => {
    setSupervisor(event.target.value);
  };

  const isFormValid = () => {
    return (
      branche &&
      supervisor &&
      projectName.length > 5 &&
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
      status: 1,
      branchId: branche,
      supervisorId: supervisor,
    };
    dispatch(actCreateProject(projectData))
      .unwrap()
      .then((res) => {
        notifySuccess("تم اضافة المشروع بنجاح");
      })
      .catch((err) => {
        notifyFailed("حدث خطا ما..الرجاء المحاولة مره اخرى");
      });
  };

  return (
    <>
      <Heading title="اضافة مشروع" />
      <Box border="1px dashed #ccc" borderRadius={2} m={4}>
        <Box p={2}>
          {/* branches and supervisor */}
          <Stack direction="row" gap={3} ml={1} flexWrap="wrap">
            <Box>
              <FormControl sx={{ minWidth: 250 }} size="small">
                <InputLabel id="demo-simple-select-branche">النشاط</InputLabel>
                <Select
                  labelId="demo-simple-select-branche"
                  id="demo-simple-selectBranch"
                  value={branche}
                  label="النشاط"
                  onChange={handleChangeBranche}
                >
                  {branches?.map((branch) => (
                    <MenuItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ minWidth: 250 }} size="small">
                <InputLabel id="demo-simple-select-supervisor">
                  مشرف المشروع
                </InputLabel>
                <Select
                  labelId="demo-simple-select-supervisor"
                  id="demo-simple-selectSupervisor"
                  value={supervisor}
                  label="مشرف المشروع"
                  onChange={handleChangeSupervisor}
                >
                  {supervisors?.map((supervisor) => (
                    <MenuItem key={supervisor.id} value={supervisor.id}>
                      {supervisor.name}
                    </MenuItem>
                  ))}
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
              sx={{
                width: "250px",
                "& .MuiFormHelperText-root": {
                  color: "red",
                  fontSize: "12px !important ",
                },
              }}
              helperText="اسم المشروع لابد ان يكون اكثر من 5 احرف"
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
