import React from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import DisableImage from "../../assets/imgs/disables.svg";
import RisksImage from "../../assets/imgs/downs.svg";

const BottomStat = ({
  totalHandicaps,
  totalActiveHandicaps,
  totalClosedHandicaps,
  totalOnHoldHandicaps,
  totalRisks,
  totalActiveRisks,
  totalClosedRisks,
  totalOnHoldRisks,
}) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: "8px" }}>
            <Stack direction="row" alignItems="center">
              <Box
                sx={{
                  backgroundColor: "#ccc",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              >
                <img
                  src={DisableImage}
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
                  {totalHandicaps}
                </Typography>
                <Typography variant="body1" color="initial">
                  المعوقات
                </Typography>
              </Stack>
            </Stack>
            <Grid container spacing={3} p={1}>
              <Grid item xs={12} sm={6} lg={4}>
                <Paper
                  elevation={0}
                  sx={{
                    padding: "8px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    border: "1px solid #ccc",
                  }}
                >
                  <Stack textAlign="center" flex={1} position="relative">
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="#01204E"
                      textAlign="center"
                    >
                      {totalActiveHandicaps}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      نشط
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Paper
                  elevation={0}
                  sx={{
                    padding: "8px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    border: "1px solid #ccc",
                  }}
                >
                  <Stack textAlign="center" flex={1}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="#01204E"
                      textAlign="center"
                    >
                      {totalOnHoldHandicaps}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      مؤجل
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Paper
                  elevation={0}
                  sx={{
                    padding: "8px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    border: "1px solid #ccc",
                  }}
                >
                  <Stack textAlign="center" flex={1}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="#01204E"
                      textAlign="center"
                    >
                      {totalClosedHandicaps}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      مغلق
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: "8px" }}>
            <Stack direction="row" alignItems="center">
              <Box
                sx={{
                  backgroundColor: "#ccc",
                  borderRadius: "50%",
                  padding: "10px",
                }}
              >
                <img
                  src={RisksImage}
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
                  {totalRisks}
                </Typography>
                <Typography variant="body1" color="initial">
                  المخاطر
                </Typography>
              </Stack>
            </Stack>
            <Grid container spacing={3} p={1}>
              <Grid item xs={12} sm={6} lg={4}>
                <Paper
                  elevation={0}
                  sx={{
                    padding: "8px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    border: "1px solid #ccc",
                  }}
                >
                  <Stack textAlign="center" flex={1}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="#01204E"
                      textAlign="center"
                    >
                      {totalActiveRisks}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      نشط
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Paper
                  elevation={0}
                  sx={{
                    padding: "8px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    border: "1px solid #ccc",
                  }}
                >
                  <Stack textAlign="center" flex={1}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="#01204E"
                      textAlign="center"
                    >
                      {totalOnHoldRisks}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      مؤجل
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Paper
                  elevation={0}
                  sx={{
                    padding: "8px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    border: "1px solid #ccc",
                  }}
                >
                  <Stack textAlign="center" flex={1}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="#01204E"
                      textAlign="center"
                    >
                      {totalClosedRisks}
                    </Typography>
                    <Typography variant="body1" color="initial">
                      مغلق
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default BottomStat;
