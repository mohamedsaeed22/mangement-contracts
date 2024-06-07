import { Box } from "@mui/material";
import React from "react";
import Lottie from "react-lottie";

const LottieWrapper = ({ MyLottieIcon }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: MyLottieIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box maxWidth="100%">
      <Lottie options={defaultOptions} />
    </Box>
  );
};

export default LottieWrapper;
