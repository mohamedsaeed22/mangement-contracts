import React from "react";
import Typography from "@mui/material/Typography";

const MyBtn = ({ icon, title, handleBtnClick, type }) => {
  return (
    <button
      style={{
        backgroundColor: "#475CA7",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        fontSize: "14px",
        outline: "none",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
      type={type}
      onClick={handleBtnClick}
    >
      <Typography
        variant="body1"
        sx={{ color: "#fff", fontSize: "14px" }}
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
