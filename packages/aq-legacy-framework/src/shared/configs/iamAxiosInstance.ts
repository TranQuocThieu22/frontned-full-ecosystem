import axios from "axios";
import { appConfig } from "@aq-fe/aq-core-framework/shared/configs/appConfig";

const iamAxiosInstance = axios.create({
    baseURL: appConfig.IAM_API_URL,
});

iamAxiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            try {
                const storeStr = localStorage.getItem("authenticate-store");
                if (storeStr) {
                    const storeObj = JSON.parse(storeStr);
                    console.log(storeObj);

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

export default iamAxiosInstance;
