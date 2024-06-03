import OverviewImage from "./../../assets/imgs/overview.svg";

import { Box, Paper, Stack, Typography } from "@mui/material";

const TopStat = ({
  totalProjects,
  totalPercentage,
  totalBudget,
  totalSpent,
}) => {
  console.log(totalProjects);
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
        <Stack textAlign="center">
          <Typography variant="h4" fontWeight="bold" color="#01204E">
            {totalProjects}
          </Typography>
          <Typography variant="body1" color="initial">
            اجمالى عدد المشروعات
          </Typography>
        </Stack>
        <Stack textAlign="center">
          <Typography variant="h4" fontWeight="bold" color="#01204E">
            {totalPercentage} %
          </Typography>
          <Typography variant="body1" color="initial">
            نسبة التنفيذ الفعلى (%)
          </Typography>
        </Stack>
        <Stack textAlign="center">
          <Typography variant="h4" fontWeight="bold" color="#01204E">
            {totalSpent}
          </Typography>
          <Typography variant="body1" color="initial">
            التكلفة المخططة
          </Typography>
        </Stack>
        <Stack textAlign="center">
          <Typography variant="h4" fontWeight="bold" color="#01204E">
          {totalSpent}
          </Typography>
          <Typography variant="body1" color="initial">
            المنصرف الفعلى
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default TopStat;
