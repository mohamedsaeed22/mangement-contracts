import Cookies from "js-cookie";

const getAcessToken = () => {
  return Cookies.get("token");
};

const setAccessToken = (accessToken) => {
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
  Cookies.set("token", accessToken, {
    expires: sevenDaysFromNow,
  });
};
const getRefreshToken = () => {
  return Cookies.get("refreshToken");
};
const setRefreshToken = (refreshToken) => {
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
  Cookies.set("refreshToken", refreshToken, {
    expires: sevenDaysFromNow,
  });
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
