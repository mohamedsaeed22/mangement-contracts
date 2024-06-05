import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import LottieWrapper from "../Lottie/LottieWrapper";
const LoadingWrapper = ({ loading, error, children, icon }) => {
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
      <Box>
        <Typography
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          {icon && <LottieWrapper MyLottieIcon={icon} />}
          {error}
        </Typography>
      </Box>
    );
  }

  return children;
};

export default LoadingWrapper;
