import { getUserRoles } from "./accessLocalStorage";

const filterRoles = (userRoles) => {
  let checkRoles = false;
  if (Array.isArray(getUserRoles()) && userRoles.length > 0) {
    checkRoles = getUserRoles().some((role) => userRoles.includes(role));
  } else if (typeof getUserRoles() === "string") {
    checkRoles = [getUserRoles()].some((role) => userRoles.includes(role));
  }
  return checkRoles;
};

export { filterRoles };
