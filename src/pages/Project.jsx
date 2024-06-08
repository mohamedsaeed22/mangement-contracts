import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import actCreateProject from "../store/project/act/actCreateProject";
import {
  notifyFailed,
  notifySuccess,
  SweatAlert,
} from "../components/feedback/Alerts/alerts";
import MyInput from "../components/Form/Input/MyInput";
import MyInputsWrapper from "../components/common/UI/MyInputsWrapper";
import MyDatePicker from "../components/Form/Input/MyDatePicker";
import Heading from "../components/common/Heading/Heading";
import dayjs from "dayjs";
import {
  projectSchema,
  initialProjectValues,
} from "../validations/projectSchema";
import { useNavigate, useParams } from "react-router-dom";
import { East, MoreVert } from "@mui/icons-material";
import actUpdateProject from "../store/project/act/actUpdateProject";
import actGetProjectById from "../store/project/act/actGetProjectById";
import actDeleteProject from "../store/project/act/actDeleteProject";
import MyBtn from "../components/common/UI/MyBtn";
import { actCreateRisk, actUpdateRisk } from "../store/risk/riskSlice";
import {
  actCreateHandicap,
  actUpdateHandicap,
} from "../store/handicap/handicapSlice";
import { risksandDisablesOptions } from "../utils/riskHandicapStatus";
import actDeleteRisk from "../store/risk/act/actDeleteRisk";
import actDeleteHandicap from "../store/handicap/act/actDeleteHandicap";
import { projectStateOptions } from "../utils/statusList";
import { convertDateToIso } from "../utils/convertDateToIso";

const myWidth = 250;

const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { supervisors } = useSelector((state) => state.supervisor);
  const { branches } = useSelector((state) => state.branch);
  const { project, loading } = useSelector((state) => state.project);
  const [myProject, setMyProject] = useState(initialProjectValues);
  const [anchorEl, setAnchorEl] = useState(null);
  console.log(project);
  const { risks: r, handicaps: h } = project && project;
  const riskObj = r?.length > 0 ? r[0] : null;
  const handicapObj = h?.length > 0 ? h[0] : null;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    const willDelete = await SweatAlert({
      title: `هل متاكد من حذف هذا المشروع ؟`,
      icon: "warning",
      dangerMode: true,
    });
    if (willDelete) {
      dispatch(actDeleteProject(id))
        .unwrap()
        .then((res) => {
          notifySuccess("تم حذف المشروع بنجاح");
          navigate(-2);
        })
        .catch((res) => {
          notifyFailed("حدث خطا ما..الرجاء المحاولة مره اخرى");
        });
    }
    handleClose();
  };

  useEffect(() => {
    if (id) {
      dispatch(actGetProjectById(id));
    } else {
      setMyProject(initialProjectValues);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && project) {
      setMyProject({
        ...project,
        startDate: dayjs(project.startDate).toISOString(),
        endDate: dayjs(project.endDate).toISOString(),
        showRisks: riskObj?.id ? "yes" : "no",
        riskStatus: riskObj?.status || "",
        riskDescription: riskObj?.description || "",
        showHandicaps: handicapObj?.id ? "yes" : "no",
        handicapStatus: handicapObj?.status || "",
        handicapDescription: handicapObj?.description || "",
      });
    }
  }, [id, project, handicapObj, riskObj]);

  const handleFormSubmit = (values) => {
    console.table(values);
    const projectData = {
      ...values,
      endDate: values.endDate,
      startDate: values.startDate,
      budget: values.budget,
      spentBudget: values.spentBudget,
      percentage: values.percentage,
    };
    if (id) {
      if (values.showHandicaps === "yes") {
        if (handicapObj?.id) {
          dispatch(
            actUpdateHandicap({
              id: handicapObj.id,
              projectId: id,
              status: values.handicapStatus,
              description: values.handicapDescription,
            })
          );
        } else {
          dispatch(
            actCreateHandicap({
              projectId: id,
              status: values.handicapStatus,
              description: values.handicapDescription,
            })
          );
        }
      }
      if (values.showHandicaps === "no") {
        if (handicapObj?.id) {
          dispatch(actDeleteHandicap(handicapObj.id));
        }
      }
      if (values.showRisks === "no") {
        if (riskObj?.id) {
          dispatch(actDeleteRisk(riskObj.id));
        } else {
        }
      }

      if (values.showRisks === "yes") {
        if (riskObj?.id) {
          dispatch(
            actUpdateRisk({
              id: riskObj.id,
              projectId: id,
              status: values.riskStatus,
              description: values.riskDescription,
            })
          );
        } else {
          dispatch(
            actCreateRisk({
              projectId: id,
              status: values.riskStatus,
              description: values.riskDescription,
            })
          );
        }
      }
      dispatch(actUpdateProject(projectData))
        .unwrap()
        .then((res) => {
          if (res.id) {
            notifySuccess("تم تعديل المشروع بنجاح");
            navigate(-1);
          }
        })
        .catch((err) => {
          console.log(err);
          notifyFailed(err + " خطا ما..الرجاء المحاولة مره اخرى");
        });
    } else {
      dispatch(actCreateProject(projectData))
        .unwrap()
        .then((res) => {
          if (res.id) {
            if (values.riskStatus && values.handicapStatus) {
              const riskObj = {
                description: values.riskDescription,
                status: values.riskStatus,
              };
              const handicapObj = {
                description: values.handicapDescription,
                status: values.handicapStatus,
              };
              Promise.all([
                dispatch(actCreateRisk({ projectId: res.id, ...riskObj })),
                dispatch(
                  actCreateHandicap({ projectId: res.id, ...handicapObj })
                ),
              ])
                .then(() => {
                  // All actions dispatched successfully
                  notifySuccess("تم إنشاء المشروع بنجاح");
                  navigate("/projectsbox");
                })
                .catch(() => {
                  // Error occurred while dispatching actions
                  notifyFailed("حدث خطا ما..الرجاء المحاولة مره اخرى");
                });
            } else if (values.riskStatus) {
              const riskObj = {
                description: values.riskDescription,
                status: values.riskStatus,
              };
              dispatch(actCreateRisk({ projectId: res.id, ...riskObj }))
                .unwrap()
                .then(() => {
                  notifySuccess("تم إنشاء المشروع بنجاح");
                  navigate("/projectsbox");
                })
                .catch(() => {
                  notifyFailed("حدث خطا ما..الرجاء المحاولة مره اخرى");
                });
            } else if (values.handicapStatus) {
              const handicapObj = {
                description: values.handicapDescription,
                status: values.handicapStatus,
              };
              dispatch(actCreateHandicap({ projectId: res.id, ...handicapObj }))
                .unwrap()
                .then(() => {
                  notifySuccess("تم إنشاء المشروع بنجاح");
                  navigate("/projectsbox");
                })
                .catch(() => {
                  notifyFailed("حدث خطا ما..الرجاء المحاولة مره اخرى");
                });
            } else {
              // No status for risk and disables
              notifySuccess("تم إنشاء المشروع بنجاح");
              navigate("/projectsbox");
            }
          }
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
              mt="60px"
              height="calc(100vh - 117px)"
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
                        // handleBtnClick={() => handleFormSubmit(values)}
                      />
                      <Box>
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={anchorEl ? "long-menu" : undefined}
                          aria-expanded={anchorEl ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          <MoreVert />
                        </IconButton>
                        <Menu
                          id="demo-positioned-menu"
                          aria-labelledby="demo-positioned-button"
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
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
                          <MenuItem onClick={handleDelete}>حذف</MenuItem>
                        </Menu>
                      </Box>
                    </Stack>
                  )}
                </Stack>
              </Stack>

              <Box
                p={3}
                border="2px solid #000"
                borderRadius={2}
                flexGrow={1}
                sx={{ overflowY: "auto" }}
              >
                {/* row 1 */}

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <MyInputsWrapper
                      direction="column"
                      title="اسم و وصف المشروع"
                    >
                      <MyInput
                        // width={myWidth}
                        fullWidth
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
                        rows={2.8}
                        placeholder="ادخل الوصف"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.description && !!errors.description}
                        helperText={touched.description && errors.description}
                      />
                    </MyInputsWrapper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <MyInputsWrapper title="الخطة الزمنية للمشروع">
                      {/* <MyDatePicker
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
                      /> */}
                      <DatePicker
                        label="بداية المشروع"
                        // slotProps={{ textField: { size: "small" } }}
                        name="startDate"
                        value={dayjs(values.startDate)}
                        format="DD-MM-YYYY"
                        onChange={(value) => {
                          setFieldValue("startDate", value.toISOString());
                        }}
                        slotProps={{
                          textField: {
                            size: "small",
                            error:
                              values?.touched?.startDate &&
                              Boolean(values.errors.startDate),
                            helperText:
                              values?.touched?.startDate &&
                              values?.errors?.startDate,
                            "& .muiformhelpertext-root": {
                              color: "red",
                              fontSize: "10px !important",
                              margin: "3px 0px 0px !important",
                              // backgroundColor:'#F5F5F5 !important'
                            },
                          },
                        }}
                      />

                      <DatePicker
                        label="نهاية المشروع"
                        // slotProps={{ textField: { size: "small" } }}
                        name="endDate"
                        value={dayjs(values.endDate)}
                        format="DD-MM-YYYY"
                        onChange={(value) => {
                          setFieldValue("endDate", value.toISOString());
                        }}
                        slotProps={{
                          textField: {
                            size: "small",
                            error:
                              values?.touched?.endDate &&
                              Boolean(values.errors.endDate),
                            helperText:
                              values?.touched?.endDate &&
                              values?.errors?.endDate,
                            "& .muiformhelpertext-root": {
                              color: "red",
                              fontSize: "10px !important",
                              margin: "3px 0px 0px !important",
                              // backgroundColor:'#F5F5F5 !important'
                            },
                          },
                        }}
                      />
                      {/* // renderInput={(params) => (
                        //   <TextField
                        //     {...params}
                        //     error={
                        //       values.touched.startDate &&
                        //       Boolean(values.errors.startDate)
                        //     }
                        //     helperText={
                        //       values.touched.startDate &&
                        //       values.errors.startDate
                        //     }
                        //   />
                        // )} */}
                      {/* <DatePicker
                        label="نهاية المشروع"
                        slotProps={{ textField: { size: "small" } }}
                        name="endDate"
                        value={dayjs(values.endDate)}
                        onChange={(value) =>
                          setFieldValue("endDate", value.toISOString())
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={
                              values.touched.endDate &&
                              Boolean(values.errors.endDate)
                            }
                            helperText={
                              values.touched.endDate && values.errors.endDate
                            }
                          />
                        )}
                        inputFormat="MM/dd/yyyy"
                      /> */}
                      {/* <MyDatePicker
                        name="endDate"
                        width={myWidth}
                        title="تاريخ النهاية"
                        value={dayjs(values.endDate)}
                        onChangeDate={(value) => {
                          setFieldValue("endDate", value.toISOString());
                        }}
                        error={!!touched.endDate && !!errors.endDate}
                        helperText={touched.endDate && errors.endDate}
                      /> */}
                    </MyInputsWrapper>
                  </Grid>

                  <Grid item xs={12}>
                    <MyInputsWrapper
                      direction="column"
                      title="المخاطر و المعوقات"
                    >
                      {/* riskObj */}
                      <Stack width="100%" gap={2}>
                        <Box>
                          <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
                            <Typography variant="body1" color="initial" mt={1}>
                              هل له مخاطر ؟
                            </Typography>
                            <FormControl>
                              <RadioGroup
                                row
                                aria-labelledby="form-control-label-placement"
                                name="showRisks"
                                value={values.showRisks}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
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
                            {values.showRisks === "yes" && (
                              <Box ml={2}>
                                <MyInput
                                  width={180}
                                  name="riskStatus"
                                  select
                                  label="الحالة"
                                  placeholder="اختر الحالة"
                                  value={values.riskStatus}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={
                                    !!touched.riskStatus && !!errors.riskStatus
                                  }
                                  helperText={
                                    touched.riskStatus && errors.riskStatus
                                  }
                                >
                                  {risksandDisablesOptions.map((el) => (
                                    <MenuItem key={el.id} value={el.id}>
                                      {el.name}
                                    </MenuItem>
                                  ))}
                                </MyInput>
                              </Box>
                            )}
                          </Stack>
                          {values.showRisks === "yes" && (
                            <>
                              <MyInput
                                name="riskDescription"
                                label="المخاطر"
                                multiline={true}
                                fullWidth={true}
                                rows={3}
                                placeholder="ادخل المخاطر"
                                value={values.riskDescription}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                  !!touched.riskDescription &&
                                  !!errors.riskDescription
                                }
                                helperText={
                                  touched.riskDescription &&
                                  errors.riskDescription
                                }
                              />
                            </>
                          )}
                        </Box>
                      </Stack>
                      {/* disables */}
                      <Stack width="100%" gap={2}>
                        <Box>
                          <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
                            <Typography variant="body1" color="initial" mt={1}>
                              هل له معوقات ؟
                            </Typography>
                            <FormControl>
                              <RadioGroup
                                row
                                aria-labelledby="demo-form-control-label-placement"
                                name="showHandicaps"
                                value={values.showHandicaps}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
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
                            {values.showHandicaps === "yes" && (
                              <Box ml={2}>
                                <MyInput
                                  width={180}
                                  name="handicapStatus"
                                  select
                                  label="الحالة"
                                  placeholder="اختر الحالة"
                                  value={values.handicapStatus}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={
                                    !!touched.handicapStatus &&
                                    !!errors.handicapStatus
                                  }
                                  helperText={
                                    touched.handicapStatus &&
                                    errors.handicapStatus
                                  }
                                >
                                  {risksandDisablesOptions.map((el) => (
                                    <MenuItem key={el.id} value={el.id}>
                                      {el.name}
                                    </MenuItem>
                                  ))}
                                </MyInput>
                              </Box>
                            )}
                          </Stack>
                          {values.showHandicaps === "yes" && (
                            <>
                              <MyInput
                                name="handicapDescription"
                                label="المعوقات"
                                multiline={true}
                                fullWidth={true}
                                rows={3}
                                placeholder="ادخل المعوقات"
                                value={values.handicapDescription}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                  !!touched.handicapDescription &&
                                  !!errors.handicapDescription
                                }
                                helperText={
                                  touched.handicapDescription &&
                                  errors.handicapDescription
                                }
                              />
                            </>
                          )}
                        </Box>
                      </Stack>
                    </MyInputsWrapper>
                  </Grid>
                </Grid>

                {!id && (
                  <Box
                    // minHeight="100%"
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
