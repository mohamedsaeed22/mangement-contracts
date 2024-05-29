import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

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
  function (config) {
    const accessToken = Cookies.get("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response middleware
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error response status is 401 and the original request did not have the `isRetryRequest` flag, try to refresh the token
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If a refresh token request is already in progress, queue the original request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = Cookies.get("refreshToken");
      const token = Cookies.get("token");
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${BASE_URL}api/users/Identity/refresh-token?refreshToken=${refreshToken}&accessToken=${token}`
          )
          .then(({ data }) => {
            const { accessToken } = data;
            const sevenDaysFromNow = new Date();
            sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
            Cookies.set("token", accessToken, {
              expires: sevenDaysFromNow,
            });
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            processQueue(null, accessToken);
            resolve(api(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export { api };

/**
 * 
 * import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(`${BASE_URL}auth/refresh`, {
      refreshToken,
    });
    const {
      accessToken,
      refreshToken: newRefreshToken,
      expires,
    } = response.data;
    const decodedAccessToken = jwtDecode(accessToken);
    const accessTokenExpiration = new Date(decodedAccessToken.exp * 1000);

    // Set the new tokens and their expiration times in cookies
    Cookies.set("accessToken", accessToken, { expires: accessTokenExpiration });
    Cookies.set("refreshToken", newRefreshToken, {
      expires: new Date(expires),
    });

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh access token", error);
    return null;
  }
};

const BASE_URL = "http://172.16.3.230:9433/";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the access token to headers
api.interceptors.request.use(
  function (config) {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export { api };

 * 
 */
