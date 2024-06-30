import axios from "axios";
import {
  getAcessToken,
  getRefreshToken,
  removeAllCookies,
  setAccessToken,
} from "../utils/accessLocalStorage";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const BASE_URL = "http://172.16.3.230:9433/";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
    // const originalConfig = err.config;
    if (err.response) {
      // Handle 401 Unauthorized responses
      if (err.response && err.response.status === 401) {
        if (getAcessToken() || getRefreshToken()) {
          MySwal.fire({
            title: "انتهت صلاحيه الجلسة ,الرجاء اعاده تسجيل الدخول",
            icon: "warning",
            allowOutsideClick: false,
            confirmButtonText: "موافق",
          }).then((result) => {
            if (result.isConfirmed) {
              removeAllCookies();
              window.location.reload();
            }
          });
        }

        // You can also handle refresh token logic here if needed
        // Example:
        /*
        try {
          const rs = await refreshMyToken();
          const { accessToken, expires } = rs;
          setAccessToken(accessToken, expires);
          api.defaults.headers.common["x-access-token"] = accessToken;
          api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          if (refreshError.response && refreshError.response.data) {
            return Promise.reject(refreshError.response.data);
          }
          return Promise.reject(refreshError);
        }
        */
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

// async function refreshMyToken() {
//   if (getAcessToken() && getRefreshToken()) {
//     const res = await api.post(
//       `${BASE_URL}api/users/Identity/refresh-token?refreshToken=${getRefreshToken()}&accessToken=${getAcessToken()}`
//     );
//     setAccessToken(res.accessToken);
//   }
// }
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImIzN2I2ZjRmLWMxMzUtNDZmNi1hMjhjLWZjYzQ0NGU5NjBjYiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJtb2hhbWVkIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoibW9oYW1lZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJEZWZhdWx0VXNlckJyYW5jaCIsIlN1cGVyQWRtaW4iXSwiZXhwIjoxNzE3OTM5MDY5LCJpc3MiOiJQcm9qZWN0cyBNYW5hZ2VtZW50IiwiYXVkIjoiRnV0dXJlIE9mIEVneXB0IFVzZXJzIn0.Pcat0_ECQ6ynVajrtUESvp67cmxJ8pxOukDUF6GVfhk'

export { api };
