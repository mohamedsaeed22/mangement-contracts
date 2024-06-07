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
import { filterRoles } from "../../../utils/filterRoles";

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
let branchSubmenuList = [
  {
    id: 3,
    nav: "managebranches",
    name: "اداره الانشطة",
  },
];
const supervisroSubmenuList = [
  {
    id: 4,
    nav: "managesupervisors",
    name: "اداره الاستشاريين",
  },
];
const ForeignCompanyList = [
  {
    id: 5,
    nav: "manageitems",
    name: "اداره الاصناف",
  },
  {
    id: 6,
    nav: "managecompanies",
    name: "اداره الشركات",
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const [showProjectsMenu, setShowProjectsMenu] = useState(false);
  const [showBranchesMenu, setShowBranchesMenu] = useState(false);
  const [showSupervisorsMenu, setShowSupervisorsMenu] = useState(false);
  const [showForeignCompany, setShowForeignCompany] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const { branches } = useSelector((state) => state.branch);
  const { roles } = useSelector((state) => state.auth);

  const { supervisors } = useSelector((state) => state.supervisor);
  let branchesList = [];
  if (branches) {
    branchesList = [...branchSubmenuList, ...branches];
  }
  const toggleProjectSubmenu = () => {
    setShowProjectsMenu(!showProjectsMenu);
  };
  const toggleForeignCompany = () => {
    setShowForeignCompany(!showForeignCompany);
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

          {/* projects menu  */}
          <SidebarMenu
            menuTitle={"المشروعات"}
            toggleSubmenuFun={toggleProjectSubmenu}
            showSubmenu={showProjectsMenu}
            subMenuList={
              filterRoles(["Admin", "SuperAdmin", "DefaultUserBranch"])
                ? projectSubmenuList
                : [projectSubmenuList[0]]
            }
          />
          {/* branches menu  */}
          <SidebarMenu
            menuTitle={"الانشطة"}
            toggleSubmenuFun={toggleBranchSubmenu}
            showSubmenu={showBranchesMenu}
            subMenuList={
              filterRoles(["Admin", "SuperAdmin", "DefaultUserBranch"])
                ? branchesList
                : [...branches]
            }
          />
          {/* supervisors menu  */}
          {filterRoles(["Admin", "SuperAdmin"]) && (
            <>
              <SidebarMenu
                menuTitle={"الاستشاريين"}
                toggleSubmenuFun={toggleSupervisorSubmenu}
                showSubmenu={showSupervisorsMenu}
                subMenuList={supervisroSubmenuList}
              />
              <SidebarMenu
                menuTitle={"التعاقدات الخارجيه"}
                toggleSubmenuFun={toggleForeignCompany}
                showSubmenu={showForeignCompany}
                subMenuList={ForeignCompanyList}
              />
            </>
          )}
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
