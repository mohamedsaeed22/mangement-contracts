import { CircularProgress } from "@mui/material";

const Loading = ({ status, error, children }) => {
  if (status === true) {
    return <CircularProgress color="success" />;
  }
  if (error) {
    return <span>{error}</span>;
  }
  return <>{children}</>;
};

export default Loading;
