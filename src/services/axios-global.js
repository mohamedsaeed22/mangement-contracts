import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://172.16.3.230:9433/";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// request middleware
api.interceptors.request.use(
  function (config) {
    const accessToken = Cookies.get("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  {
    function(error) {
      return Promise.reject(error);
    },
  }
);

// response middleware
api.interceptors.request.use(
  function (config) {
    const accessToken = Cookies.get("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // <--- Correct syntax
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
