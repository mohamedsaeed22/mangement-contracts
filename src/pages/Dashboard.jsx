import { Box, Stack } from "@mui/material";
import MainBarChart from "../components/MainBarChart";
import BasicBieChart from "../components/manageContracts/charts/BasicBieChart";
import BasicColChart from "../components/manageContracts/charts/BasicColChart";
import ColChartWithLable from "../components/manageContracts/charts/ColChartWithLable";
import DonutBieChart from "../components/manageContracts/charts/DonutBieChart";
import DotChart from "../components/manageContracts/charts/DotChart";
import LineChart from "../components/manageContracts/charts/LineChart";
import SemiBieChart from "../components/manageContracts/charts/SemiBieChart";
import DrilldownChart from "../components/manageContracts/DrilldownChart";
import LineZoneChart from "../components/manageContracts/LineZoneChart";
import MainColChart from "../components/manageContracts/MainColChart";
import SemiPie from "../components/manageContracts/SemiPie";
import ManageActivities from "./ManageActivities";

const Dashboard = () => {
  return (
    <div>
      {/* <MainColChart key="col-chart" />
      <div>test</div>
      <MainBarChart key="bar-chart" />
      <div>test</div>
      <SemiPie key="semi-pie" />
      <div>test</div>
      <DrilldownChart key="drilldown-chart" />
      <div>test</div>
      <LineZoneChart key="line-zone-chart" /> */}
      <Box>
        <BasicColChart />
        <Stack direction="row" gap={5} flexWrap="wrap">
          <Box width={450}>
            <SemiBieChart />
          </Box>

          <Box width={350}>
            <DonutBieChart />
          </Box>

          <Box width={350}>
            <DonutBieChart />
          </Box>

          <Box width={350}>
            <BasicBieChart />
          </Box>

          <Box width={350}>
            <BasicBieChart />
          </Box>
          <Box width={350}>
            <DotChart />
          </Box>
          <Box width={350}>
            <LineChart />
          </Box>
          <Box width={350}>
            <ColChartWithLable />
          </Box>
        </Stack>
      </Box>

      <div>
        <div>
          {/* <div style={{ display: "flex", justifyContent: "space-around" }}>
            <BasicBieChart />
          </div> */}
        </div>
      </div>
      {/* <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <ColChartWithLable />
        <LineChart />
        <DotChart />
      </div> */}
    </div>
  );
};

export default Dashboard;
