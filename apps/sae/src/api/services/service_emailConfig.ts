import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import {CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";

;

const CONTROLLER = 'EmailConfig'

export interface MailParam {
    userName: string;
    EmailModule: number;
    Title: string;
    Body: string;
}

export const service_emailConfig = {

    sendEmail: (params: MailParam) => {
        return axiosInstance.post<CustomApiResponse<void>>(`${CONTROLLER}/SendEmail`, { params: params })
    },
}
