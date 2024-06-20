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
import SidebarMenu from "./SidebarMenu";
import { SweatAlert } from "../../feedback/Alerts/alerts";
import { filterRoles } from "../../../utils/filterRoles";
import { actGetActivities } from "../../../store/Activity/activitySlice";
import { actGetSectors } from "../../../store/sector/sectorSlice";

const projectSubmenuList = [
  {
    id: 1,
    nav: "projectsbox",
    name: "صندوق المشاريع",
  },
  {
    id: 2,
    nav: "project/add",
    name: "اضافه مشروع",
  },
];
const sectorSubmenuList = [
  {
    id: 3,
    nav: "managesectors",
    name: "اداره القطاعات",
  },
];

let activitySubmenuList = [
  {
    id: 4,
    nav: "manageactivities",
    name: "اداره الانشطة",
  },
];


let activitiesList = [];
let sectorList = [];
const Sidebar = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(null);

  const [toggleSidebar, setToggleSidebar] = useState(true);
  const { activities } = useSelector((state) => state.activity);
  const { sectors } = useSelector((state) => state.sector);
  const { roles } = useSelector((state) => state.auth);

  if (activities) {
    activitiesList = [...activitySubmenuList, ...activities];
  }
  if (sectors) {
    sectorList = [...sectorSubmenuList, ...sectors];
  }
  console.log(sectors);

  const handleMenuToggle = (menuName) => {
    setOpenMenu((prevMenu) => (prevMenu === menuName ? null : menuName));
  };

  useEffect(() => {
    dispatch(actGetActivities());
    dispatch(actGetSectors());
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
    <Box bgcolor="#F5F5F5">
      <Box>
        <img
          src={MenuBlack}
          alt="burger icon"
          style={{
            position: "absolute",
            width: "32px",
            margin: "10px",
            cursor: "pointer",
            zIndex: 20,
            display: { xs: "block", md: toggleSidebar ? "none" : "block" },
          }}
          onClick={handleToggleSidebar}
        />
      </Box>
      <Box
        sx={{
          position: { xs: "fixed", lg: "relative" },
          left: 0,
          top: 0,
          width: "250px",
          minWidth: "250px",
          minHeight: "100vh",
          height: "100%",
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
            marginTop: "15px",
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
            marginTop: "20px",
          }}
        />
        <Box mt={2}>
          {filterRoles([
            "Admin",
            "SuperAdmin",
            "ProjectManagement.ReadOnly",
          ]) && (
            <Box>
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
          )}

          <SidebarMenu
            menuTitle={"القطاعات"}
            toggleSubmenuFun={() => handleMenuToggle("sector")}
            showSubmenu={openMenu === "sector"}
            subMenuList={
              filterRoles(["Admin", "SuperAdmin"])
                ? sectorList
                : [...activities]
            }
            navLink="sector"
          />
          <SidebarMenu
            menuTitle={"الانشطة"}
            toggleSubmenuFun={() => handleMenuToggle("activity")}
            showSubmenu={openMenu === "activity"}
            subMenuList={
              filterRoles(["Admin", "SuperAdmin"])
                ? activitiesList
                : [...activities]
            }
            navLink="activity"
          />
          <SidebarMenu
            menuTitle={"المشروعات"}
            toggleSubmenuFun={() => handleMenuToggle("project")}
            showSubmenu={openMenu === "project"}
            subMenuList={
              filterRoles(["Admin", "SuperAdmin", "DefaultUserActivity"])
                ? projectSubmenuList
                : [projectSubmenuList[0]]
            }
          />

          <Box
            sx={{
              position: "absolute",
              width: "100%",
              bottom: 90,
              marginBottom: "10px",
            }}
          >
            {filterRoles([
              "Admin",
              "SuperAdmin",
              "ProjectManagement.ReadOnly",
            ]) && (
              <Box>
                <NavLink
                  to="/consultant/add"
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
                    }}
                  >
                    <Typography
                      variant="h6"
                      color="initial"
                      ml={1}
                      fontWeight="bold"
                      sx={{ color: "inherit", fontSize: "14px" }}
                    >
                      الاستشاريين
                    </Typography>
                  </Stack>
                </NavLink>
              </Box>
            )}
            {filterRoles([
              "Admin",
              "SuperAdmin",
              "ProjectManagement.ReadOnly",
            ]) && (
              <Box>
                <NavLink
                  to="/contractor/add"
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
                    }}
                  >
                    <Typography
                      variant="h6"
                      color="initial"
                      ml={1}
                      fontWeight="bold"
                      sx={{ color: "inherit", fontSize: "14px" }}
                    >
                      المقاولين
                    </Typography>
                  </Stack>
                </NavLink>
              </Box>
            )}
          </Box>
        </Box>
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
    </Box>
  );
};

export default Sidebar;
