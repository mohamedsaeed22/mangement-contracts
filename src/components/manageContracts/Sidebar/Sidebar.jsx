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
import { actGetSupervisors } from "../../../store/supervisor/supervisorSlice";
import SidebarMenu from "./SidebarMenu";
import { SweatAlert } from "../../feedback/Alerts/alerts";
import { filterRoles } from "../../../utils/filterRoles";
import { actGetActivities } from "../../../store/Activity/activitySlice";

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
    id: 1,
    nav: "managesectors",
    name: "اداره القطاعات",
  },
];

let activitySubmenuList = [
  {
    id: 3,
    nav: "manageactivities",
    name: "اداره الانشطة",
  },
];

let contractorSubmenuList = [
  {
    id: 4,
    nav: "managecontractors",
    name: "اداره المقاولين",
  },
];

const supervisroSubmenuList = [
  {
    id: 4,
    nav: "managesupervisors",
    name: "اداره الاستشاريين",
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const [showProjectsMenu, setShowProjectsMenu] = useState(false);
  const [showSectormenu, setShowSectormenu] = useState(false);
  const [showactivitiesMenu, setShowactivitiesMenu] = useState(false);
  const [showSupervisorsMenu, setShowSupervisorsMenu] = useState(false);
  const [showContractorMenu, setShowContractorMenu] = useState(false);

  const [toggleSidebar, setToggleSidebar] = useState(true);
  const { activities } = useSelector((state) => state.activity);
  const { roles } = useSelector((state) => state.auth);

  const { supervisors } = useSelector((state) => state.supervisor);
  let activitiesList = [];
  if (activities) {
    activitiesList = [...activitySubmenuList, ...activities];
  }

  const toggleProjectSubmenu = () => {
    setShowProjectsMenu(!showProjectsMenu);
  };
  const toggleSectorSubmenu = () => {
    setShowSectormenu(!showSectormenu);
  };
  const toggleActivitySubmenu = () => {
    setShowactivitiesMenu(!showactivitiesMenu);
  };
  const toggleSupervisorSubmenu = () => {
    setShowSupervisorsMenu(!showSupervisorsMenu);
  };
  const toggleContractorSubmenu = () => {
    setShowContractorMenu(!showContractorMenu);
  };
  useEffect(() => {
    dispatch(actGetActivities());
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
    <Box bgcolor="#F5F5F5">
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
            // backgroundColor: "#fff",
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
        <Box mt={6}>
          {/* home menu */}
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
                    // "&:hover": { color: "blue !important" },
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
            toggleSubmenuFun={toggleSectorSubmenu}
            showSubmenu={showSectormenu}
            subMenuList={
              filterRoles(["Admin", "SuperAdmin"])
                ? sectorSubmenuList
                : [...activities]
            }
            navLink="sector"
          />
          {/* activities menu  */}
          <SidebarMenu
            menuTitle={"الانشطة"}
            toggleSubmenuFun={toggleActivitySubmenu}
            showSubmenu={showactivitiesMenu}
            subMenuList={
              filterRoles(["Admin", "SuperAdmin"])
                ? activitySubmenuList
                : [...activities]
            }
            navLink="activity"
          />
          {/* projects menu  */}
          <SidebarMenu
            menuTitle={"المشروعات"}
            toggleSubmenuFun={toggleProjectSubmenu}
            showSubmenu={showProjectsMenu}
            subMenuList={
              filterRoles(["Admin", "SuperAdmin", "DefaultUserActivity"])
                ? projectSubmenuList
                : [projectSubmenuList[0]]
            }
          />

          {/* supervisors menu  */}
          {/* <Box sx={{ position: "absolute", width: "100%", bottom: 109 }}> */}
            {filterRoles(["Admin", "SuperAdmin"]) && (
              <SidebarMenu
                menuTitle={"الاستشاريين"}
                toggleSubmenuFun={toggleSupervisorSubmenu}
                showSubmenu={showSupervisorsMenu}
                subMenuList={supervisroSubmenuList}
              />
            )}
            {filterRoles(["Admin", "SuperAdmin"]) && (
              <SidebarMenu
                menuTitle={"المقاولين"}
                toggleSubmenuFun={toggleContractorSubmenu}
                showSubmenu={showContractorMenu}
                subMenuList={contractorSubmenuList}
              />
            )}
          {/* </Box> */}
        </Box>
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
    </Box>
  );
};

export default Sidebar;
