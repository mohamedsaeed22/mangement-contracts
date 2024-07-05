import { Box, Typography } from "@mui/material";
import React from "react";

const MyShowInput = ({
  title,
  value,
  myStyle,
  fullheight = true,
  children,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff !important",
        border: "2px solid #475CA7",
        borderRadius: "6px",
        padding: "10px 10px",
        position: "relative",
        height: fullheight ? "100%" : "auto",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: "13px",
          position: "absolute",
          top: "-12px",
          left: 10,
          color: "#475CA7",
          fontWeight: "600",
          paddingInline: "6px",
          zIndex: 10,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            backgroundColor: "#EEF7FccF", // Background color of the parent
            zIndex: -1,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
            backgroundColor: "#fff", // Background color of the child
            zIndex: -1,
          },
          "@media print": {
            "&::before": {
              backgroundColor: "#fff", // Background color of the parent
            },
          },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        color="initial"
        sx={{ direction: "ltr", textAlign: "center", ...myStyle }}
      >
        {children ? children : value}
      </Typography>
    </Box>
  );
};

export default MyShowInput;
