const Loading = ({ status, error, children }) => {
  if (status === true) {
    return "loading components";
  }
  if (error) {
    return <span>{error}</span>;
  }
  return <>{children}</>;
};

export default Loading;
