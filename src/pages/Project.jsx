import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
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
import actGetConsultants from "../store/consultant/act/actGetConsultants";
import {
  actCreateContractor,
  actGetContractors,
} from "../store/contractor/contractorSlice";
import actCreateProjectContractor from "../store/projectContractor/act/actCreateProjectContractor";
import {
  actCreateProjectConsultant,
  actDeleteProjectConsultant,
} from "../store/projectConsultant/projectConsultantSlice";
import actDeleteProjectContractor from "../store/projectContractor/act/actDeleteProjectContractor";
import MySelectChip from "../components/Form/Input/MySelectChip";

const myWidth = 250;

const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sectors } = useSelector((state) => state.sector);
  const { activities } = useSelector((state) => state.activity);
  const { contractors } = useSelector((state) => state.contractor);
  const { consultants } = useSelector((state) => state.consultant);
  const { project, loading } = useSelector((state) => state.project);
  const [consultantsIds, setConsultantsIds] = useState(
    project?.consultants || []
  );
  const [contractorsIds, setContractorsIds] = useState(
    project?.contractors || []
  );

  const [myProject, setMyProject] = useState(initialProjectValues);
  const [anchorEl, setAnchorEl] = useState(null);
  console.log(project.consultants);
  console.log(project.contractors);
  console.log(project);
  console.log(consultantsIds);
  console.log(contractorsIds);

  const {
    risks: r,
    handicaps: h,
    contractors: ctr,
    consultants: con,
  } = project && project;
  const riskObj = r?.length > 0 ? r[0] : null;
  const handicapObj = h?.length > 0 ? h[0] : null;
  const contractorObj = ctr?.length > 0 ? ctr[0] : null;
  const consultantObj = con?.length > 0 ? con[0] : null;

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
        .catch((err) => {
          notifyFailed(err + "حدث خطا ما..الرجاء المحاولة مره اخرى");
        });
    }
    handleClose();
  };

  useEffect(() => {
    dispatch(actGetConsultants());
    dispatch(actGetContractors());
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
        contractorId: contractorObj?.id || "",
        consultantId: consultantObj?.id || "",
      });
      setConsultantsIds(project?.consultants);
      setContractorsIds(project?.contractors);
    }
  }, [id, project, handicapObj, riskObj, contractorObj, consultantObj]);

  const handleFormSubmit = (values) => {
    console.table(values);
    const projectData = {
      ...values,
      startDate: values.startDate,
      endDate: values.endDate,
      budget: values.budget,
      spentBudget: values.spentBudget,
      percentage: values.percentage,
    };
    if (values.contractorId !== myProject.contractorId) {
      // delete and add
      if (myProject.contractorId) {
        dispatch(
          actDeleteProjectContractor({
            projectId: id,
            contractorId: myProject.contractorId,
          })
        );
      }
      dispatch(
        actCreateProjectContractor({
          contractorIds: [values.contractorId],
          projectId: id,
        })
      );
      console.log(values.contractorId, id);
    }
    if (values.consultantId !== myProject.consultantId) {
      // delete and add
      if (myProject.consultantId) {
        dispatch(
          actDeleteProjectConsultant({
            projectId: id,
            consultantId: myProject.consultantId,
          })
        );
      }
      dispatch(
        actCreateProjectConsultant({
          consultantIds: [values.consultantId],
          projectId: id,
        })
      );
      console.log(values.consultantId, id);
    }
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
                .catch((err) => {
                  // Error occurred while dispatching actions
                  notifyFailed(err + "حدث خطا ما..الرجاء المحاولة مره اخرى");
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
                .catch((err) => {
                  notifyFailed(err + "حدث خطا ما..الرجاء المحاولة مره اخرى");
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
                .catch((err) => {
                  notifyFailed(err + "حدث خطا ما..الرجاء المحاولة مره اخرى");
                });
            } else {
              // No status for risk and disables
              notifySuccess("تم إنشاء المشروع بنجاح");
              navigate("/projectsbox");
            }
            dispatch(
              actCreateProjectContractor({
                contractorId: values.contractorId,
                projectId: res.id,
              })
            );
            dispatch(
              actCreateProjectConsultant({
                consultantId: values.consultantId,
                projectId: res.id,
              })
            );
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
                    name="activityId"
                    select
                    label="النشاط"
                    placeholder="اختر النشاط"
                    value={values.activityId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.activityId && !!errors.activityId}
                    helperText={touched.activityId && errors.activityId}
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
                    name="sectorId"
                    select
                    label="القطاع"
                    placeholder="اختر القطاع"
                    value={values.sectorId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.sectorId && !!errors.sectorId}
                    helperText={touched.sectorId && errors.sectorId}
                  >
                    {sectors.length > 0 ? (
                      sectors.map((supervisor) => (
                        <MenuItem key={supervisor.id} value={supervisor.id}>
                          {supervisor.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>لا يوجد قطاعات</MenuItem>
                    )}
                  </MyInput>

                  {id && (
                    <Stack direction="row" alignSelf="flex-start">
                      <MyBtn title="تعديل" type="submit" />
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
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <MyInputsWrapper title="المقاولين والاستشارين">
                      <Box sx={{ minWidth: 180 }}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">
                            المقاولين
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="contractorId"
                            value={values.contractorId}
                            label="المقاولين"
                            onChange={handleChange}
                          >
                            {contractors.length > 0 ? (
                              contractors.map((el) => (
                                <MenuItem key={el.id} value={el.id}>
                                  {el.name}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem disabled>لا يوجد مقاولين</MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box sx={{ minWidth: 180 }}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">
                            الاستشاريين
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="consultantId"
                            value={values.consultantId}
                            onChange={handleChange}
                            label="الاستشاريين"
                          >
                            {consultants.length > 0 ? (
                              consultants.map((el) => (
                                <MenuItem key={el.id} value={el.id}>
                                  {el.name}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem disabled>لا يوجد مقاولين</MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      </Box>
                      {/* <MyInput
                        width={180}
                        name="contractorId"
                        select
                        label="المقاول"
                        placeholder="اختر المقاول"
                        value={values.contractorId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.contractorId && !!errors.contractorId}
                        helperText={touched.contractorId && errors.contractorId}
                      >
                        {contractors.length > 0 ? (
                          contractors.map((el) => (
                            <MenuItem key={el.id} value={el.id}>
                              {el.name}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>لا يوجد مقاولين</MenuItem>
                        )}
                      </MyInput> */}

                      {/* <MyInput
                        width={180}
                        name="consultantId"
                        select
                        label="الاستشارى"
                        placeholder="اختر الاستشارى"
                        value={values.consultantId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!touched.consultantId && !!errors.consultantId}
                        helperText={touched.consultantId && errors.consultantId}
                      >
                        {consultants.length > 0 ? (
                          consultants.map((el) => (
                            <MenuItem key={el.id} value={el.id}>
                              {el.name}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>لا يوجد استشاريين</MenuItem>
                        )}
                      </MyInput> */}
                      {/* <MySelectChip
                        data={contractors}
                        labelName="اختر المقاول"
                        setArrIds={setContractorsIds}
                        seletedIds={contractorsIds}
                      />
                      <MySelectChip
                        data={consultants}
                        labelName="اختر الاستشارى"
                        setArrIds={setConsultantsIds}
                        seletedIds={consultantsIds}
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
