import Heading from "../components/common/Heading/Heading";
import { Box } from "@mui/material";
import TopStat from "../components/manageContracts/TopStat";
import BottomStat from "../components/manageContracts/BottomStat";
import CenterStat from "../components/manageContracts/CenterStat";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actGetAllStat from "../store/Statistics/act/actGetAllStat";
import LoadingWrapper from "../components/feedback/Loading/LoadingWrapper";
import ErrorIcon from "../assets/lottie/error.json";

const Home = () => {
  const dispatch = useDispatch();
  const { stats, error, loading } = useSelector((state) => state.stat);
  useEffect(() => {
    dispatch(actGetAllStat());
  }, [dispatch]);
   return (
    <>
      <LoadingWrapper loading={loading} error={error} icon={ErrorIcon}>
        <Heading title="الصفحة الرئيسية" />
        <Box
          gap={2}
          p={2}
          border="2px solid #000"
          borderRadius={2}
          mt="90px"
          sx={{ marginInline: { xs: "5px", sm: "10px", md: "20px" } }}
          flex={1}
        >
          {/* top paper */}
          <TopStat stats={stats} />
          {/* center paper */}
          <CenterStat stats={stats} />
          {/* bottom paper */}
          <BottomStat stats={stats} />
        </Box>
      </LoadingWrapper>
    </>
  );
};

export default Home;
