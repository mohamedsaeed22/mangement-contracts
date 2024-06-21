import StartTimeImage from "./../../assets/imgs/startTime.svg";
import PlanningImage from "./../../assets/imgs/planning.svg";
import WorkingImage from "./../../assets/imgs/working.svg";
import ClosingImage from "./../../assets/imgs/closing.svg";

import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const CenterStat = ({ stats }) => {
  const navigate = useNavigate();
  const {
    totalCompletedProjects,
    totalInProgressProjects,
    totalOnHoldProjects,
    totalNotStartedProjects,
  } = stats;
  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={12} sm={6} lg={3}>
        <NavLink to={"/projectsbox?projectstatus=1"}>
          <Paper
            sx={{
              padding: "8px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              border: "1px solid #ddd",
            }}
            elevation={0}
          >
            <Box
              sx={{
                backgroundColor: "#ccc",
                borderRadius: "50%",
                padding: "10px",
              }}
            >
              <img
                src={StartTimeImage}
                alt="overview"
                style={{ width: "80px" }}
              />
            </Box>
            <Stack textAlign="center" flex={1}>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="#01204E"
                textAlign="center"
              >
                {totalNotStartedProjects}
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                مرحلة البدء
              </Typography>
            </Stack>
          </Paper>
        </NavLink>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <NavLink to={"/projectsbox?projectstatus=2"}>
          <Paper
            sx={{
              padding: "8px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              border: "1px solid #ddd",
            }}
            elevation={0}
          >
            <Box
              sx={{
                backgroundColor: "#ccc",
                borderRadius: "50%",
                padding: "10px",
              }}
            >
              <img
                src={PlanningImage}
                alt="overview"
                style={{ width: "80px" }}
              />
            </Box>
            <Stack textAlign="center" flex={1}>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="#01204E"
                textAlign="center"
              >
                {totalInProgressProjects}
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                مرحلة التخطيط
              </Typography>
            </Stack>
          </Paper>
        </NavLink>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <NavLink to={"/projectsbox?projectstatus=3"}>
          <Paper
            sx={{
              padding: "8px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              border: "1px solid #ddd",
            }}
            elevation={0}
          >
            <Box
              sx={{
                backgroundColor: "#ccc",
                borderRadius: "50%",
                padding: "10px",
              }}
            >
              <img
                src={WorkingImage}
                alt="overview"
                style={{ width: "80px" }}
              />
            </Box>
            <Stack textAlign="center" flex={1}>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="#01204E"
                textAlign="center"
              >
                {totalCompletedProjects}
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                مرحلة التنفيذ
              </Typography>
            </Stack>
          </Paper>
        </NavLink>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <NavLink to={"/projectsbox?projectstatus=4"}>
          <Paper
            sx={{
              padding: "8px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              border: "1px solid #ddd",
            }}
            elevation={0}
          >
            <Box
              sx={{
                backgroundColor: "#ccc",
                borderRadius: "50%",
                padding: "10px",
              }}
            >
              <img
                src={ClosingImage}
                alt="overview"
                style={{ width: "80px" }}
              />
            </Box>
            <Stack textAlign="center" flex={1}>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="#01204E"
                textAlign="center"
              >
                {totalOnHoldProjects}
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                مرحلة الاغلاق
              </Typography>
            </Stack>
          </Paper>
        </NavLink>
      </Grid>
    </Grid>
  );
};

export default CenterStat;
