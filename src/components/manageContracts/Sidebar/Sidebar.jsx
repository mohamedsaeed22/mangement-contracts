import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// icons and imgs
import MenuIcon from "../../../assets/icon/menu.svg";
import MenuBlack from "../../../assets/icon/menu-black.svg";
import FoeLogo from "../../../assets/imgs/foeLogo.png";
import ExitIcon from "../../../assets/icon/exit.svg";

import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../../../store/auth/authSlice";
import { actGetBranches } from "../../../store/branch/branchSlice";
import { actGetSupervisors } from "../../../store/supervisor/supervisorSlice";
import SidebarMenu from "./SidebarMenu";
import { SweatAlert } from "../../feedback/Alerts/alerts";

const projectSubmenuList = [
  {
    nav: "projectsbox",
    title: "صندوق المشاريع",
  },
  {
    nav: "project/add",
    title: "اضافه مشروع",
  },
];
const branchSubmenuList = [
  {
    nav: "managebranches",
    title: "اداره الانشطة",
  },
];
const supervisroSubmenuList = [
  {
    nav: "managesupervisors",
    title: "اداره المشرفين",
  },
];
const Sidebar = () => {
  const dispatch = useDispatch();
  const [showProjectsMenu, setShowProjectsMenu] = useState(false);
  const [showBranchesMenu, setShowBranchesMenu] = useState(false);
  const [showSupervisorsMenu, setShowSupervisorsMenu] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const { branches } = useSelector((state) => state.branch);
  const { supervisors } = useSelector((state) => state.supervisor);

  const toggleProjectSubmenu = () => {
    setShowProjectsMenu(!showProjectsMenu);
  };

  const toggleBranchSubmenu = () => {
    setShowBranchesMenu(!showBranchesMenu);
  };

  const toggleSupervisorSubmenu = () => {
    setShowSupervisorsMenu(!showSupervisorsMenu);
  };

  useEffect(() => {
    dispatch(actGetBranches());
    dispatch(actGetSupervisors());
  }, [dispatch]);

  const handleToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const handleLogout = async () => {
    const willDelete = await SweatAlert({
      title: "هل متاكد من تسجيل الخروج ؟",
      icon: "warning",
      dangerMode: true,
    });
    if (willDelete) {
      dispatch(authLogout());
    }
  };

  return (
    <>
      <Box>
        <img
          src={MenuBlack}
          alt="burger icon"
          style={{
            position: "absolute",
            width: "30px",
            margin: "20px",
            cursor: "pointer",
            zIndex: 20,
            backgroundColor: "#fff",
            display: { xs: "block", md: toggleSidebar ? "none" : "block" },
          }}
          onClick={handleToggleSidebar}
        />
      </Box>
      <Box
        sx={{
          // position: { xs: "fixed", },
          // left: { xs: toggleSidebar ? 0 : "-250px", md: toggleSidebar ? 0 : "-250px" },
          // top: 0,
          // width: "250px",
          // minWidth: "250px",
          // minHeight: "100vh",
          // backgroundColor: "#263238",
          // borderTopRightRadius: "30px",
          // borderBottomRightRadius: "30px",
          // zIndex: 10000,
          // overflowY: "auto",
          // overflowX: "hidden",
          // transition: "left 0.3s",
          // display: { xs: "block", md: "block" },
          position: { xs: "fixed", lg: "relative" },
          left: 0,
          top: 0,
          width: "250px",
          minWidth: "250px",
          minHeight: "100vh",
          backgroundColor: "#263238",
          borderTopRightRadius: "30px",
          borderBottomRightRadius: "30px",
          zIndex: 1000,
          overflowY: "auto",
          overflowX: "hidden",
          display: toggleSidebar ? "block" : "none",
        }}
      >
        <img
          src={MenuIcon}
          alt="menu icon"
          style={{
            width: "30px",
            display: "block",
            marginTop: "20px",
            marginRight: "auto",
            marginLeft: "20px",
            cursor: "pointer",
          }}
          onClick={handleToggleSidebar}
        />
        <img
          src={FoeLogo}
          alt="foe logo"
          style={{
            width: "180px",
            display: "block",
            marginInline: "auto",
            marginTop: "40px",
          }}
        />
        {/* home menu */}
        <Box mt={6}>
          <NavLink
            to="/"
            exact="true"
            className={({ isActive }) =>
              `navlink ${isActive ? "active-link" : ""}`
            }
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              p={1}
              bgcolor="inherit"
              sx={{
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
                "&:hover": { color: "blue !important" },
              }}
            >
              <Typography
                variant="h6"
                color="initial"
                ml={1}
                fontWeight="bold"
                sx={{ color: "inherit", fontSize: "14px" }}
              >
                الصفحة الرئيسية
              </Typography>
            </Stack>
          </NavLink>
        </Box>
        {/* projects menu  */}
        <SidebarMenu
          menuTitle={"المشروعات"}
          toggleSubmenuFun={toggleProjectSubmenu}
          showSubmenu={showProjectsMenu}
          subMenuList={projectSubmenuList}
        />
        {/* branches menu  */}
        <SidebarMenu
          menuTitle={"الانشطة"}
          toggleSubmenuFun={toggleBranchSubmenu}
          showSubmenu={showBranchesMenu}
          subMenuList={branchSubmenuList}
        />
        {/* supervisors menu  */}
        <SidebarMenu
          menuTitle={"المشرفين"}
          toggleSubmenuFun={toggleSupervisorSubmenu}
          showSubmenu={showSupervisorsMenu}
          subMenuList={supervisroSubmenuList}
        />
        {/* logout */}
        <Stack
          direction="row"
          position="absolute"
          bottom="50px"
          width="100%"
          justifyContent="space-between"
          p={1}
          sx={{
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
            cursor: "pointer",
            transition: "border 0.2s",
            "&:hover": {
              border: "1px solid #fff",
            },
          }}
          onClick={handleLogout}
        >
          <Typography
            variant="h6"
            color="initial"
            ml={1}
            fontWeight="bold"
            sx={{ color: "#fff", fontSize: "14px" }}
          >
            تسجيل خروج
          </Typography>
          <img src={ExitIcon} alt="burger icon" style={{ width: "18px" }} />
        </Stack>
      </Box>
    </>
  );
};

export default Sidebar;
