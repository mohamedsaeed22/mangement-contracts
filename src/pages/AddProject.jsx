import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import actCreateProject from "../store/project/act/actCreateProject";
import {
  notifyFailed,
  notifySuccess,
} from "../components/feedback/Alerts/alerts";
import MyInput from "../components/Form/Input/MyInput";
import MyInputsWrapper from "../components/common/UI/MyInputsWrapper";
import MyDatePicker from "../components/Form/Input/MyDatePicker";
import MyButton from "../components/common/UI/MyButton";
import Heading from "../components/common/Heading/Heading";
import dayjs from "dayjs";
import projectSchema from "../validations/projectSchema";
import { NavLink, useParams } from "react-router-dom";
import { East, MoreVert } from "@mui/icons-material";
import { getProjectById } from "../store/project/projectSlice";

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
  startDate: dayjs().toISOString(),
  endDate: dayjs().toISOString(),
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
  const dispatch = useDispatch();
  const { supervisors } = useSelector((state) => state.supervisor);
  const { branches } = useSelector((state) => state.branch);
  const { project, loading } = useSelector((state) => state.project); // Ensure you have a loading state

  const [myProject, setMyProject] = useState(initialValues);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (id) {
      dispatch(getProjectById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && project) {
      setMyProject({
        ...project,
        startDate: dayjs(project.startDate).toISOString(),
        endDate: dayjs(project.endDate).toISOString(),
      });
    }
  }, [id, project]);

  const handleFormSubmit = (values) => {
    console.log(values);
    const projectData = {
      ...values,
      endDate: values.endDate,
      startDate: values.startDate,
      budget: parseFloat(values.budget),
      spentBudget: parseFloat(values.spentBudget),
      percentage: parseFloat(values.percentage),
    };

    dispatch(actCreateProject(projectData))
      .unwrap()
      .then(() => {
        notifySuccess("تم اضافة المشروع بنجاح");
      })
      .catch(() => {
        notifyFailed("حدث خطا ما..الرجاء المحاولة مره اخرى");
      });
  };

  return (
    <>
      <Heading title={id ? "تعديل مشروع" : "اضافة مشروع"} />
      {id && (
        <Stack
          direction="row"
          width="95%"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            position: "absolute",
            left: "29px",
            top: "50px",
            cursor: "pointer",
          }}
        >
          <Box>
            <Tooltip title="رحوع" placement="top" arrow>
              <IconButton>
                <NavLink to="/projectsbox" style={{ textDecoration: "none" }}>
                  <East style={{ color: "black" }} />
                </NavLink>
              </IconButton>
            </Tooltip>
          </Box>
          <Stack direction="row">
            <Button variant="outlined">تعديل</Button>
            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={handleClose}>حذف</MenuItem>
              </Menu>
            </div>
          </Stack>
        </Stack>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Formik
          key={JSON.stringify(myProject)} // Force Formik to reinitialize when myProject changes
          onSubmit={handleFormSubmit}
          initialValues={myProject}
          validationSchema={projectSchema}
          enableReinitialize // Add this to allow reinitializing with new values
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <MyInput
                    width={myWidth}
                    name="name"
                    label="الاسم"
                    placeholder="ادخل الاسم"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <MyInput
                    width={myWidth}
                    name="status"
                    select
                    label="الحالة"
                    placeholder="اختر الحالة"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.status && !!errors.status}
                    helperText={touched.status && errors.status}
                  >
                    {projectStateOptions.map((status) => (
                      <MenuItem key={status.id} value={status.id}>
                        {status.name}
                      </MenuItem>
                    ))}
                  </MyInput>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <MyInput
                    width={myWidth}
                    name="branchId"
                    select
                    label="النشاط"
                    placeholder="اختر النشاط"
                    value={values.branchId}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <MyInput
                    width={myWidth}
                    name="supervisorId"
                    select
                    label="المشرف"
                    placeholder="اختر المشرف"
                    value={values.supervisorId}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <MyInput
                    width={myWidth}
                    name="budget"
                    label="التكلفة المخططة"
                    placeholder="ادخل التكلفة"
                    type="number"
                    value={values.budget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.budget && !!errors.budget}
                    helperText={touched.budget && errors.budget}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <MyInput
                    width={myWidth}
                    name="spentBudget"
                    label="المنصرف الفعلى"
                    placeholder="ادخل المنصرف"
                    type="number"
                    value={values.spentBudget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.spentBudget && !!errors.spentBudget}
                    helperText={touched.spentBudget && errors.spentBudget}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <MyInput
                    width={myWidth}
                    name="percentage"
                    label="ما تم انجازة"
                    placeholder="ادخل نسبة مؤية"
                    type="number"
                    value={values.percentage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.percentage && !!errors.percentage}
                    helperText={touched.percentage && errors.percentage}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <MyDatePicker
                    name="startDate"
                    width={myWidth}
                    title="تاريخ البداية"
                    value={dayjs(values.startDate)}
                    onChangeDate={(value) => {
                      setFieldValue("startDate", value.toISOString());
                      setFieldValue("endDate", null); // Reset endDate when startDate changes
                    }}
                    error={!!touched.startDate && !!errors.startDate}
                    helperText={touched.startDate && errors.startDate}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <MyDatePicker
                    name="endDate"
                    width={myWidth}
                    title="تاريخ النهاية"
                    value={dayjs(values.endDate)}
                    onChangeDate={(value) => {
                      setFieldValue("endDate", value.toISOString());
                    }}
                    error={!!touched.endDate && !!errors.endDate}
                    helperText={touched.endDate && errors.endDate}
                  />
                </Grid>
                <Grid item xs={4}>
                  <MyInput
                    name="description"
                    label="الوصف"
                    multiline={true}
                    // fullWidth={true}
                    rows={3}
                    placeholder="ادخل الوصف"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                  />
                </Grid>
              </Grid>
              {!id && (
                <Box
                  minHeight="100%"
                  textAlign="center"
                  alignSelf="center"
                  mt={2}
                >
                  <MyButton label={"اضافة"} type="submit" width={250} />
                </Box>
              )}

              {/* row 5 */}
            </Stack>
          )}
        </Formik>
      </LocalizationProvider>
    </>
  );
};

export default AddProject;
