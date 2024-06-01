import StartTimeImage from "./../../assets/imgs/startTime.svg";
import PlanningImage from "./../../assets/imgs/planning.svg";
import WorkingImage from "./../../assets/imgs/working.svg";
import ClosingImage from "./../../assets/imgs/closing.svg";

import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

const BottomStat = () => {
  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={12} sm={6} lg={3}>
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
              0
            </Typography>
            <Typography variant="body1" color="initial">
              مرحلة البدء
            </Typography>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
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
            <img src={PlanningImage} alt="overview" style={{ width: "80px" }} />
          </Box>
          <Stack textAlign="center" flex={1}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#01204E"
              textAlign="center"
            >
              0
            </Typography>
            <Typography variant="body1" color="initial">
              مرحلة التخطيط
            </Typography>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
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
            <img src={WorkingImage} alt="overview" style={{ width: "80px" }} />
          </Box>
          <Stack textAlign="center" flex={1}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#01204E"
              textAlign="center"
            >
              8
            </Typography>
            <Typography variant="body1" color="initial">
              مرحلة التنفيذ
            </Typography>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
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
            <img src={ClosingImage} alt="overview" style={{ width: "80px" }} />
          </Box>
          <Stack textAlign="center" flex={1}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#01204E"
              textAlign="center"
            >
              20
            </Typography>
            <Typography variant="body1" color="initial">
              مرحلة الاغلاق
            </Typography>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BottomStat;