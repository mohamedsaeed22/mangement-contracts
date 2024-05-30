import { useState } from "react";
import { Box, Button, MenuItem, Stack, Tooltip } from "@mui/material";
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
import projectSchema from "../validations/projectSchema";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { East } from "@mui/icons-material";

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
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  budget: "",
  spentBudget: "",
  percentage: "",
  status: "",
  branchId: "",
  supervisorId: "",
};

const myWidth = 250;

const AddProject = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const { supervisors } = useSelector((state) => state.supervisor);
  const { branches } = useSelector((state) => state.branch);

  const handleFormSubmit = (values) => {
    console.log(values);
    const projectData = {
      ...values,
      // startDate: values.startDate.toISOString(),
      // endDate: values.endDate.toISOString(),
      endDate: values.endDate,
      startDate: values.startDate,
      budget: parseFloat(values.budget),
      spentBudget: parseFloat(values.spentBudget),
      percentage: parseFloat(values.percentage),
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
      <Heading title={id ? "تعديل مشروع" : "اضافة مشروع"} />
      {id && (
        <Box
        sx={{
          position: "absolute",
          left: "29px",
          top: "60px",
          cursor: "pointer",
        }}
      >
        <Tooltip title="رحوع" placement="top" arrow>
          <NavLink to="/projectsbox" style={{ textDecoration: 'none' }}>
            <East style={{ color: 'black' }} />
          </NavLink>
        </Tooltip>
      </Box>
      )}
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
            <Stack component="form" gap={1} onSubmit={handleSubmit}>
              {/* row 1 */}
              <MyInputsWrapper>
                <MyInputsWrapper direction="column">
                  <MyInput
                    name="name"
                    label="الاسم"
                    placeholder="ادخل الاسم"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    width={myWidth}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                  />
                  <MyInput
                    name="status"
                    select
                    label="الحالة"
                    placeholder="اختر الحالة"
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

                <MyInput
                  name="description"
                  label="الوصف"
                  placeholder="ادخل الوصف"
                  multiline={true}
                  rows={5.3}
                  fullWidth={true}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                />
              </MyInputsWrapper>
              {/* row 2 */}
              <MyInputsWrapper>
                <MyInput
                  name="branchId"
                  select
                  label="النشاط"
                  placeholder="اختر النشاط"
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
                    <MenuItem disabled>لا يوجد انشطة</MenuItem>
                  )}
                </MyInput>

                <MyInput
                  name="supervisorId"
                  select
                  label="المشرف"
                  placeholder="اختر المشرف"
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
              </MyInputsWrapper>

              {/* row 3*/}
              <MyInputsWrapper>
                <MyInput
                  name="budget"
                  label="التكلفة المخططة"
                  placeholder="ادخل التكلفة"
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
                  placeholder="ادخل المنصرف"
                  width={myWidth}
                  type="number"
                  value={values.spentBudget}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.spentBudget && !!errors.spentBudget}
                  helperText={touched.spentBudget && errors.spentBudget}
                />
              </MyInputsWrapper>

              {/* row 4 */}
              <MyInputsWrapper>
                <MyDatePicker
                  name="startDate"
                  title="تاريخ البداية"
                  value={dayjs(values.startDate)}
                  onChangeDate={(value) => {
                    setFieldValue("startDate", value);
                    setFieldValue("endDate", null); // Reset endDate when startDate changes
                  }}
                  error={!!touched.startDate && !!errors.startDate}
                  helperText={touched.startDate && errors.startDate}
                />

                <MyDatePicker
                  name="endDate"
                  title="تاريخ النهاية"
                  value={dayjs(values.endDate)}
                  onChangeDate={(value) => {
                    setFieldValue("endDate", value);
                  }}
                  error={!!touched.endDate && !!errors.endDate}
                  helperText={touched.endDate && errors.endDate}
                />
              </MyInputsWrapper>
              {/* row 5 */}
              <MyInputsWrapper>
                <MyInput
                  name="percentage"
                  value={values.percentage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.percentage && !!errors.percentage}
                  helperText={touched.percentage && errors.percentage}
                  label="ما تم انجازة "
                  placeholder="ادخل نسبة مؤية"
                  width={myWidth}
                  type="number"
                />

                <Box
                  width={myWidth}
                  minHeight="100%"
                  textAlign="center"
                  alignSelf="center"
                  mt={2}
                >
                  <MyButton label={id ? "تعديل" : "اضافة"} type="submit" />
                </Box>
              </MyInputsWrapper>
            </Stack>
          )}
        </Formik>
      </LocalizationProvider>
    </>
  );
};

export default AddProject;
