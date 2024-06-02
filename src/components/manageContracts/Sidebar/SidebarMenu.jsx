import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import BurgerIcon from "../../../assets/icon/burgerMenu.svg";
import { NavLink } from "react-router-dom";

const SidebarMenu = ({
  menuTitle,
  toggleSubmenuFun,
  showSubmenu,
  subMenuList,
}) => {
  return (
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
          color: "#fff",
          // "&:hover": { color: "blue !important" },
        }}
        onClick={toggleSubmenuFun}
      >
        <Typography
          variant="h6"
          color="inherit"
          ml={1}
          fontWeight="bold"
          sx={{
            // color: "#fff",
            fontSize: "14px",
          }}
        >
          {menuTitle}
        </Typography>
        <img src={BurgerIcon} alt="burger icon" style={{ width: "18px" }} />
      </Stack>
      {showSubmenu &&
        subMenuList?.map((el) => (
          <Box pl={2} mt={1} key={el.id}>
            <NavLink
              to={el.nav ? `/${el.nav}` : `/branch/${el.id}`}
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
                  {el.name}
                </Typography>
              </Stack>
            </NavLink>
          </Box>
        ))}
    </Box>
  );
};

export default SidebarMenu;
