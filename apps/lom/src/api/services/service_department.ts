import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Department } from "@aq-fe/core-ui/shared/interfaces/Department";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/Department"

export const service_Department = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<Department>(CONTROLLER, axiosInstance),
    findbyType: ({ type }: { type?: number }) => {
        return axiosInstance.get<CustomApiResponse<Department[]>>(CONTROLLER + "/FindbyType", {
            params: {
                type: type
            }
        })
    }
}
