import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const getAcessToken = () => {
  return Cookies.get("token") ? Cookies.get("token") : "";
};

const setAccessToken = (accessToken, exp) => {
  Cookies.set("token", accessToken, { expires: new Date(exp) });
};

const getRefreshToken = () => {
  return Cookies.get("refreshToken") ? Cookies.get("refreshToken") : "";
};
const setRefreshToken = (refreshToken, exp) => {
  Cookies.set("refreshToken", refreshToken, { expires: new Date(exp) });
};

const removeAllCookies = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
};
const getUserRoles = () => {
  if (!getAcessToken()) {
    return ["SuperAdmin"];
  }
  const decoded = jwtDecode(getAcessToken());
  if (decoded) {
    return decoded[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];
  } else {
    return null;
  }
};
export {
  getAcessToken,
  setAccessToken,
  getRefreshToken,
  getUserRoles,
  removeAllCookies,
  setRefreshToken,
};
