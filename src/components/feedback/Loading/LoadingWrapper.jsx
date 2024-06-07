import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import LottieWrapper from "../Lottie/LottieWrapper";
import ErrorIcon from "../../../assets/lottie/error.json";
const LoadingWrapper = ({ loading, error, children, icon = ErrorIcon }) => {
  if (loading) {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Stack
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: 300,
        }}
      >
        {icon && <LottieWrapper MyLottieIcon={icon} />}
        <Typography textAlign="center">{error}</Typography>
      </Stack>
    );
  }

  return children;
};

export default LoadingWrapper;
