import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

// Ví dụ tạo service
const CONTROLLER = "/COEClass"

export const service_COEClass = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<BaseEntity>(CONTROLLER, axiosInstance),
    findByGradeId: (params: {
        coeGradeId?: number
    }) => {
        return axiosInstance.get<CustomApiResponse<BaseEntity[]>>(CONTROLLER + "/FindByGradeId", { params })
    }
}

