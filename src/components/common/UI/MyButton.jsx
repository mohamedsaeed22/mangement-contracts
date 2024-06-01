import { Button } from "@mui/material";
import React from "react";

const MyButton = ({
  height = 56,
  label,
  disabled = false,
  handleClick,
  type,
  width,
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        width: width,
        height: height,
        backgroundColor: "#475CA7",
        "&:hover": { backgroundColor: "#475CA7", color: "#fff " },
      }}
      onClick={() => handleClick}
      disableElevation
      type={type}
    >
      {label}
    </Button>
  );
};

export default MyButton;
