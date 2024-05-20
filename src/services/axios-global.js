import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://172.16.1.183:1010/";

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
