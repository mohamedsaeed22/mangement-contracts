import React from "react";
import Typography from "@mui/material/Typography";

const MyBtn = ({ icon, title, handleBtnClick, type, width, bgColor }) => {
  return (
    <button
      style={{
        backgroundColor: bgColor ? bgColor : "#475CA7",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        fontSize: "14px",
        outline: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        width: width,
      }}
      type={type}
      onClick={handleBtnClick}
    >
      <Typography
        variant="body1"
        sx={{ color: "#fff", fontSize: "14px", textAlign: "center" }}
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
            marginRight: "10px",
          }}
          alt="my-custom-btn"
        />
      )}
    </button>
  );
};

export default MyBtn;
