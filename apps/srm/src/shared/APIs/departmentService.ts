
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Department } from "@aq-fe/core-ui/shared/interfaces/Department";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/department"

export const departmentService = {
    ...createBaseApi<Department>(CONTROLLER, axiosInstance),
    getWorkingUnit: () => {
        return axiosInstance.get<CustomApiResponse<Department[]>>(
            CONTROLLER + `/GetWorkingUnit`
        );
    },
}

