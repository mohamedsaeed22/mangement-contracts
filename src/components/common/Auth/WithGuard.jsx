import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const WithGuard = ({ children }) => {
  const { accessToken } = useSelector((state) => state.auth);
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  return children ? children : <Outlet />;
};

export default WithGuard;

/**
 * 
 * import { useAppSelector } from "@store/hooks";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAppSelector((state) => state.auth);

  if (!accessToken) {
    return <Navigate to="/login?message=login_required" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
 */
