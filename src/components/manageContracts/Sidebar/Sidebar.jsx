import { Box, Stack, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// icons and imgs
import MenuIcon from "../../../assets/icon/menu.svg";
import MenuBlack from "../../../assets/icon/menu-black.svg";
import BurgerIcon from "../../../assets/icon/burgerMenu.svg";
import ExitIcon from "../../../assets/icon/exit.svg";
import FoeLogo from "../../../assets/imgs/foeLogo.png";

import { SweatAlert } from "../../feedback/alerts";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../../../store/auth/authSlice";
import { actGetBranches } from "../../../store/branch/branchSlice";
import { actGetSupervisors } from "../../../store/supervisor/supervisorSlice";

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
            display: toggleSidebar ? "none" : "block",
          }}
          onClick={handleToggleSidebar}
        />
      </Box>
      <Box
        sx={{
          position: "relative",
          left: 0,
          top: 0,
          width: "250px",
          minWidth: "250px",
          minHeight: "100vh",
          backgroundColor: "#263238",
          borderTopRightRadius: "30px",
          borderBottomRightRadius: "30px",
          zIndex: 100,
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
        {/* menu projects */}
        <Box mt={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            p={1}
            bgcolor="inherit"
            sx={{
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              cursor: "pointer",
            }}
            onClick={toggleProjectSubmenu}
          >
            <Typography
              variant="h6"
              color="initial"
              ml={1}
              fontWeight="bold"
              sx={{ color: "#fff", fontSize: "14px" }}
            >
              المشروعات
            </Typography>
            <img src={BurgerIcon} alt="burger icon" style={{ width: "18px" }} />
          </Stack>
          {showProjectsMenu && (
            <>
              <Box pl={2} mt={1}>
                <NavLink
                  to="/projectsbox"
                  className={({ isActive }) =>
                    `navlink ${isActive ? "active-link" : ""}`
                  }
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    p="4px"
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
                      sx={{ color: "inherit", fontSize: "12px" }}
                    >
                      صندوق المشاريع
                    </Typography>
                  </Stack>
                </NavLink>
              </Box>
              <Box pl={2} mt={1}>
                <NavLink
                  to="/addProject"
                  className={({ isActive }) =>
                    `navlink ${isActive ? "active-link" : ""}`
                  }
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    p="4px"
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
                      sx={{ color: "inherit", fontSize: "12px" }}
                    >
                      {/* <Add /> */}
                      إضافة مشروع
                    </Typography>
                  </Stack>
                </NavLink>
              </Box>
            </>
          )}
        </Box>
        {/* menu branches */}
        <Box
          mt={1}
          // pb={2}
          // borderBottom={showBranchesMenu ? "1px solid #fff" : ""}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            p={1}
            bgcolor="inherit"
            sx={{
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              cursor: "pointer",
            }}
            onClick={toggleBranchSubmenu}
          >
            <Typography
              variant="h6"
              color="initial"
              ml={1}
              fontWeight="bold"
              sx={{ color: "#fff", fontSize: "14px" }}
            >
              الانشطة
            </Typography>
            <img src={BurgerIcon} alt="burger icon" style={{ width: "18px" }} />
          </Stack>
          {showBranchesMenu && (
            <Box
              pl={2}
              mt={1}
              sx={{
                maxHeight: "150px", // Set your desired max height
                overflowY: "scroll",
                direction: "rtl",
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#ddd",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "green",
                },
              }}
            >
              <NavLink
                to={`/mangebranches`}
                className={({ isActive }) =>
                  `navlink ${isActive ? "active-link" : ""}`
                }
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  p="4px"
                  bgcolor="inherit"
                  sx={{
                    direction: "ltr",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
                >
                  <Typography
                    variant="h6"
                    color="initial"
                    ml={1}
                    fontWeight="bold"
                    sx={{ color: "inherit", fontSize: "12px" }}
                  >
                    ادارة الانشطة
                  </Typography>
                </Stack>
              </NavLink>
              {branches?.map((branch) => (
                <Box key={branch.id} mt={1}>
                  <NavLink
                    to={`/branch/${branch.id}`}
                    className={({ isActive }) =>
                      `navlink ${isActive ? "active-link" : ""}`
                    }
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      p="4px"
                      bgcolor="inherit"
                      sx={{
                        direction: "ltr",
                        borderTopLeftRadius: "10px",
                        borderBottomLeftRadius: "10px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        color="initial"
                        ml={1}
                        fontWeight="bold"
                        sx={{ color: "inherit", fontSize: "12px" }}
                      >
                        {branch.name}
                      </Typography>
                    </Stack>
                  </NavLink>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        {/* menu supervisors */}
        <Box
          mt={1}
          pb={2}
          // borderBottom={showSupervisorsMenu ? "1px solid #fff" : ""}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            p={1}
            bgcolor="inherit"
            sx={{
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              cursor: "pointer",
            }}
            onClick={toggleSupervisorSubmenu}
          >
            <Typography
              variant="h6"
              color="initial"
              ml={1}
              fontWeight="bold"
              sx={{ color: "#fff", fontSize: "14px" }}
            >
              المسؤلين
            </Typography>
            <img src={BurgerIcon} alt="burger icon" style={{ width: "18px" }} />
          </Stack>
          {showSupervisorsMenu && (
            <Box pl={2} mt={1}>
              <NavLink
                to={`/mangesupervisors`}
                className={({ isActive }) =>
                  `navlink ${isActive ? "active-link" : ""}`
                }
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  p="4px"
                  bgcolor="inherit"
                  sx={{
                    direction: "ltr",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
                >
                  <Typography
                    variant="h6"
                    color="initial"
                    ml={1}
                    fontWeight="bold"
                    sx={{ color: "inherit", fontSize: "12px" }}
                  >
                    ادارة المسؤلين
                  </Typography>
                </Stack>
              </NavLink>
              {/* {supervisors?.map((branch) => (
                <Box key={branch.id} mt={1}>
                  <NavLink
                    to={`/branch/${branch.id}`}
                    className={({ isActive }) =>
                      `navlink ${isActive ? "active-link" : ""}`
                    }
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      p="4px"
                      bgcolor="inherit"
                      sx={{
                        direction: "ltr",
                        borderTopLeftRadius: "10px",
                        borderBottomLeftRadius: "10px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        color="initial"
                        ml={1}
                        fontWeight="bold"
                        sx={{ color: "inherit", fontSize: "12px" }}
                      >
                        {branch.name}
                      </Typography>
                    </Stack>
                  </NavLink>
                </Box>
              ))} */}
            </Box>
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
    </>
  );
};

export default Sidebar;
