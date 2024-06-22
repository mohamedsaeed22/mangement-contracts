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
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { East } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import actGetProjectById from "../store/project/act/actGetProjectById";
import actGetRisksByProjectId from "../store/risk/act/actGetRisksByProjectId";
import { getRisksAndDisablesName } from "../utils/riskHandicapStatus";
import actGetHandicapsByProjectId from "../store/handicap/act/actGetHandicapsByProjectId";
import LoadingWrapper from "../components/feedback/Loading/LoadingWrapper";
import { getProjectStateName } from "../utils/statusList";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { project, loading, error } = useSelector((state) => state.project);
  const { id } = useParams();

  // const project = {
  //   id: "8e140339-4b5a-4cb2-bdbd-08dc8b721f91",
  //   name: "rrrtrttt",
  //   description:
  //     "ewrfhhhhh hhhh hhhhhh hhhhhhhh hhh hh hhhhh hhhhhhh hhhhhh hhhhhh hhhhh hhhhh hhhhhh hhhh hhhhhhhhhhhhh hhhhhhh hhhhhhhhh hhhhhhh hhhh heafd",
  //   startDate: "2024-06-13T07:37:10.277",
  //   endDate: "2024-06-15T07:37:10",
  //   budget: 344,
  //   spentBudget: 344,
  //   percentage: 44,
  //   status: 3,
  //   activityId: "eca97204-2df5-499a-27af-08dc89f514b0",
  //   createdAt: "2024-06-13T10:42:36.3315702",
  //   updatedAt: "0001-01-01T00:00:00",
  //   updatedBy: "00000000-0000-0000-0000-000000000000",
  //   createdBy: "10c7ee03-e84d-48c7-b736-a20e7bb5555c",
  //   sectorId: "192350dd-c6f2-4339-bced-341d52362502",
  //   risks: [],
  //   handicaps: [],
  //   consultants: [
  //     {
  //       id: "bbd5beb8-0374-467e-6e85-08dc8adb8b64",
  //       name: "مصطفى",
  //       description: "",
  //       phoneNumber: "",
  //       contactPersonPhone: "",
  //       contactPersonName: "",
  //       address: "",
  //       country: "",
  //       specialization: "",
  //       experience: "",
  //       qualification: "",
  //       createdAt: "2024-06-12T16:42:51.8132579",
  //       updatedAt: null,
  //       updatedBy: null,
  //       createdBy: "10c7ee03-e84d-48c7-b736-a20e7bb5555c",
  //       totalProjects: null,
  //     },
  //   ],
  // };
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
          <NavLink to={`/project/edit/${id}`}>
            <MyBtn icon={EditIcon} title="تعديل المشروع" />
          </NavLink>
        </Stack>
        <Box
          border="2px solid #000"
          borderRadius={2}
          mt="4px"
          sx={{ marginInline: { xs: "5px", sm: "10px", md: "20px" } }}
          // marginInline="20px"
          flex={1}
          // bgcolor="#ddd"
        >
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
                    تكلفه المشروع
                  </Typography>
                  {project.budget}
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
                    المنصرف الفعلى
                  </Typography>

                  {project.spentBudget}
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
                  {/* {project.description && project.description.length > 40
              ? project.description.substring(0, 40) + "..."
              : project.description} */}
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
