import { NavLink } from "react-router-dom";
import OverviewImage from "./../../assets/imgs/overview.svg";
import { Box, Paper, Stack, Typography } from "@mui/material";

const TopStat = ({ stats, allowNav = false }) => {
  const { totalProjects, totalPercentage, totalBudget, totalSpent } = stats;

  // Function to render NavLink or a non-link based on allowNav
  const renderLink = (to, children) => {
    if (allowNav) {
      return <NavLink to={to}>{children}</NavLink>;
    } else {
      return <div>{children}</div>;
    }
  };

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

        {/* Render NavLink or a non-link based on allowNav */}
        {renderLink(
          "/projectsbox",
          <Stack textAlign="center">
            <Typography variant="h4" fontWeight="bold" color="#01204E">
              {totalProjects}
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                "&:hover": {
                  textDecoration: allowNav && "underline",
                },
              }}
            >
              اجمالى عدد المشروعات
            </Typography>
          </Stack>
        )}

        {/* Repeat similar pattern for other NavLink instances */}
        {renderLink(
          "/projectsbox",
          <Stack textAlign="center">
            <Typography variant="h4" fontWeight="bold" color="#01204E">
              {totalPercentage} %
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                "&:hover": {
                  textDecoration: allowNav && "underline",
                },
              }}
            >
              نسبة التنفيذ الفعلى (%)
            </Typography>
          </Stack>
        )}

        {renderLink(
          "/projectsbox",
          <Stack textAlign="center">
            <Typography variant="h4" fontWeight="bold" color="#01204E">
              {totalBudget && totalBudget.toLocaleString()}
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                "&:hover": {
                  textDecoration: allowNav && "underline",
                },
              }}
            >
              التكلفة المخططة
            </Typography>
          </Stack>
        )}

        {renderLink(
          "/projectsbox",
          <Stack textAlign="center">
            <Typography variant="h4" fontWeight="bold" color="#01204E">
              {totalSpent && totalSpent.toLocaleString()}
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                "&:hover": {
                  textDecoration: allowNav && "underline",
                },
              }}
            >
              المنصرف الفعلى
            </Typography>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default TopStat;
