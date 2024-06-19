import React from "react";
import LoadingAnimation from "../../../assets/lottie/loading-anim.json";
import LottieWrapper from "../Lottie/LottieWrapper";
import { Box } from "@mui/material";

const PageSuspenseFallback = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <LottieWrapper MyLottieIcon={LoadingAnimation} />
    </Box>
  );
};

export default PageSuspenseFallback;
