import { Box, Typography } from "@mui/material";
import React from "react";

const Heading = () => {
  return (
    <Box textAlign="center">
      <Typography
        component="span"
        variant="h5"
        color="initial"
        sx={{
          display:'inline-block',
          backgroundColor: "#475CA7",
          padding: "10px 20px",
          color: "white",
          fontWeight: "bold",
          borderBottomRightRadius: "10px",
          borderBottomLeftRadius: "10px",
        }}
      >
        صندوق العقود
      </Typography>
    </Box>
  );
};

export default Heading;
