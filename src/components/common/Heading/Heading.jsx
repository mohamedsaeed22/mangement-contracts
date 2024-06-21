import { Box, Typography } from "@mui/material";
import React from "react";

const Heading = ({ title }) => {
  return (
    <Box
      textAlign="center"
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
          fontSize: {
            xs: "10px", // smaller font size for xs
            sm: "12px", // smaller font size for sm
            md: "14px", // default font size for md and above
          },
          display: "inline-block",
          backgroundColor: "#475CA7",
          padding: {
            xs: "10px 10px", // smaller padding for xs
            sm: "12px 30px", // smaller padding for sm
            md: "15px 30px", // default padding for md and above
          },
          width: {
            xs: "150px", // smaller width for xs
            sm: "220px", // smaller width for sm
            md: "200px", // default width for md and above
          },
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
