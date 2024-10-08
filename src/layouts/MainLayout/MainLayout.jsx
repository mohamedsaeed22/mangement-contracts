import { Outlet } from "react-router-dom";
import { Box, Button, Stack } from "@mui/material";
import Footer from "../../components/common/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/manageContracts/Sidebar/Sidebar";
import { East } from "@mui/icons-material";

const MainLayout = () => {
  return (
    <>
      <ToastContainer />
      <Stack direction="row" minHeight="100vh">
        <Sidebar />
        <Box
          sx={{
            // maxWidth: "calc(100% - 250px)",
            flex: 1,
            minHeight: "100vh",
            // marginLeft: "auto",
            overflowY: "auto",
          }}
        >
          <Stack
            component="main"
            sx={{
              minHeight: "calc(100vh - 56px)",
              flex: 1,
              position: "relative",
              backgroundColor: "#EEF7FccF",
            }}
          >
            {/* <Box
              gap={2}
              p={1}
              border="2px solid #000"
              borderRadius={2}
              m="140px 20px 0px"
              flex={1}
              bgcolor="#ddd"
            > */}
            <Outlet />
            {/* </Box> */}
          </Stack>
          <Footer />
        </Box>
      </Stack>
    </>
  );
};

export default MainLayout;
