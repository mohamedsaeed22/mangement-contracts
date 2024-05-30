import { Box, Typography } from "@mui/material";
import React from "react";

const Heading = ({ title }) => {
  return (
    <Box
      textAlign="center"
      position="absolute"
      sx={{
        position: "absolute",
        left: "50%",
        top: "0",
        transform: "translateX(-50%)",
      }}
    >
      <Typography
        component="span"
        variant="h6"
        color="initial"
        sx={{
          fontSize: "14px",
          display: "inline-block",
          backgroundColor: "#475CA7",
          padding: "15px 40px",
          width: "250px",
          color: "white",
          fontWeight: "bold",
          borderBottomRightRadius: "8px",
          borderBottomLeftRadius: "8px",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Heading;
