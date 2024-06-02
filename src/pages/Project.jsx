import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  Typography,
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
  { id: 4, name: "معلق" },
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

const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { supervisors } = useSelector((state) => state.supervisor);
  const { branches } = useSelector((state) => state.branch);
  const { project, loading } = useSelector((state) => state.project); // Ensure you have a loading state
  console.log(project);
  const [myProject, setMyProject] = useState(initialValues);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showRisks, setShowRisks] = useState("no");

  const handleChangeRisks = (event) => {
    setShowRisks(event.target.value);
  };
  console.log(setShowRisks);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    dispatch(actDeleteProject(id))
      .unwrap()
      .then((res) => {
        console.log(res);
        notifySuccess("تم حذف المشروع بنجاح");
        navigate("/projectsbox", { replace: true });
      })
      .catch((res) => {
        console.log(res);
        notifyFailed("حدث خطا ما..الرجاء المحاولة مره اخرى");
      });
    setAnchorEl(null);
  };

  useEffect(() => {
    if (id) {
      dispatch(actGetProjectById(id));
    } else {
      setMyProject(initialValues);
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
    if (id) {
      dispatch(actUpdateProject(projectData))
        .unwrap()
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            notifySuccess("تم تعديل المشروع بنجاح");
            navigate(-1);
          } else {
            notifyFailed(" خطا ما..الرجاء المحاولة مره اخرى");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      dispatch(actCreateProject(projectData))
        .unwrap()
        .then(() => {
          notifySuccess("تم اضافة المشروع بنجاح");
          // resetForm()
        })
        .catch(() => {
          notifyFailed("حدث خطا ما..الرجاء المحاولة مره اخرى");
        });
    }
  };

  return (
    <>
      <Heading title={id ? "تعديل مشروع" : "اضافة مشروع"} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Formik
          key={JSON.stringify(myProject)}
          onSubmit={(values, { resetForm }) => {
            handleFormSubmit(values);
            if (id) {
              resetForm();
            }
          }}
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
              mt="60px"
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
                  <MyInput
                    width={180}
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
              <Box
                padding="0px 10px 0px"
                border="2px solid #000"
                borderRadius={2}
                flex={1}
              >
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
                    label="ادخل نسبة مؤية"
                    type="number"
                    value={values.percentage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.percentage && !!errors.percentage}
                    helperText={touched.percentage && errors.percentage}
                  />
                </MyInputsWrapper>
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
                <MyInputsWrapper title="المخاطر و المعوقات">
                  <Box>
                    <Typography variant="body1" color="initial" mt={1}>
                      هل له مخاطر ؟
                    </Typography>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-form-control-label-placement"
                        name="position"
                        value={showRisks}
                        onChange={handleChangeRisks}
                      >
                        <FormControlLabel
                          value="no"
                          control={<Radio size="small" />}
                          label="لا"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          value="yes"
                          control={<Radio size="small" />}
                          label="نعم"
                          labelPlacement="start"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>

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

export default Project;
