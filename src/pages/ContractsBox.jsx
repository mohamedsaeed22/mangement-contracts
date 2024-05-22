import React from "react";
import Heading from "../components/common/Heading/Heading";
import { Box, Stack } from "@mui/material";

const ContractsBox = () => {
  return (
    <>
      <Heading />
      <Box p={2}>
        <Stack direction="row" justifyContent="space-between">
          <input type="search" />
          <button>ss</button>
        </Stack>
      </Box>
    </>
  );
};

export default ContractsBox;
