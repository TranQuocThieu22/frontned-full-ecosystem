import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "", //  server
  // baseURL: process.env.NEXT_PUBLIC_API_LOCAL, // local debug
});

// Thêm Interceptor để set token từ localStorage vào header Authorization
axiosInstance.interceptors.request.use(
  (config) => {
    const tokenData = localStorage.getItem("useAuthenticateStore" + process.env.NEXT_PUBLIC_AQMODULE);
    const state = JSON.parse(tokenData!);
    const token = state?.state?.state?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // thêm token vào header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

