import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

const CONTROLLER = "/Account"

export const service_Account = {
    getAllModule: (params?: { pageSize?: number, pageNumber?: number }) => {
        return axiosInstance.get<CustomApiResponse<Account[]>>(`${CONTROLLER}/GetAllModule`, { params: params });
    },
    getAllLecturer: () => {
        return axiosInstance.get<CustomApiResponse<Account[]>>(`${CONTROLLER}/GetAllLecturer`);
    },
}
