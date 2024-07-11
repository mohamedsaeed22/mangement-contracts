import React from "react";
import Typography from "@mui/material/Typography";

const MyIcon = ({ icon, title, handleBtnClick, type, width, bgColor }) => {
  return (
    <button
      style={{
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        fontSize: "14px",
        outline: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        width: width,
        backgroundColor: "transparent",
      }}
      type={type}
      onClick={handleBtnClick}
    >
      <Typography
        variant="body1"
        sx={{ fontSize: "14px", textAlign: "center" }}
        alignSelf="flex-start"
      >
        {title}
      </Typography>
      {icon && (
        <img
          src={icon}
          style={{
            display: "inline-block",
            width: "20px",
          }}
          alt="my-custom-btn"
        />
      )}
    </button>
  );
};

export default MyIcon;
