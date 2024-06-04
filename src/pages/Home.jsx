import Heading from "../components/common/Heading/Heading";
import { Box } from "@mui/material";
import TopStat from "../components/manageContracts/TopStat";
import BottomStat from "../components/manageContracts/BottomStat";
import CenterStat from "../components/manageContracts/CenterStat";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actGetAllStat from "../store/Statistics/act/actGetAllStat";

const Home = () => {
  const dispatch = useDispatch();
  const { allStat, error } = useSelector((state) => state.stat);
console.log(error)
  const {
    totalProjects,
    totalPercentage,
    totalBudget,
    totalSpent,
    totalCompletedProjects,
    totalInProgressProjects,
    totalOnHoldProjects,
    totalNotStartedProjects,
    totalRisks,
    totalActiveRisks,
    totalClosedRisks,
    totalOnHoldRisks,
    totalHandicaps,
    totalActiveHandicaps,
    totalClosedHandicaps,
    totalOnHoldHandicaps,
  } = allStat;

  useEffect(() => {
    dispatch(actGetAllStat());
  }, [dispatch]);

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
        <TopStat
          totalProjects={totalProjects}
          totalPercentage={totalPercentage}
          totalBudget={totalBudget}
          totalSpent={totalSpent}
        />
        {/* center paper */}
        <CenterStat
          totalCompletedProjects={totalCompletedProjects}
          totalInProgressProjects={totalInProgressProjects}
          totalOnHoldProjects={totalOnHoldProjects}
          totalNotStartedProjects={totalNotStartedProjects}
        />
        {/* bottom paper */}
        <BottomStat
          totalRisks={totalRisks}
          totalActiveRisks={totalActiveRisks}
          totalClosedRisks={totalClosedRisks}
          totalOnHoldRisks={totalOnHoldRisks}
          totalHandicaps={totalHandicaps}
          totalActiveHandicaps={totalActiveHandicaps}
          totalClosedHandicaps={totalClosedHandicaps}
          totalOnHoldHandicaps={totalOnHoldHandicaps}
        />
      </Box>
    </>
  );
};

export default Home;
