import { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import Heading from "../components/common/Heading/Heading";
import dayjs from "dayjs";
import projectSchema from "../validations/projectSchema";
import { useNavigate, useParams } from "react-router-dom";
import { East, MoreVert } from "@mui/icons-material";
import actUpdateProject from "../store/project/act/actUpdateProject";
import actGetProjectById from "../store/project/act/actGetProjectById";
import actDeleteProject from "../store/project/act/actDeleteProject";
import MyBtn from "../components/common/UI/MyBtn";

const projectStateOptions = [
  { id: 1, name: "لم يتم البدء" },
  { id: 2, name: "جار العمل علية" },
  { id: 3, name: "اكتمل" },
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
  ActivityId: "",
  supervisorId: "",
};

const myWidth = 250;

const AddProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { supervisors } = useSelector((state) => state.supervisor);
  const { activities } = useSelector((state) => state.activity);
  const { project, loading } = useSelector((state) => state.project); // Ensure you have a loading state
  const [myProject, setMyProject] = useState(initialValues);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    dispatch(actDeleteProject(id))
      .unwrap()
      .then((res) => {
        notifySuccess("تم حذف المشروع بنجاح");
        navigate(-1);
      })
      .catch((res) => {
        notifyFailed("حدث خطا ما..الرجاء المحاولة مره اخرى");
      });
    setAnchorEl(null);
  };

  useEffect(() => {
    if (id) {
      dispatch(actGetProjectById(id));
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
    // const projectData = {
    //   ...values,
    //   endDate: values.endDate,
    //   startDate: values.startDate,
    //   budget: parseFloat(values.budget),
    //   spentBudget: parseFloat(values.spentBudget),
    //   percentage: parseFloat(values.percentage),
    // };
    // if (id) {
    //   dispatch(actUpdateProject(projectData))
    //     .unwrap()
    //     .then((res) => {
    //           //       notifySuccess("تم تعديل المشروع بنجاح");
    //     })
    //     .catch((res) => {
    //           //       notifyFailed("حدث خطا ما..الرجاء المحاولة مره اخرى");
    //     });
    // } else {
    //   dispatch(actCreateProject(projectData))
    //     .unwrap()
    //     .then(() => {
    //       notifySuccess("تم اضافة المشروع بنجاح");
    //     })
    //     .catch(() => {
    //       notifyFailed("حدث خطا ما..الرجاء المحاولة مره اخرى");
    //     });
    // }
  };

  return (
    <>
      <Heading title={id ? "تعديل مشروع" : "اضافة مشروع"} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Formik
          key={JSON.stringify(myProject)}
          onSubmit={handleFormSubmit}
          initialValues={myProject}
          validationSchema={projectSchema}
          enableReinitialize
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
            <Stack
              component="form"
              gap={1}
              onSubmit={handleSubmit}
              flexGrow={1}
              mt="80px"
              sx={{ marginInline: { xs: "5px", sm: "10px", md: "20px" } }}
            >
              <Stack direction="row" flexWrap="wrap" gap={2} mr={1}>
                <Box flexGrow={1}>
                  <Tooltip title="رجوع" placement="top" arrow>
                    <IconButton onClick={() => navigate(-1)}>
                      <East style={{ color: "black" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  gap={1}
                  justifyContent="center"
                >
                  <MyInput
                    width={180}
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
                  <MyInput
                    width={180}
                    name="ActivityId"
                    select
                    label="النشاط"
                    placeholder="اختر النشاط"
                    value={values.ActivityId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.ActivityId && !!errors.ActivityId}
                    helperText={touched.ActivityId && errors.ActivityId}
                  >
                    {activities.length > 0 ? (
                      activities.map((Activity) => (
                        <MenuItem key={Activity.id} value={Activity.id}>
                          {Activity.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>لا يوجد انشطة</MenuItem>
                    )}
                  </MyInput>
                  <MyInput
                    width={180}
                    name="supervisorId"
                    select
                    label="الاستشارى"
                    placeholder="اختر الاستشارى"
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
                  {id && (
                    <Stack direction="row" alignSelf="flex-start">
                      <MyBtn
                        title="تعديل"
                        type="submit"
                        handleBtnClick={handleFormSubmit}
                      />
                      <Box>
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
                      </Box>
                    </Stack>
                  )}
                </Stack>
              </Stack>
              <Box p={1} border="2px solid #000" borderRadius={2} flex={1}>
                {/* row 1 */}

                <MyInputsWrapper direction="column" title="اسم و وصف المشروع">
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
                  <MyInput
                    name="description"
                    label="الوصف"
                    multiline={true}
                    fullWidth={true}
                    rows={3}
                    placeholder="ادخل الوصف"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                  />
                </MyInputsWrapper>
                {/* 
                <MyInputsWrapper title="تكلفة المشروع">
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
                </MyInputsWrapper>

                <MyInputsWrapper title="ما تم انجازة من المشروع">
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
                </MyInputsWrapper> */}

                <MyInputsWrapper title="الخطة الزمنية للمشروع">
                  <MyDatePicker
                    name="startDate"
                    width={myWidth}
                    title="تاريخ البداية"
                    value={dayjs(values.startDate)}
                    onChangeDate={(value) => {
                      setFieldValue("startDate", value.toISOString());
                      setFieldValue("endDate", null);
                    }}
                    error={!!touched.startDate && !!errors.startDate}
                    helperText={touched.startDate && errors.startDate}
                  />

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
                </MyInputsWrapper>

                {!id && (
                  <Box
                    minHeight="100%"
                    textAlign="center"
                    alignSelf="center"
                    mt={4}
                    width={250}
                    marginInline="auto"
                  >
                    <MyBtn title={"اضافة"} type="submit" width={250} />
                  </Box>
                )}

                {/* row 5 */}
              </Box>
            </Stack>
          )}
        </Formik>
      </LocalizationProvider>
    </>
  );
};

export default AddProject;
