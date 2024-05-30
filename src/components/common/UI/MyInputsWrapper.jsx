import { Stack } from "@mui/material";
import React from "react";

const MyInputsWrapper = ({ direction = "row", children }) => {
  return (
    <Stack
      direction={direction}
      justifyContent="space-evenly"
      // bgcolor="#ccc"
      alignItems="flex-start"
      flexWrap="wrap"
      gap={1}
    >
      {children}
    </Stack>
  );
};

export default MyInputsWrapper;
