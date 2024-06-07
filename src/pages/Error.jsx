import LottieWrapper from "../components/feedback/Lottie/LottieWrapper";
import Error404 from "../assets/lottie/404.json";
import { Box, Stack, Typography } from "@mui/material";

const Error = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxWidth="500px"
      margin="20vh auto"
      border="1px solid #ccc"
      p={2}
      borderRadius={4}
    >
      <Stack alignItems="center" justifyContent="center" gap={1}>
        <LottieWrapper MyLottieIcon={Error404} />
        <Typography variant="h4" color="initial">
          هذه الصفحة غير موجوده!!
        </Typography>
      </Stack>
    </Box>
  );
};

export default Error;
