import { Navigate } from "react-router-dom";
import { filterRoles } from "../../../utils/filterRoles";

const RoleGuard = ({ roles, children }) => {

  const hasRequiredRole = filterRoles(roles);

  return hasRequiredRole ? children : <Navigate to="/projectsbox" />;
};

export default RoleGuard;
