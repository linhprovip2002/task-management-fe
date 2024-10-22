import axios from "axios";
import Cookies from "js-cookie";
import { refreshAccessToken } from "./refreshToken";

const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});

let isRefreshing = false; // Cờ để kiểm tra xem đã redirect hay chưa

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = Cookies.get("authToken") || "";
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete request.defaults.headers.common["Authorization"];
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();

      if (newAccessToken !== null) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } else {
        // Đảm bảo chỉ redirect đến login một lần duy nhất
        if (!isRefreshing) {
          isRefreshing = true;
          Cookies.remove("authToken");
          Cookies.remove("refreshToken");

          // Chỉ redirect một lần
          window.location.replace("/login");
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export const setHeaderConfigAxios = (token) => {
  if (token) {
    request.defaults.headers.common["Authorization"] = token ? "Bearer " + token : "";
  } else {
    delete request.defaults.headers.common["Authorization"];
  }
};

export default request;
