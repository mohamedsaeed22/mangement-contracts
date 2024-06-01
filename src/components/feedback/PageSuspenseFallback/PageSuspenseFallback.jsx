import React from "react";
import Lottie from "react-lottie";
import LoadingAnimation from "../../../assets/lottie/loading-anim.json";
import { Box } from "@mui/material";

const PageSuspenseFallback = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box
      sx={{ position: "absolute", left: "50%", top: "50%",transform:'translate(-50%,-50%)' }}
    >
      <Lottie options={defaultOptions} height={150} width={150} />
    </Box>
  );
};

export default PageSuspenseFallback;
