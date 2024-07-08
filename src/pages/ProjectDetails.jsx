import React, { useEffect } from "react";
import Heading from "../components/common/Heading/Heading";
import MyLabel from "../components/common/UI/MyLabel";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import MyBtn from "../components/common/UI/MyBtn";
import EditIcon from "../assets/icon/edit-white.svg";
import PrinterIcon from "../assets/icon/printer-icon.svg";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import { CalendarMonth, East, AttachMoney } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import actGetProjectById from "../store/project/act/actGetProjectById";
import actGetRisksByProjectId from "../store/risk/act/actGetRisksByProjectId";
import { getRisksAndDisablesName } from "../utils/riskHandicapStatus";
import actGetHandicapsByProjectId from "../store/handicap/act/actGetHandicapsByProjectId";
import LoadingWrapper from "../components/feedback/Loading/LoadingWrapper";
import { getProjectStateName } from "../utils/statusList";
import BudgetChart from "../components/manageContracts/BudgetChart";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import MyShowInput from "./MyShowInput";
import BudgetChart2 from "./BudgetChart2";
const ProjectDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { project, loading, error } = useSelector((state) => state.project);
  const { id } = useParams();
  const { risks, handicaps, consultants, contractors } = project;
  useEffect(() => {
    if (id) {
      dispatch(actGetProjectById(id));
    }
  }, [dispatch, id]);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <LoadingWrapper loading={loading} error={error}>
        <Heading title="تفاصيل مشروع" />
        <Stack
          direction="row"
          mt="40px"
          justifyContent="space-between"
          marginInline={4}
          id="print-wrapper"
          sx={{
            "@media print": {
              display: "none !important",
            },
          }}
        >
          <Box>
            <Tooltip title="رجوع" placement="top" arrow>
              <IconButton onClick={() => navigate(-1)}>
                <East style={{ color: "black" }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            <MyBtn
              icon={PrinterIcon}
              title="طباعة"
              handleBtnClick={handlePrint}
            />
            <NavLink to={`/project/edit/${id}`}>
              <MyBtn icon={EditIcon} title="تعديل المشروع" />
            </NavLink>
          </Stack>
        </Stack>
        <Box
          className="print-override"
          border="2px solid #000"
          borderRadius={2}
          mt="4px"
          sx={{
            marginInline: { xs: "5px", sm: "10px", md: "20px" },
          }}
          height="calc(100vh - 150px)"
          overflow="auto"
          ref={componentRef}
        >
          <Box
            className="budget-chart-container"
            maxHeight="600px"
            maxWidth="1200px"
            marginInline="auto"
          >
            {/* <BudgetChart
              data={{
                spentBudgets: project.spentBudgets,
                assindBudgets: project.assindBudgets,
              }}
            />
        */}
            {!(
              project?.assindBudgets?.length === 0 &&
              project?.spentBudgets?.length === 0
            ) && (
              <BudgetChart2
                assindBudgets={project.assindBudgets}
                spentBudgets={project.spentBudgets}
              />
            )}
          </Box>
          <Stack m={4}>
            {/* top grid */}
            <Grid container spacing={4} mb={3} sx={{ direction: "ltr" }}>
              <Grid item xs={12} sm={4} height="100%">
                <Stack gap={2}>
                  <MyShowInput title={"اسم المشروع"} value={project.name} />
                  <MyShowInput title={"القطاع"} value={project.sectorName} />
                  <MyShowInput title={"النشاط"} value={project.activityName} />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={8}>
                <MyShowInput
                  title={"وصف المشروع"}
                  value={project?.description}
                />
              </Grid>
            </Grid>

            {/* center grid */}
            <Box
              sx={{
                border: "2px solid #475CA7",
                padding: "30px 16px",
                borderRadius: "6px",
                position: "relative",
                marginBottom: 3,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "13px",
                  position: "absolute",
                  top: "-12px",
                  backgroundColor: "#F5F5F5",
                  color: "#475CA7",
                  fontWeight: "700",
                  left: 10,
                  zIndex: 10,
                  paddingInline: "6px",
                  "@media print": {
                    backgroundColor: "#fff",
                  },
                }}
              >
                المصروفات
              </Typography>
              <Grid container spacing={4} sx={{ direction: "ltr" }}>
                <Grid item xs={12} md={6} lg={4} minHeight="100%">
                  <Stack
                    gap={2}
                    sx={{ width: { xs: "100%", sm: "98%" } }}
                    minHeight="100%"
                    justifyContent="space-between"
                  >
                    <MyShowInput
                      title={"اجمالى المخصصات"}
                      value={project.budget?.toLocaleString()}
                      myStyle={{ fontWeight: "bold" }}
                    />
                    <MyShowInput
                      title={"اجمالى المنصرف"}
                      value={project.spentBudget?.toLocaleString()}
                      myStyle={{ fontWeight: "bold", color: "#1ABC00" }}
                    />
                    <MyShowInput
                      title={"اجمالى المتبقى"}
                      value={project.remaining?.toLocaleString()}
                      myStyle={{ fontWeight: "bold", color: "#FD0000" }}
                    />
                    <MyShowInput
                      title={"نسبه الصرف"}
                      value={`${Math.floor(project.percentageSpent)}%`}
                      myStyle={{ fontWeight: "bold" }}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <MyShowInput title={"المخصصات الماليه"}>
                    <>
                      {project?.assindBudgets?.length > 0 ? (
                        <>
                          <Stack
                            direction="row"
                            justifyContent="space-around"
                            borderRadius={2}
                            mt={1}
                            p="4px"
                            sx={{
                              direction: "ltr",
                              backgroundColor: "#BECAF9",
                            }}
                          >
                            <Typography
                              variant="body2"
                              fontWeight="600"
                              color="initial"
                            >
                              تاريخ البروتوكول
                            </Typography>
                            <Typography
                              variant="body2"
                              fontWeight="600"
                              color="initial"
                            >
                              القيمه
                            </Typography>
                          </Stack>

                          {project.assindBudgets.map((budget, index) => (
                            <>
                              <Stack
                                mt={1}
                                direction="row"
                                justifyContent="space-around"
                                borderRadius={2}
                                bgcolor={index % 2 === 0 ? "" : "#ECECEC"}
                                p="4px"
                                sx={{ direction: "ltr" }}
                              >
                                <Typography variant="body2" color="initial">
                                  {budget.assindDate?.split("T")[0]}
                                </Typography>
                                <Typography variant="body2" color="initial">
                                  {budget?.budget?.toLocaleString()}
                                </Typography>
                              </Stack>
                            </>
                          ))}
                        </>
                      ) : (
                        <Typography variant="body1" sx={{ direction: "ltr" }}>
                          لا يوجد
                        </Typography>
                      )}
                    </>
                  </MyShowInput>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <MyShowInput title={"المنصرف الفعلى"}>
                    <>
                      {project?.spentBudgets?.length > 0 ? (
                        <>
                          <Stack
                            direction="row"
                            justifyContent="space-around"
                            borderRadius={2}
                            mt={1}
                            p="4px"
                            sx={{
                              direction: "ltr",
                              backgroundColor: "#BECAF9",
                            }}
                          >
                            <Typography
                              variant="body2"
                              fontWeight="600"
                              color="initial"
                            >
                              التاريخ
                            </Typography>
                            <Typography
                              variant="body2"
                              fontWeight="600"
                              color="initial"
                            >
                              القيمه
                            </Typography>
                          </Stack>

                          {project.spentBudgets.map((budget, index) => (
                            <>
                              <Stack
                                mt={1}
                                direction="row"
                                justifyContent="space-around"
                                borderRadius={2}
                                bgcolor={index % 2 === 0 ? "" : "#ECECEC"}
                                p="4px"
                                sx={{ direction: "ltr" }}
                              >
                                <Typography variant="body2" color="initial">
                                  {budget.spentDate?.split("T")[0]}
                                </Typography>
                                <Typography variant="body2" color="initial">
                                  {budget?.spent?.toLocaleString()}
                                </Typography>
                              </Stack>
                            </>
                          ))}
                        </>
                      ) : (
                        <Typography variant="body1" sx={{ direction: "ltr" }}>
                          لا يوجد
                        </Typography>
                      )}
                    </>
                  </MyShowInput>
                </Grid>
              </Grid>
            </Box>

            {/* bottom grid */}

            <Grid
              container
              spacing={4}
              sx={{ direction: "ltr" }}
              className="test"
            >
              <Grid item xs={12} md={6} lg={4} minHeight="100%">
                <Stack
                  justifyContent="space-between"
                  sx={{
                    border: "2px solid #475CA7",
                    padding: "30px 16px",
                    borderRadius: "6px",
                    position: "relative",
                    marginBottom: 3,
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      color: "#475CA7",
                      fontWeight: "700",
                      left: 10,
                      zIndex: 10,
                      paddingInline: "6px",
                      "@media print": {
                        backgroundColor: "#fff",
                      },
                    }}
                  >
                    المده الزمنيه
                  </Typography>
                  <MyShowInput
                    title={"تاريخ البدايه"}
                    value={project.startDate?.split("T")[0]}
                    fullheight={false}
                  />
                  <MyShowInput
                    title={"تاريخ النهايه"}
                    value={project.endDate?.split("T")[0]}
                    fullheight={false}
                  />
                  <MyShowInput
                    title={"عدد الشهور"}
                    value={
                      project.totalMonths === 0
                        ? "اقل من شهر"
                        : `${project.totalMonths} شهر`
                    }
                    fullheight={false}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                {/* <Box
                  sx={{
                    border: "2px solid #475CA7",
                    padding: "30px 16px",
                    borderRadius: "6px",
                    position: "relative",
                    marginBottom: 3,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      color: "#475CA7",
                      fontWeight: "700",
                      left: 10,
                      zIndex: 10,
                      paddingInline: "6px",
                      "@media print": {
                        backgroundColor: "#fff",
                      },
                    }}
                  >
                    موكل
                  </Typography>
                </Box> */}
                <Stack gap={2}>
                  <MyShowInput
                    title={"الاستشارى"}
                    value={
                      consultants?.length > 0 ? consultants[0].name : "لا يوجد"
                    }
                  />
                  <MyShowInput
                    title={"المقاول"}
                    value={
                      contractors?.length > 0 ? contractors[0].name : "لا يوجد"
                    }
                  />
                </Stack>
                <Box
                  sx={{
                    marginTop: 2,
                    border: "2px solid #475CA7",
                    padding: "30px 16px",
                    borderRadius: "6px",
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      color: "#475CA7",
                      fontWeight: "700",
                      left: 10,
                      zIndex: 10,
                      paddingInline: "6px",
                      "@media print": {
                        backgroundColor: "#fff",
                      },
                    }}
                  >
                    الحاله
                  </Typography>
                  <Stack gap={2}>
                    <MyShowInput
                      title={"حاله المشروع"}
                      value={getProjectStateName(project.status)}
                    />
                    <MyShowInput
                      title={"ما تم انجازه"}
                      value={`${project.percentage}%`}
                    />
                  </Stack>
                </Box>
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <Stack gap={2} height="100%">
                  <Box minHeight="47%">
                    <MyShowInput
                      title={"المخاطر"}
                      value={
                        risks && risks.length > 0
                          ? risks[0]?.description
                          : "لا يوجد مخاطر"
                      }
                    />
                  </Box>
                  <MyShowInput
                    title={"المعوقات"}
                    value={
                      handicaps && handicaps.length > 0
                        ? handicaps[0].description
                        : "لا يوجد معوقات"
                    }
                  />
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </LoadingWrapper>
    </>
  );
};

export default ProjectDetails;
