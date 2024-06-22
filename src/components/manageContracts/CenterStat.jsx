import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

import StartTimeImage from "./../../assets/imgs/startTime.svg";
import PlanningImage from "./../../assets/imgs/planning.svg";
import WorkingImage from "./../../assets/imgs/working.svg";
import ClosingImage from "./../../assets/imgs/closing.svg";

const CenterStat = ({ stats, allowNav = false }) => {
  const {
    totalCompletedProjects,
    totalInProgressProjects,
    totalOnHoldProjects,
    totalNotStartedProjects,
  } = stats;

  // Function to render NavLink or a non-link based on allowNav
  const renderLink = (to, imageSrc, title, value, label) => {
    if (allowNav) {
      return (
        <NavLink to={to}>
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
              <img src={imageSrc} alt="overview" style={{ width: "80px" }} />
            </Box>
            <Stack textAlign="center" flex={1}>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="#01204E"
                textAlign="center"
              >
                {value}
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
                {label}
              </Typography>
            </Stack>
          </Paper>
        </NavLink>
      );
    } else {
      return (
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
            <img src={imageSrc} alt="overview" style={{ width: "80px" }} />
          </Box>
          <Stack textAlign="center" flex={1}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#01204E"
              textAlign="center"
            >
              {value}
            </Typography>
            <Typography variant="body1" color="initial">
              {label}
            </Typography>
          </Stack>
        </Paper>
      );
    }
  };

  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={12} sm={6} lg={3}>
        {renderLink(
          "/projectsbox?projectstatus=1",
          StartTimeImage,
          "مرحلة البدء",
          totalNotStartedProjects,
          "مرحلة البدء"
        )}
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        {renderLink(
          "/projectsbox?projectstatus=2",
          PlanningImage,
          "مرحلة التخطيط",
          totalInProgressProjects,
          "مرحلة التخطيط"
        )}
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        {renderLink(
          "/projectsbox?projectstatus=3",
          WorkingImage,
          "مرحلة التنفيذ",
          totalCompletedProjects,
          "مرحلة التنفيذ"
        )}
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        {renderLink(
          "/projectsbox?projectstatus=4",
          ClosingImage,
          "مرحلة الاغلاق",
          totalOnHoldProjects,
          "مرحلة الاغلاق"
        )}
      </Grid>
    </Grid>
  );
};

export default CenterStat;
