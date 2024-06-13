import { NavLink, useNavigate } from "react-router-dom";
import OverviewImage from "./../../assets/imgs/overview.svg";

import { Box, Paper, Stack, Typography } from "@mui/material";

const TopStat = ({ stats }) => {
  // const navigate = useNavigate();
  const { totalProjects, totalPercentage, totalBudget, totalSpent } = stats;
  return (
    <Paper
      sx={{
        padding: "8px",
        marginBottom: 2,
        border: "1px solid #ddd",
      }}
      elevation={0}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        // justifyContent="center"
        sx={{ justifyContent: { xs: "center", md: "space-between" } }}
        gap={4}
        flexWrap="wrap"
        marginRight="40px"
      >
        <Box
          sx={{
            backgroundColor: "#ccc",
            borderRadius: "50%",
            padding: "10px",
            marginRight: "0",
          }}
        >
          <img src={OverviewImage} alt="overview" style={{ width: "80px" }} />
        </Box>
        <NavLink to={"/projectsbox"}>
          <Stack textAlign="center">
            <Typography variant="h4" fontWeight="bold" color="#01204E">
              {totalProjects}
            </Typography>
            <Typography variant="body1" color="initial">
              اجمالى عدد المشروعات
            </Typography>
          </Stack>
        </NavLink>
        <NavLink to={"/projectsbox"}>
          <Stack textAlign="center">
            <Typography variant="h4" fontWeight="bold" color="#01204E">
              {totalPercentage} %
            </Typography>
            <Typography variant="body1" color="initial">
              نسبة التنفيذ الفعلى (%)
            </Typography>
          </Stack>
        </NavLink>
        <NavLink to={"/projectsbox"}>
          <Stack textAlign="center">
            <Typography variant="h4" fontWeight="bold" color="#01204E">
              {totalBudget && totalBudget.toLocaleString()}
            </Typography>
            <Typography variant="body1" color="initial">
              التكلفة المخططة
            </Typography>
          </Stack>
        </NavLink>
        <NavLink to={"/projectsbox"}>
          <Stack textAlign="center">
            <Typography variant="h4" fontWeight="bold" color="#01204E">
              {totalSpent && totalSpent.toLocaleString()}
            </Typography>
            <Typography variant="body1" color="initial">
              المنصرف الفعلى
            </Typography>
          </Stack>
        </NavLink>
      </Stack>
    </Paper>
  );
};

export default TopStat;
