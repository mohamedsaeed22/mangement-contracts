import { Stack, Typography } from "@mui/material";
import React from "react";

const MyInputsWrapper = ({ direction = "row", title, children }) => {
  return (
    <Stack
      mt={3}
      sx={{
        border: "1px solid #ddd ",
        borderRadius: "8px",
        padding: "20px 18px 10px",
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
