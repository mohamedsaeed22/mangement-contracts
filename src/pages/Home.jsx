import OverviewImage from "../assets/imgs/overview.svg";
import StartTimeImage from "../assets/imgs/startTime.svg";
import PlanningImage from "../assets/imgs/planning.svg";
import WorkingImage from "../assets/imgs/working.svg";
import ClosingImage from "../assets/imgs/closing.svg";
import DisableImage from "../assets/imgs/disables.svg";
import DownsImage from "../assets/imgs/downs.svg";

import Heading from "../components/common/Heading/Heading";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Heading title="الصفحة الرئيسية" />

      <Box p={2} bgcolor="#ccc" borderRadius={2} mt={3}>
        {/* top paper */}
        <Paper
          sx={{
            padding: "8px",
            marginBottom:2
          }}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
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
              <img
                src={OverviewImage}
                alt="overview"
                style={{ width: "80px" }}
              />
            </Box>
            <Stack textAlign="center">
              <Typography variant="h4" fontWeight="bold" color="#01204E">
                28
              </Typography>
              <Typography variant="body1" color="initial">
                اجمالى عدد المشروعات
              </Typography>
            </Stack>
            <Stack textAlign="center">
              <Typography variant="h4" fontWeight="bold" color="#01204E">
                255 %
              </Typography>
              <Typography variant="body1" color="initial">
                نسبة التنفيذ الفعلى (%)
              </Typography>
            </Stack>
            <Stack textAlign="center">
              <Typography variant="h4" fontWeight="bold" color="#01204E">
                165,999
              </Typography>
              <Typography variant="body1" color="initial">
                التكلفة المخططة
              </Typography>
            </Stack>
            <Stack textAlign="center">
              <Typography variant="h4" fontWeight="bold" color="#01204E">
                20,256
              </Typography>
              <Typography variant="body1" color="initial">
                المنصرف الفعلى
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        {/* center paper */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6} lg={3}>
            <Paper
              sx={{
                padding: "8px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
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
              }}
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
              }}
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
              }}
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
                  20
                </Typography>
                <Typography variant="body1" color="initial">
                  مرحلة الاغلاق
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Bottom paper */}
        <Grid container spacing={2}  >
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
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
