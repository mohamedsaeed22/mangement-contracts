import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

// icons and imgs
import MenuIcon from "../../../assets/icon/menu.svg";
import BurgerIcon from "../../../assets/icon/burgerMenu.svg";
import ExitIcon from "../../../assets/icon/exit.svg";
import FoeLogo from "../../../assets/imgs/foeLogo.png";

const Sidebar = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "250px",
        height: "100vh",
        backgroundColor: "#263238",
        borderTopRightRadius: "30px",
        borderBottomRightRadius: "30px",
        zIndex: 100,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <img
        src={MenuIcon}
        alt="menu icon"
        style={{
          width: "40px",
          display: "block",
          marginTop: "20px",
          marginRight: "auto",
          marginLeft: "20px",
          cursor: "pointer",
        }}
      />
      <img
        src={FoeLogo}
        alt="foe logo"
        style={{
          width: "200px",
          display: "block",
          marginInline: "auto",
          marginTop: "40px",
        }}
      />
      <Box mt={6}>
        <NavLink
          to="/"
          exact
          className={({ isActive }) =>
            `navlink ${isActive ? "active-link" : ""}`
          }
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            p={1}
            bgcolor="inherit"
            sx={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}
          >
            <Typography
              variant="h5"
              color="initial"
              ml={1}
              fontWeight="bold"
              sx={{ color: "inherit" }}
            >
              الصفحة الرئيسية
            </Typography>
            <img src={BurgerIcon} alt="burger icon" style={{ width: "18px" }} />
          </Stack>
        </NavLink>
      </Box>
      <Box mt={4}>
        <NavLink
          to="/contracts"
          className={({ isActive }) =>
            `navlink ${isActive ? "active-link" : ""}`
          }
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            p={1}
            bgcolor="inherit"
            sx={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}
          >
            <Typography
              variant="h5"
              color="initial"
              ml={1}
              fontWeight="bold"
              sx={{ color: "inherit" }}
            >
              العقود
            </Typography>
            <img src={BurgerIcon} alt="burger icon" style={{ width: "18px" }} />
          </Stack>
        </NavLink>
      </Box>
      <Box mt={4}>
        <NavLink
          to="/companies"
          className={({ isActive }) =>
            `navlink ${isActive ? "active-link" : ""}`
          }
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            p={1}
            bgcolor="inherit"
            sx={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}
          >
            <Typography
              variant="h5"
              color="initial"
              ml={1}
              fontWeight="bold"
              sx={{ color: "#inherit" }}
            >
              الشركات
            </Typography>
            <img src={BurgerIcon} alt="burger icon" style={{ width: "18px" }} />
          </Stack>
        </NavLink>
      </Box>
      <Box
        sx={{
          cursor: "pointer",
          position: "absolute",
          bottom: "40px",
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          p={1}
          sx={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}
        >
          <Typography
            variant="h5"
            color="initial"
            ml={1}
            fontWeight="bold"
            sx={{ color: "#fff" }}
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
