import { Box } from "@mui/material";
import React from "react";

const StatusLabel = ({ status }) => {
  let bg = "#000";
  let label = "";
  switch (status) {
    case 1:
      bg = "#FF5733";
      label = "لم يتم البدء";
      break;
    case 2:
      bg = "#FFC300";
      label = "جار العمل علية";
      break;
    case 3:
      bg = "#28A745";
      label = "اكتمل";
      break;
    case 4:
      bg = "#17A2B8";
      label = "معلق";
      break;
    default:
      break;
  }
  return (
    <Box
      sx={{
        backgroundColor: bg,
        color: "#fff",
        borderRadius: "10px",
        padding: "5px",
      }}
    >
      {label}
    </Box>
  );
};

export default StatusLabel;
