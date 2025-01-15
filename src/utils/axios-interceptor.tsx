import axios from "axios";
import JsCookies from "js-cookie";
export const baseUrl = import.meta.env.VITE_APP_URL_BACKEND;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
let refreshTokePromise: Promise<unknown> | null = null;
let isRefreshingToken = false;
const callRefreshToken = async (): Promise<void> => {
  if (!isRefreshingToken) {
    isRefreshingToken = true;
    await axiosInstance.get<void, string>("/auth/refresh-token");
    isRefreshingToken = false;
  }
};
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken: string | undefined = JsCookies.get("accessToken");
    if (accessToken === undefined || accessToken.length === 0) {
      config.headers.Authorization = null;
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (res) => res.data,
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!refreshTokePromise) {
        refreshTokePromise = callRefreshToken();
      }
      try {
        await refreshTokePromise;
        refreshTokePromise = null;
        return axiosInstance(originalRequest);
      } catch (err) {
        refreshTokePromise = null;
        return Promise.reject(err);
      }
    }
    if (err.response.status === 403) {
      const accessToken = JsCookies.get("accessToken");
      if (accessToken) {
        // call logout function or handle accordingly
        err.response.message = "Vui lòng đăng nhập lại";
      }
      setTimeout(() => {
        window.location.href = "/auth/sign-in";
      }, 3000);
      err.response.message = "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại";
      return Promise.reject(err.response);
    }
    if (err.response) {
      return Promise.reject(err.response);
    }
    if (err.request) {
      return Promise.reject(err.request);
    }
    return Promise.reject(err.message);
  }
);