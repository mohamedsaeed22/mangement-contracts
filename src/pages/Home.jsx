import DisableImage from "../assets/imgs/disables.svg";
import DownsImage from "../assets/imgs/downs.svg";

import Heading from "../components/common/Heading/Heading";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import TopStat from "../components/manageContracts/TopStat";
import BottomStat from "../components/manageContracts/BottomStat";

const Home = () => {
  return (
    <Box>
      <Heading title="الصفحة الرئيسية" />

      <Box p={2}  borderRadius={2} mt={3}>
        {/* top paper */}
        <TopStat />

        {/* center paper */}
        <BottomStat/>

        {/* Bottom paper */}
        {/* <Grid container spacing={2}>
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
                    0
                  </Typography>
                  <Typography variant="body1" color="initial">
                    المعوقات
                  </Typography>
                </Stack>
              </Stack>

              <Grid container spacing={3} p={1}>
                <Grid item xs={12} sm={6} lg={4}>
                  <Paper
                    elevation={5}
                    sx={{
                      padding: "8px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Stack textAlign="center" flex={1}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="#01204E"
                        textAlign="center"
                      >
                        0
                      </Typography>
                      <Typography variant="body1" color="initial">
                        نشط
                      </Typography>
                    </Stack>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} lg={4}>
                  <Paper
                    elevation={5}
                    sx={{
                      padding: "8px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Stack textAlign="center" flex={1}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="#01204E"
                        textAlign="center"
                      >
                        0
                      </Typography>
                      <Typography variant="body1" color="initial">
                        مؤجل
                      </Typography>
                    </Stack>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} lg={4}>
                  <Paper
                    elevation={5}
                    sx={{
                      padding: "8px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Stack textAlign="center" flex={1}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="#01204E"
                        textAlign="center"
                      >
                        8
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
                    src={DownsImage}
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
                    المخاطر
                  </Typography>
                </Stack>
              </Stack>

              <Grid container spacing={3} p={1}>
                <Grid item xs={12} sm={6} lg={4}>
                  <Paper
                    elevation={5}
                    sx={{
                      padding: "8px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Stack textAlign="center" flex={1}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="#01204E"
                        textAlign="center"
                      >
                        0
                      </Typography>
                      <Typography variant="body1" color="initial">
                        نشط
                      </Typography>
                    </Stack>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} lg={4}>
                  <Paper
                    elevation={5}
                    sx={{
                      padding: "8px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Stack textAlign="center" flex={1}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="#01204E"
                        textAlign="center"
                      >
                        0
                      </Typography>
                      <Typography variant="body1" color="initial">
                        مؤجل
                      </Typography>
                    </Stack>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} lg={4}>
                  <Paper
                    elevation={5}
                    sx={{
                      padding: "8px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Stack textAlign="center" flex={1}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="#01204E"
                        textAlign="center"
                      >
                        8
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
        </Grid> */}
      </Box>
    </Box>
  );
};

export default Home;
