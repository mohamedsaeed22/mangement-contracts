import React, { useEffect, useState } from "react";
import Heading from "../components/common/Heading/Heading";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { actGetBranches } from "../store/branch/branchSlice";
import { actGetSupervisors } from "../store/supervisor/supervisorSlice";
import actCreateProject from "../store/project/act/actCreateProject";
import { notifyFailed, notifySuccess } from "../components/feedback/alerts";
import MySelect from "../components/common/UI/MySelect";
import MyInput from "../components/common/UI/MyInput";
import MyInputsWrapper from "../components/common/UI/MyInputsWrapper";
import MyDatePicker from "../components/common/UI/MyDatePicker";
import MyButton from "../components/common/UI/MyButton";

const projectStateOptions = [
  { id: 1, name: "لم يتم البدء" },
  { id: 2, name: "جار العمل علية" },
  { id: 3, name: "اكتمل" },
  { id: 4, name: "مرفوض" },
  { id: 5, name: "معلق" },
];
const myWidth = 250;

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
  const [projectState, setProjectState] = useState("");

  // useEffect(() => {
  //   dispatch(actGetSupervisors());
  // }, [dispatch]);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    setEndDate(null);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleChangeBranche = (event) => {
    setBranch(event.target.value);
  };
  const handleChangeSupervisor = (event) => {
    setSupervisor(event.target.value);
  };

  const handleChangeProjectState = (event) => {
    setProjectState(event.target.value);
  };

  const isFormValid = () => {
    return (
      branche &&
      supervisor &&
      projectName.length > 5 &&
      projectDesc &&
      projectState &&
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
      status: projectState,
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
      <Box border="1px dashed #ccc" borderRadius={2} m={2}>
        <Box p={1}>
          <MyInputsWrapper>
            <MySelect
              label="النشاط"
              value={supervisor}
              onChangeValue={handleChangeBranche}
              list={supervisors}
            />
            <MySelect
              label="مشرف المشروع"
              value={supervisor}
              onChangeValue={handleChangeSupervisor}
              list={supervisors}
            />
            <MySelect
              label="حاله المشروع"
              value={projectState}
              onChangeValue={handleChangeProjectState}
              list={projectStateOptions}
            />
          </MyInputsWrapper>

          <MyInputsWrapper direction="column" title="اسم و وصف المشروع">
            <MyInput
              value={projectName}
              onChangeValue={(e) => setProjectName(e.target.value)}
              label="الاسم"
              width={myWidth}
            />
            <MyInput
              value={projectDesc}
              onChangeValue={(e) => setProjectDesc(e.target.value)}
              label="الوصف"
              multiline={true}
              rows={3}
              fullWidth={true}
            />
          </MyInputsWrapper>

          <MyInputsWrapper title="تكلفة المشروع">
            <MyInput
              value={plannedCost}
              onChangeValue={(e) => setPlannedCost(e.target.value)}
              label="التكلفة المخططة"
              width={myWidth}
              type="number"
            />
            <MyInput
              value={actualCost}
              onChangeValue={(e) => setActualCost(e.target.value)}
              label="المنصرف الفعلى"
              width={myWidth}
              type="number"
            />
          </MyInputsWrapper>

          <MyInputsWrapper title="ما تم انجازة من المشروع">
            <MyInput
              value={progress}
              onChangeValue={(e) => {
                const newValue = Math.min(Math.max(e.target.value, 0), 100);
                setProgress(newValue);
              }}
              label="نسبة مؤية %"
              width={myWidth}
              type="number"
            />
          </MyInputsWrapper>

          <MyInputsWrapper title="الخطة الزمنية للمشروع">
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
                <MyDatePicker
                  title="بداية المشروع"
                  value={startDate}
                  onChangeDate={handleStartDateChange}
                  width={250}
                />

                <MyDatePicker
                  title="نهاية المشروع"
                  value={endDate}
                  onChangeDate={handleEndDateChange}
                  width={250}
                  disabled={!startDate}
                />
              </Box>
            </LocalizationProvider>
          </MyInputsWrapper>

          <Box mt={3} textAlign="center">
            <MyButton
              label="اضافة"
              handleClick={handleSubmit}
              disabled={!isFormValid()}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddProject;
