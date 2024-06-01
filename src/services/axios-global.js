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

api.interceptors.response.use(
  (res) => {
    return res;
  },
  // async (err) => {
  //   const originalConfig = err.config;
  //   if (err.response) {
  //     // console.log(err.response);
  //     // Access Token was expired
  //     if (err.response.status === 401 && !originalConfig._retry) {
  //       originalConfig._retry = true;
  //       try {
  //         const rs = await refreshMyToken();
  //         const { accessToken, refreshToken } = rs.data;
  //         setAccessToken(accessToken);
  //         setRefreshToken(refreshToken)
  //         api.defaults.headers.common["x-access-token"] = accessToken;

  //         return api(originalConfig);
  //       } catch (_error) {
  //         if (_error.response && _error.response.data) {
  //           return Promise.reject(_error.response.data);
  //         }

  //         return Promise.reject(_error);
  //       }
  //     }

  //     if (err.response.status === 403 && err.response.data) {
  //       return Promise.reject(err.response.data);
  //     }
  //   }

  //   return Promise.reject(err);
  // }
);

function refreshMyToken() {
  return api.post(
    `${BASE_URL}api/users/Identity/refresh-token?refreshToken=${getRefreshToken()}&accessToken=${getAcessToken()}`
  );
}

export { api };

// Response middleware
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If the error response status is 401 and the original request did not have the `isRetryRequest` flag, try to refresh the token
//     if (error.response.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         // If a refresh token request is already in progress, queue the original request
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return api(originalRequest);
//           })
//           .catch((err) => {
//             return Promise.reject(err);
//           });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       const refreshToken = getRefreshToken();
//       const token = getAcessToken();
//       return new Promise((resolve, reject) => {
//         axios
//           .post(
//             `${BASE_URL}api/users/Identity/refresh-token?refreshToken=${refreshToken}&accessToken=${token}`
//           )
//           .then(({ data }) => {
//             const { accessToken } = data;
//             const sevenDaysFromNow = new Date();
//             sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
//             Cookies.set("token", accessToken, {
//               expires: sevenDaysFromNow,
//             });
//             api.defaults.headers.common[
//               "Authorization"
//             ] = `Bearer ${accessToken}`;
//             originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//             processQueue(null, accessToken);
//             resolve(api(originalRequest));
//           })
//           .catch((err) => {
//             processQueue(err, null);
//             reject(err);
//           })
//           .finally(() => {
//             isRefreshing = false;
//           });
//       });
//     }

//     return Promise.reject(error);
//   }
// );
