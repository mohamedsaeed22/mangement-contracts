import { Stack, Typography } from "@mui/material";
import React from "react";

const MyInputsWrapper = ({ direction = "row", title, children }) => {
  return (
    <Stack
      mt={3}
      sx={{
        border: "1px solid #ddd ",
        borderRadius: "8px",
        padding: "24px 18px",
        position: "relative",
        gap: 3,
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
          backgroundColor: "#fff",
        }}
      >
        {title}
      </Typography>
      {children}
    </Stack>
  );
};

export default MyInputsWrapper;
