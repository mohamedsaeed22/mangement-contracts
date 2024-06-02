import DisableImage from "../assets/imgs/disables.svg";
import DownsImage from "../assets/imgs/downs.svg";

import Heading from "../components/common/Heading/Heading";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import TopStat from "../components/manageContracts/TopStat";
import BottomStat from "../components/manageContracts/BottomStat";

const Home = () => {
  return (
    <>
      <Heading title="الصفحة الرئيسية" />

      <Box
        gap={2}
        p={2}
        border="2px solid #000"
        borderRadius={2}
        mt="90px"
        sx={{ marginInline: { xs: "5px", sm: "10px", md: "20px" } }}
        flex={1}
        // bgcolor="#ddd"
      >
        {/* top paper */}
        <TopStat />

        {/* center paper */}
        <BottomStat />
      </Box>
    </>
  );
};

export default Home;
