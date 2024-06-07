import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const getAcessToken = () => {
  return Cookies.get("token");
};

const setAccessToken = (accessToken) => {
  const decodedToken = jwtDecode(accessToken);
  const expirationTime = new Date(decodedToken.exp * 1000);
  Cookies.set("token", accessToken, { expires: expirationTime });
};

const getRefreshToken = () => {
  return Cookies.get("refreshToken");
};
const setRefreshToken = (refreshToken) => {
  const decodedToken = jwtDecode(refreshToken);
  const expirationTime = new Date(decodedToken.exp * 1000);
  Cookies.set("refreshToken", refreshToken, { expires: expirationTime });
};

const removeAllCookies = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
};
const getUserRoles = () => {
  return [
    // "Admin",
    "ProjectManagement.ReadOnly",
    // "DefaultUserBranch",
    // "SuperAdmin",
  ];
  // if (!getAcessToken()) {
  //   return null;
  // }
  // const decoded = jwtDecode(getAcessToken());
  // if (decoded) {
  //   return decoded[
  //     "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  //   ];
  // } else {
  //   return null;
  // }
};
export {
  getAcessToken,
  setAccessToken,
  getRefreshToken,
  getUserRoles,
  removeAllCookies,
  setRefreshToken,
};
