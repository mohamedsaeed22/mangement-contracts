import axios from "axios";
import {
  getAcessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../utils/accessLocalStorage";

const BASE_URL = "http://172.16.3.230:9433/";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 5000,
});

// Request middleware
api.interceptors.request.use(
  (config) => {
    const accessToken = getAcessToken();
    if (accessToken) {
      config.headers["x-access-token"] = accessToken;
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (res) => {
//     return res.data
//   },
//   async (err) => {
//     const originalConfig = err.config;
//     if (err.response) {
// if (err.response.status === 401 && !originalConfig._retry) {
//   originalConfig._retry = true;
//   try {
//     const rs = await refreshMyToken();
//     const { accessToken } = rs.data;
//     setAccessToken(accessToken);
//     // setRefreshToken(refreshToken);
//     api.defaults.headers.common["x-access-token"] = accessToken;

//     return api(originalConfig);
//   } catch (_error) {
//     if (_error.response && _error.response.data) {
//       return Promise.reject(_error.response.data);
//     }

//     return Promise.reject(_error);
//   }
// }

//       if (err.response.status === 403 && err.response.data) {
//         return Promise.reject(err.response.data);
//       }
//     }

//     return Promise.reject(err);
//   }
// );

// function refreshMyToken() {
//   return api.post(
//     `${BASE_URL}api/users/Identity/refresh-token?refreshToken=${getRefreshToken()}&accessToken=${getAcessToken()}`
//   );
// }

export { api };
