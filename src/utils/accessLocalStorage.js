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

export {
  getAcessToken,
  setAccessToken,
  getRefreshToken,
  removeAllCookies,
  setRefreshToken,
};
