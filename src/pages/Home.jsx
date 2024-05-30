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

      <Box>
        {/* top paper */}
        <TopStat />

        {/* center paper */}
        <BottomStat />
      </Box>
    </>
  );
};

export default Home;
