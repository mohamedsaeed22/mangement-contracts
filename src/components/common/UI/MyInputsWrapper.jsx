import { Stack, Typography } from "@mui/material";
import React from "react";

const MyInputsWrapper = ({ title, children }) => {
  return (
    <Stack
      sx={{
        border: "1px solid #ccc ",
        borderRadius: "8px",
        padding: "24px 14px 18px",
        position: "relative",
        gap: 2,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <Typography
        variant="body1"
        color="initial"
        sx={{
          fontWeight: "600",
          fontSize: "13px",
          position: "absolute",
          top: "-10px",
          paddingInline: "6px",
          backgroundColor: "#F5F5F5",
        }}
      >
        {title}
      </Typography>
      {children}
    </Stack>
  );
};

export default MyInputsWrapper;
