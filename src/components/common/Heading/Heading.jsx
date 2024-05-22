import { Box, Typography } from "@mui/material";
import React from "react";

const Heading = ({ title }) => {
  return (
    <Box textAlign="center">
      <Typography
        component="span"
        variant="h6"
        color="initial"
        sx={{
          fontSize: "14px",
          display: "inline-block",
          backgroundColor: "#475CA7",
          padding: "10px 20px",
          color: "white",
          fontWeight: "bold",
          borderBottomRightRadius: "10px",
          borderBottomLeftRadius: "10px",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Heading;
