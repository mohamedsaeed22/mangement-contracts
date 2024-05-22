import { Outlet } from "react-router-dom";
import Sidebar from "../../components/manageContracts/Sidebar/Sidebar";
import { Box, Stack } from "@mui/material";
import Footer from "../../components/common/Footer/Footer";

const MainLayout = () => {
  return (
    <Stack direction="row">
      <Sidebar />
      <Box
        sx={{
          // width: "calc(100% - 250px)",
          flex: 1,
          height: "100vh",
          marginLeft: "auto",
        }}
      >
        <Box
          sx={{
            borderRadius: "30px",
            borderTop: "2px solid #ccc",
            borderRight: "2px solid #ccc",
            borderBottom: "2px solid #ccc",
            height: "calc(100vh - 58px)",
          }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Stack>
  );
};

export default MainLayout;
