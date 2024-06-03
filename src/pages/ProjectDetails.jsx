import React, { useEffect } from "react";
import Heading from "../components/common/Heading/Heading";
import MyLabel from "../components/common/UI/MyLabel";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
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
const ProjectDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { project, loading, error } = useSelector((state) => state.project);
  const { risks } = useSelector((state) => state.risk);
  const { handicaps } = useSelector((state) => state.handicap);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(actGetProjectById(id));
      dispatch(actGetRisksByProjectId(id));
      dispatch(actGetHandicapsByProjectId(id));
    }
  }, [dispatch, id]);

  return (
    <LoadingWrapper loading={loading} error={error}>
      <Heading title="تفاصيل مشروع" />
      <Stack
        direction="row"
        mt="60px"
        justifyContent="space-between"
        marginInline={3}
      >
        <Box>
          <Tooltip title="رجوع" placement="top" arrow>
            <IconButton onClick={() => navigate("/projectsbox")}>
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
        <Stack gap={4} m={2}>
          <Stack
            p={1}
            direction="row"
            justifyContent="space-between"
            gap={2}
            flexWrap="wrap"
          >
            <MyLabel label="اسم المشروع" value={project.name} />
            <MyLabel label=" تكلفة المشروع" value={project.budget} />
            <MyLabel label="المنصرف الفعلى" value={project.spentBudget} />
          </Stack>
          <Stack
            p={1}
            direction="row"
            justifyContent="space-between"
            gap={2}
            flexWrap="wrap"
          >
            <MyLabel label="حالة المشروع" value={project.status} />
            <MyLabel label=" النشاط" value={project.branchName} />
            <MyLabel label="المشرف" value={project.supervisorName} />
          </Stack>
          <Stack
            p={1}
            direction="row"
            justifyContent="space-between"
            gap={2}
            flexWrap="wrap"
          >
            <MyLabel label="ما تم انجازة" value={`%${project.percentage}`} />
            <MyLabel
              label="تاريخ البداية"
              value={project.startDate?.split("T")[0]}
            />
            <MyLabel
              label="تاريخ النهايه"
              value={project.endDate?.split("T")[0]}
            />
          </Stack>

          {risks?.description !== "string" && risks ? (
            <Stack
              p={1}
              direction="row"
              justifyContent="space-between"
              gap={2}
              flexWrap="wrap"
            >
              <MyLabel
                label="حالة المخاطر"
                value={`${getRisksAndDisablesName(risks?.status)}`}
              />
              <Box
                sx={{
                  backgroundColor: "#F5F5F5 !important",
                  border: "2px solid #000",
                  borderRadius: "6px",
                  padding: "15px 10px",
                  position: "relative",
                  maxWidth: 700,
                  // marginTop: 3,
                  width: 250,
                  alignSelf: "center",
                  // flex: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "13px",
                    position: "absolute",
                    top: "-12px",
                    backgroundColor: "#F5F5F5",
                    left: 20,
                    zIndex: 10,
                    paddingInline: "6px",
                  }}
                >
                  تفاصيل المخاطر
                </Typography>
                {risks?.description}
              </Box>
            </Stack>
          ) : (
            <Typography
              variant="body1"
              color="initial"
              fontSize={18}
              fontWeight={400}
            >
              لا يوجد مخاطر
            </Typography>
          )}

          {handicaps?.description !== "string" && handicaps ? (
            <Stack
              p={1}
              direction="row"
              justifyContent="space-between"
              gap={2}
              flexWrap="wrap"
            >
              <MyLabel
                label="حالة المعوقات"
                value={`${getRisksAndDisablesName(handicaps?.status)}`}
              />
              <Box
                sx={{
                  backgroundColor: "#F5F5F5 !important",
                  border: "2px solid #000",
                  borderRadius: "6px",
                  padding: "15px 10px",
                  position: "relative",
                  maxWidth: 700,
                  width: 250,
                  alignSelf: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "13px",
                    position: "absolute",
                    top: "-12px",
                    backgroundColor: "#F5F5F5",
                    left: 20,
                    zIndex: 10,
                    paddingInline: "6px",
                  }}
                >
                  تفاصيل المعوقات
                </Typography>
                {risks?.description}
              </Box>
            </Stack>
          ) : (
            <Typography
              variant="body1"
              color="initial"
              fontSize={18}
              fontWeight={400}
            >
              لا يوجد معوقات
            </Typography>
          )}

          <Box
            sx={{
              backgroundColor: "#F5F5F5 !important",
              border: "2px solid #000",
              borderRadius: "6px",
              padding: "15px 10px",
              position: "relative",
              maxWidth: 700,
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
                left: 20,
                zIndex: 10,
                paddingInline: "6px",
              }}
            >
              تفاصيل المشروع
            </Typography>
            {project.description}
          </Box>
        </Stack>
      </Box>
    </LoadingWrapper>
  );
};

export default ProjectDetails;
