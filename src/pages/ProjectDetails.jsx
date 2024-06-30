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
import EditIcon from "../assets/icon/edit-icon.svg";
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
              // handleBtnClick={() => {
              //   html2canvas(document.body, {
              //     scale: 2,
              //     width: document.documentElement.scrollWidth,
              //     height: document.documentElement.scrollHeight,
              //   }).then((canvas) => {
              //     const imgData = canvas.toDataURL("image/png");
              //     const printWindow = window.open("", "_blank");
              //     printWindow.document.write(`
              //        <style>
              //          body, html { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100%; }
              //          .print-override {
              //           height: auto !important;
              //           overflow: visible !important;
              //         }
              //          img { max-width: 100%; max-height: 100vh; margin: auto; display: block; }
              //        </style>
              //        <img src="${imgData}" onload="window.print();window.close()" />
              //      `);
              //     printWindow.document.close();
              //   });
              // }}
              handleBtnClick={handlePrint}
            />
            <NavLink to={`/project/edit/${id}`}>
              <MyBtn icon={EditIcon} title="تعديل المشروع" />
            </NavLink>
          </Stack>
        </Stack>
        <Box
          border="2px solid #000"
          borderRadius={2}
          mt="4px"
          className="print-override"
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
            <BudgetChart
              data={{
                spentBudgets: project.spentBudgets,
                assindBudgets: project.assindBudgets,
              }}
            />
          </Box>
          <Stack m={2}>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} lg={6}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    اسم المشروع
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ direction: "ltr" }}
                  >
                    {project.name}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} lg={3}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    المخصصات الماليه
                  </Typography>
                  {project?.assindBudgets?.length > 0 ? (
                    project.assindBudgets.map((budget, index) => (
                      <Stack
                        direction="row"
                        key={budget.id}
                        justifyContent="space-evenly"
                        alignItems="center"
                        sx={{
                          width: "100%",
                          padding: "4px 0px",
                          "@media print": {
                            direction: "ltr",
                          },
                        }}
                      >
                        <Typography
                          variant="body1"
                          color="initial"
                          fontWeight="600"
                        >
                          التاريخ:-
                        </Typography>
                        <Typography
                          variant="body1"
                          color="initial"
                          sx={{ flex: "2", textAlign: "center" }}
                        >
                          {budget.assindDate?.split("T")[0]}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="initial"
                          fontWeight="600"
                        >
                          القيمة:-
                        </Typography>
                        <Typography
                          variant="body1"
                          color="initial"
                          sx={{ flex: "2", textAlign: "center" }}
                        >
                          {budget?.budget?.toLocaleString()}
                        </Typography>
                      </Stack>
                    ))
                  ) : (
                    <Typography variant="body1" sx={{ direction: "ltr" }}>
                      لا يوجد
                    </Typography>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} lg={3}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    المنصرف الفعلى
                  </Typography>
                  {project?.spentBudgets?.length > 0 ? (
                    project.spentBudgets.map((budget) => (
                      <Stack
                        direction="row"
                        key={budget.id}
                        justifyContent="space-evenly"
                        alignItems="center"
                        sx={{
                          width: "100%",
                          padding: "4px 0px",
                          "@media print": {
                            direction: "ltr",
                          },
                        }}
                      >
                        <Typography
                          variant="body1"
                          color="initial"
                          fontWeight="600"
                        >
                          التاريخ:-
                        </Typography>
                        <Typography
                          variant="body1"
                          color="initial"
                          sx={{ flex: "2", textAlign: "center" }} // Ensures equal space distribution
                        >
                          {budget.spentDate?.split("T")[0]}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="initial"
                          fontWeight="600"
                        >
                          القيمة:-
                        </Typography>
                        <Typography
                          variant="body1"
                          color="initial"
                          sx={{ flex: "2", textAlign: "center" }} // Ensures equal space distribution
                        >
                          {budget?.spent?.toLocaleString()}
                        </Typography>
                      </Stack>
                    ))
                  ) : (
                    <Typography variant="body1" sx={{ direction: "ltr" }}>
                      لا يوجد
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={6} lg={3}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    النشاط
                  </Typography>
                  <Typography variant="body1" sx={{ direction: "ltr" }}>
                    {project.activityName}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    الاستشارى
                  </Typography>
                  <Typography variant="body1" sx={{ direction: "ltr" }}>
                    {consultants?.length > 0 ? consultants[0].name : "لا يوجد"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    المقاول
                  </Typography>
                  <Typography variant="body1" sx={{ direction: "ltr" }}>
                    {contractors?.length > 0 ? contractors[0].name : "لا يوجد"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    ما تم انجازه
                  </Typography>
                  <Typography variant="body1" sx={{ direction: "ltr" }}>
                    {`%${project.percentage}`}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={6} lg={3}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    عدد الشهور
                  </Typography>
                  <Typography variant="body1" sx={{ direction: "ltr" }}>
                    {project.totalMonths === 0
                      ? "اقل من شهر"
                      : `${project.totalMonths} شهر`}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    نسبه الصرف
                  </Typography>
                  <Typography variant="body1" sx={{ direction: "ltr" }}>
                    {Math.floor(project.percentageSpent)}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    اجمالى المخصصات
                  </Typography>
                  <Typography variant="body1" sx={{ direction: "ltr" }}>
                    {project.budget?.toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    اجمالى المنصرف
                  </Typography>
                  <Typography variant="body1" sx={{ direction: "ltr" }}>
                    {project.spentBudget?.toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={6} lg={3}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    تاريخ البدايه
                  </Typography>
                  <Typography variant="body1" sx={{ direction: "ltr" }}>
                    {project.startDate?.split("T")[0]}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} lg={3}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    تاريخ النهايه
                  </Typography>
                  <Typography variant="body1" sx={{ direction: "ltr" }}>
                    {project.endDate?.split("T")[0]}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} lg={3}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    القطاع
                  </Typography>
                  <Typography variant="body1" sx={{ direction: "ltr" }}>
                    {project.sectorName}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    حاله المشروع
                  </Typography>
                  <Typography variant="body1" sx={{ direction: "ltr" }}>
                    {getProjectStateName(project.status)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    المخاطر
                  </Typography>
                  <Typography variant="body1" sx={{ direction: "ltr" }}>
                    {risks && risks.length > 0
                      ? risks[0]?.description
                      : "لا يوجد مخاطر"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    المعوقات
                  </Typography>
                  <Typography variant="body1" sx={{ direction: "ltr" }}>
                    {handicaps && handicaps.length > 0
                      ? handicaps[0].description
                      : "لا يوجد معوقات"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} mb={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    backgroundColor: "#F5F5F5 !important",
                    border: "1px solid #000",
                    borderRadius: "6px",
                    padding: "15px 10px",
                    position: "relative",
                    marginTop: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "13px",
                      position: "absolute",
                      top: "-12px",
                      backgroundColor: "#F5F5F5",
                      left: 15,
                      zIndex: 10,
                      paddingInline: "6px",
                    }}
                  >
                    تفاصيل المشروع
                  </Typography>
                  <Typography variant="body1" sx={{ direction: "ltr" }}>
                    {project?.description}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </LoadingWrapper>
    </>
  );
};

export default ProjectDetails;
/**
 *
 * {
      "id": "dbcb1cc5-083c-4c5e-07f8-08dc9288fdfa",
      "name": "مشروع 400 الف فدان ",
      "description": "مشروع زراعة 400 الف فدان",
      "startDate": "2024-07-07T21:00:00",
      "endDate": "2028-06-28T21:00:00",
      "percentage": 5,
      "budget": 450,
      "spentBudget": 5,
      "status": 2,
      "activityId": "5af4e278-0079-4279-82a8-08dc8853219e",
      "createdAt": "2024-06-22T11:32:33.1304906",
      "updatedAt": "0001-01-01T00:00:00",
      "updatedBy": "00000000-0000-0000-0000-000000000000",
      "createdBy": "10c7ee03-e84d-48c7-b736-a20e7bb5555c",
      "sectorId": "e338d130-0b41-46bc-1d33-08dc8ae456d6",
      "risks": [],
      "handicaps": [],
      "consultants": null,
      "contractors": null,
      "spentBudgets": [
        {
          "id": "db34e5b1-5ff2-4f05-ef64-08dc94e0346b",
          "spentDate": "2024-08-14T21:00:00",
          "spent": 32521442,
          "projectId": "dbcb1cc5-083c-4c5e-07f8-08dc9288fdfa",
          "createdAt": "0001-01-01T00:00:00",
          "updatedAt": null,
          "updatedBy": null,
          "createdBy": null
        }
      ],
      "assindBudgets": []
    },
 *
 */
