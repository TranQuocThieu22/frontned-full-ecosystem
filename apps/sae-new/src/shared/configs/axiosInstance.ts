import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_URL || "http://192.168.1.159:83/be/api",
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://hst.aqtech.io.vn/sae-dev/api",
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            try {
                const storeStr = localStorage.getItem("authenticate-store");
                if (storeStr) {
                    const storeObj = JSON.parse(storeStr);
                    const token = storeObj?.state?.state?.token;
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                }
            } catch (error) {
                console.error("Failed to parse authenticate-store from localStorage", error);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
