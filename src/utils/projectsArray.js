/**
 * 
 * import { useState } from "react";
import { Box, Button, MenuItem, Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { Field, Formik } from "formik";
import actCreateProject from "../store/project/act/actCreateProject";
import { notifyFailed, notifySuccess } from "../components/feedback/alerts";
import MySelect from "../components/common/UI/MySelect";
import MyInput from "../components/common/UI/MyInput";
import MyInputsWrapper from "../components/common/UI/MyInputsWrapper";
import MyDatePicker from "../components/common/UI/MyDatePicker";
import MyButton from "../components/common/UI/MyButton";
import Heading from "../components/common/Heading/Heading";
import dayjs from "dayjs";
import projectSchema from "../validations/ProjectSchema";

const projectStateOptions = [
  { id: 1, name: "لم يتم البدء" },
  { id: 2, name: "جار العمل علية" },
  { id: 3, name: "اكتمل" },
  { id: 4, name: "مرفوض" },
  { id: 5, name: "معلق" },
];

const initialValues = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  budget: "",
  spentBudget: "",
  percentage: "",
  status: "",
  branchId: "",
  supervisorId: "",
};

const myWidth = 250;

const AddProject = () => {
  const dispatch = useDispatch();
  const { supervisors } = useSelector((state) => state.supervisor);
  const { branches } = useSelector((state) => state.branch);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    setEndDate(null);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue ? newValue.toDate() : null); // Convert newValue to a Date object
  };
  const handleFormSubmit = (values) => {
        // const projectData = {
    //   ...values,
    //   startDate: values.startDate.toISOString(),
    //   endDate: values.endDate.toISOString(),
    //   budget: parseFloat(values.budget),
    //   spentBudget: parseFloat(values.spentBudget),
    //   percentage: parseFloat(values.percentage),
    // };

    // dispatch(actCreateProject(projectData))
    //   .unwrap()
    //   .then((res) => {
    //     notifySuccess("تم اضافة المشروع بنجاح");
    //   })
    //   .catch((err) => {
    //     notifyFailed("حدث خطا ما..الرجاء المحاولة مره اخرى");
    //   });
  };

  return (
    <>
      <Heading title="اضافة مشروع" />
      <Box border="1px dashed #ccc" borderRadius={2} m={2}>
        <Box p={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={projectSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
              }) => (
                <Stack component="form" onSubmit={handleSubmit}>
                  <MyInputsWrapper>
                    <MyInput
                      name="branchId"
                      select
                      label="النشاط"
                      value={values.branchId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      width={myWidth}
                      error={!!touched.branchId && !!errors.branchId}
                      helperText={touched.branchId && errors.branchId}
                    >
                      {branches.length > 0 ? (
                        branches.map((branch) => (
                          <MenuItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem>لا يوجد انشطة</MenuItem>
                      )}
                    </MyInput>

                    <MyInput
                      name="supervisorId"
                      select
                      label="مشرف المشروع"
                      value={values.supervisorId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      width={myWidth}
                      error={!!touched.supervisorId && !!errors.supervisorId}
                      helperText={touched.supervisorId && errors.supervisorId}
                    >
                      {supervisors.length > 0 ? (
                        supervisors.map((supervisor) => (
                          <MenuItem key={supervisor.id} value={supervisor.id}>
                            {supervisor.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>لا يوجد مشرفين</MenuItem>
                      )}
                    </MyInput>

                    <MyInput
                      name="status"
                      select
                      label="حالة المشروع"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      width={myWidth}
                      error={!!touched.status && !!errors.status}
                      helperText={touched.status && errors.status}
                    >
                      {projectStateOptions.map((status) => (
                        <MenuItem key={status.id} value={status.id}>
                          {status.name}
                        </MenuItem>
                      ))}
                    </MyInput>
                  </MyInputsWrapper>

                  <MyInputsWrapper direction="column" title="اسم و وصف المشروع">
                    <MyInput
                      name="name"
                      label="الاسم"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      width={myWidth}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />

                    <MyInput
                      name="description"
                      label="الوصف"
                      multiline={true}
                      rows={3}
                      fullWidth={true}
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.description && !!errors.description}
                      helperText={touched.description && errors.description}
                    />
                  </MyInputsWrapper>

                  <MyInputsWrapper title="تكلفة المشروع">
                    <MyInput
                      name="budget"
                      label="التكلفة المخططة"
                      width={myWidth}
                      type="number"
                      value={values.budget}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.budget && !!errors.budget}
                      helperText={touched.budget && errors.budget}
                    />
                    <MyInput
                      name="spentBudget"
                      label="المنصرف الفعلى"
                      width={myWidth}
                      type="number"
                      value={values.spentBudget}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.spentBudget && !!errors.spentBudget}
                      helperText={touched.spentBudget && errors.spentBudget}
                    />
                  </MyInputsWrapper>

                  <MyInputsWrapper title="ما تم انجازة من المشروع">
                    <MyInput
                      name="percentage"
                      value={values.percentage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!touched.percentage && !!errors.percentage}
                      helperText={touched.percentage && errors.percentage}
                      label="نسبة مؤية %"
                      width={myWidth}
                      type="number"
                    />
                  </MyInputsWrapper>
                  <MyInputsWrapper title="الخطة الزمنية للمشروع">
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
                        name="startDate"
                        title="بداية المشروع"
                        value={dayjs(values.startDate)}
                        onChangeDate={(value) => {
                          setFieldValue("startDate", value);
                          setFieldValue("endDate", null); // Reset endDate when startDate changes
                        }}
                        width={250}
                        error={!!touched.startDate && !!errors.startDate}
                        helperText={touched.startDate && errors.startDate}
                      />

                      <MyDatePicker
                        name="endDate"
                        title="نهاية المشروع"
                        value={dayjs(values.endDate)}
                        onChangeDate={(value) => {
                          setFieldValue("endDate", value);
                        }}
                        width={250}
                        disabled={!values.startDate}
                        error={!!touched.endDate && !!errors.endDate}
                        helperText={touched.endDate && errors.endDate}
                      />
                    </Box>
                  </MyInputsWrapper>

                  <Box mt={3} textAlign="center">
                    <MyButton label="اضافة" type="submit" />
                  </Box>
                </Stack>
              )}
            </Formik>{" "}
          </LocalizationProvider>
        </Box>
      </Box>
    </>
  );
};

export default AddProject;

 * 
 */
