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

const ProjectDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { project, loading, error } = useSelector((state) => state.project);
  console.log(project);
  const { id } = useParams();
  const { risks, handicaps, consultants, contractors } = project;
  useEffect(() => {
    if (id) {
      dispatch(actGetProjectById(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <LoadingWrapper loading={loading} error={error}>
        <Heading title="تفاصيل مشروع" />
        <Stack
          direction="row"
          mt="40px"
          justifyContent="space-between"
          marginInline={4}
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
              handleBtnClick={() => window.print()}
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
          sx={{ marginInline: { xs: "5px", sm: "10px", md: "20px" } }}
          // height="calc(100vh - 150px)"
          overflow="auto"
        >
          <Box maxHeight="600px" maxWidth="1200px" marginInline="auto">
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
                  {project.name}
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
                    المخصصات
                  </Typography>
                  {project?.assindBudgets?.length > 0
                    ? project.assindBudgets.map((budget, index) => (
                        <Stack
                          direction="row"
                          key={budget.id}
                          justifyContent="space-evenly"
                          alignItems="center"
                          sx={{
                            width: "100%", // Ensures the Stack takes full width of its container
                            padding: "4px 0px", // Adds padding for visual spacing
                          }}
                        >
                          <CalendarMonth
                            sx={{
                              color: "#333",
                              flex: "1",
                              textAlign: "center",
                            }}
                          />
                          <Typography
                            variant="body1"
                            color="initial"
                            sx={{ flex: "2", textAlign: "center" }} // Ensures equal space distribution
                          >
                            {budget.assindDate?.split("T")[0]}
                          </Typography>

                          <AttachMoney
                            sx={{
                              color: "#333",
                              flex: "1",
                              textAlign: "center",
                            }}
                          />

                          <Typography
                            variant="body1"
                            color="initial"
                            sx={{ flex: "2", textAlign: "center" }} // Ensures equal space distribution
                          >
                            {budget.budget.toLocaleString()}
                          </Typography>
                        </Stack>
                      ))
                    : "لا يوجد"}
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
                    المنصرف
                  </Typography>
                  {project?.spentBudgets?.length > 0
                    ? project.spentBudgets.map((budget) => (
                        <Stack
                          direction="row"
                          key={budget.id}
                          justifyContent="space-evenly"
                          alignItems="center"
                          sx={{
                            width: "100%", // Ensures the Stack takes full width of its container
                            padding: "4px 0px", // Adds padding for visual spacing
                          }}
                        >
                          <CalendarMonth
                            sx={{
                              color: "#333",
                              flex: "1",
                              textAlign: "center",
                            }}
                          />
                          <Typography
                            variant="body1"
                            color="initial"
                            sx={{ flex: "2", textAlign: "center" }} // Ensures equal space distribution
                          >
                            {budget.spentDate?.split("T")[0]}
                          </Typography>

                          <AttachMoney
                            sx={{
                              color: "#333",
                              flex: "1",
                              textAlign: "center",
                            }}
                          />

                          <Typography
                            variant="body1"
                            color="initial"
                            sx={{ flex: "2", textAlign: "center" }} // Ensures equal space distribution
                          >
                            {budget.spent.toLocaleString()}
                          </Typography>
                        </Stack>
                      ))
                    : "لا يوجد"}
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
                  {project.activityName}
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
                  {consultants?.length > 0 ? consultants[0].name : "لا يوجد"}
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
                  {contractors?.length > 0 ? contractors[0].name : "لا يوجد"}
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
                  {`%${project.percentage}`}
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

                  {project.startDate?.split("T")[0]}
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
                  {project.endDate?.split("T")[0]}
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
                  {project.sectorName}
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

                  {getProjectStateName(project.status)}
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

                  {risks && risks.length > 0
                    ? risks[0]?.description
                    : "لا يوجد مخاطر"}
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
                  {handicaps && handicaps.length > 0
                    ? handicaps[0].description
                    : "لا يوجد معوقات"}
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
                  {project?.description}
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
