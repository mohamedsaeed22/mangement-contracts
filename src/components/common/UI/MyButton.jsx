import { Button } from "@mui/material";
import React from "react";

const MyButton = ({ label, disabled = false, handleClick }) => {
  return (
    <Button
      variant="contained"
      sx={{
        minWidth: 180,
        backgroundColor: "#475CA7",
        "&:hover": { backgroundColor: "#475CA7", color: "#fff " },
      }}
      onClick={() => handleClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default MyButton;
