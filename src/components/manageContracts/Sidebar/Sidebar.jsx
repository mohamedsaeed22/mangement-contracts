import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// icons and imgs
import MenuIcon from "../../../assets/icon/menu.svg";
import MenuBlack from "../../../assets/icon/menu-black.svg";

import BurgerIcon from "../../../assets/icon/burgerMenu.svg";
import ExitIcon from "../../../assets/icon/exit.svg";
import FoeLogo from "../../../assets/imgs/foeLogo.png";
import { SweatAlert } from "../../feedback/alerts";
import { useDispatch } from "react-redux";
import { authLogout } from "../../../store/auth/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(true);

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

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
      // navigate("/login", { replace: true });
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
              {/* <img src={BurgerIcon} alt="burger icon" style={{ width: "18px" }} /> */}
            </Stack>
          </NavLink>
        </Box>
        <Box mt={4}>
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
            onClick={toggleSubmenu}
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
          {showSubmenu && (
            <>
              <Box pl={2} mt={2}>
                <NavLink
                  to="/addProject"
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
                      إضافة مشروع
                    </Typography>
                  </Stack>
                </NavLink>
              </Box>
              <Box pl={2} mt={2}>
                <NavLink
                  to="/projectsbox"
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
                      صندوق المشاريع
                    </Typography>
                  </Stack>
                </NavLink>
              </Box>
            </>
          )}
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
    </>
  );
};

export default Sidebar;
