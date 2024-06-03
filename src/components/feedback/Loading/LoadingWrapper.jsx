import { CircularProgress } from "@mui/material";
import React from "react";

const LoadingWrapper = ({ loading, error, children }) => {
  if (loading) {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
        {error}
      </div>
    );
  }

  return children;
};

export default LoadingWrapper;
