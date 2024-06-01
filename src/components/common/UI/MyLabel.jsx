import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const MyLabel = ({label,value}) => {
  return (
    <Stack direction="row" alignItems="center" color="#000" width={300} justifyContent="space-between">
      <Typography variant="body1" color="initial" fontSize={18} fontWeight={400}>
        {label}
      </Typography>
      <Box
        sx={{
          backgroundColor: "#fff",
          width: 148,
          height: 50,
          border: "1px solid #000",
          borderRadius: "8px",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Typography variant="body1" color="inherit">
        {value}
        </Typography>
      </Box>
    </Stack>
  );
};

export default MyLabel;
