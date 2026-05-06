import axios from "axios";
import { appConfig } from "@aq-fe/aq-core-framework/shared/configs/appConfig";

export const authService = {
    login: (values: { username?: string, password?: string }) => {
        return axios.post<LoginResponse>(
            `${appConfig.IAM_API_URL}/auth/login`,
            values,
            { headers: { "X-tenant": "CNTN" } }
        );
    },
}

interface LoginResponse {
    status: number;
    message: string;
    results: {
        tenantId?: string
        tokenType: "Bearer";
        accessToken: string;
        expiresIn: number;
        refreshToken: string;
        refreshExpiresIn: number;
        idToken: string;
    }
}
