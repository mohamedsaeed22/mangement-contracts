import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import BurgerIcon from "../../../assets/icon/burgerMenu.svg";
import { NavLink } from "react-router-dom";

const SidebarMenu = ({
  menuTitle,
  toggleSubmenuFun,
  showSubmenu,
  subMenuList,
  navLink,
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
      {showSubmenu && (
        <Box
          pl={2}
          // mt={1}
          sx={{
            direction: "rtl",
            maxHeight: "150px", // Set your desired max height here
            overflowY: "auto", // Enable vertical scrolling if content overflows
            "&::-webkit-scrollbar": {
              width: "4px", // Set the width of the scrollbar thumb
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ccc", // Set the color of the scrollbar thumb
              borderRadius: "4px", // Set border-radius to make it look rounded
            },
          }}
        >
          {subMenuList?.map((el) => (
            <NavLink
              to={el.nav ? `/${el.nav}` : `/${navLink}/${el.id}`}
              className={({ isActive }) =>
                `navlink ${isActive ? "active-link" : ""}`
              }
              key={el.id}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                p="4px 2px"
                mt={1}
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
                  sx={{
                    color: "inherit",
                    fontSize: "12px",
                    // borderBottom: "1px solid #ccc",
                  }}
                >
                  {el.name}
                </Typography>
              </Stack>
            </NavLink>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SidebarMenu;
