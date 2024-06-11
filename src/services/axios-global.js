import axios from "axios";
import {
  getAcessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../utils/accessLocalStorage";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://172.16.3.230:9433/";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 5000,
});
const myExpTime = getAcessToken() && jwtDecode(getAcessToken())?.exp;

const currentTime = Math.floor(Date.now() / 1000);
const remainingTime = myExpTime - 100;

if (Date.now() === Date.now()+10) {
  // refreshMyToken();
  console.log("hello world")
}
console.log(Date.now());
// setInterval(refreshMyToken, 20 * 60 * 1000);

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
    return res.data;
  },
  async (err) => {
    const originalConfig = err.config;
    //
    if (err.response) {
      // if (err.response.status === 401 && !originalConfig._retry) {
      //   originalConfig._retry = true;
      //   try {
      //     const rs = await refreshMyToken();
      //
      //     const { accessToken } = rs;
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
      // if (err.response.status === 403 && err.response.data) {
      //   return Promise.reject(err.response.data);
      // }
    }

    return Promise.reject(err);
  }
);

async function refreshMyToken() {
  const res = await api.post(
    `${BASE_URL}api/users/Identity/refresh-token?refreshToken=${getRefreshToken()}&accessToken=${getAcessToken()}`
  );

  setAccessToken(res.data.accessToken);
}
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImIzN2I2ZjRmLWMxMzUtNDZmNi1hMjhjLWZjYzQ0NGU5NjBjYiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJtb2hhbWVkIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoibW9oYW1lZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJEZWZhdWx0VXNlckJyYW5jaCIsIlN1cGVyQWRtaW4iXSwiZXhwIjoxNzE3OTM5MDY5LCJpc3MiOiJQcm9qZWN0cyBNYW5hZ2VtZW50IiwiYXVkIjoiRnV0dXJlIE9mIEVneXB0IFVzZXJzIn0.Pcat0_ECQ6ynVajrtUESvp67cmxJ8pxOukDUF6GVfhk'

export { api };
