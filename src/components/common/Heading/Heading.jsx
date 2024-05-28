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
          backgroundColor: "#263238",
          padding: "15px 40px",
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
