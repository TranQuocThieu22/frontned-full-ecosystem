import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { Account } from "@/shared/interfaces/account";

const CONTROLLER = "/Account";

export const accountService = {
    ...createBaseApi<Account>(CONTROLLER, axiosInstance),

    getStudentList: () =>
        axiosInstance.get<CustomApiResponse<Account[]>>(CONTROLLER + "/GetStudentList"),
    getAllLecturer: () =>
        axiosInstance.get<CustomApiResponse<Account[]>>(CONTROLLER + "/GetAllLecturer"),
};
