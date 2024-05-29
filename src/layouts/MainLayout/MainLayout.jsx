import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import Footer from "../../components/common/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/manageContracts/Sidebar/Sidebar";

const MainLayout = () => {
  return (
    <>
      <ToastContainer />
      <Stack direction="row" minHeight="100vh">
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
              height: "calc(100vh)",
              overflowY: "scroll",
            }}
          >
            <Outlet />
          </Box>
          {/* <Footer /> */}
        </Box>
      </Stack>
    </>
  );
};

export default MainLayout;
