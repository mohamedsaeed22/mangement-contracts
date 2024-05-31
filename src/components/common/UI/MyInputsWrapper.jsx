import { Stack } from "@mui/material";
import React from "react";

const MyInputsWrapper = ({ direction = "row", children }) => {
  return (
    <Stack
      direction={direction}
      justifyContent="space-evenly"
      alignItems="flex-start"
      // bgcolor="#ccc"
      flexWrap="wrap"
      gap={5}
      mb={3}
    >
      {children}
    </Stack>
  );
};

export default MyInputsWrapper;
