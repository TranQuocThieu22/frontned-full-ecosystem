import { COEPLO } from "@/interfaces/shared-interfaces/COEPLO";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/COEPLO"

export const service_COEPLO = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<COEPLO>(CONTROLLER, axiosInstance),
    getCOEPLOByGrade: ({ coeGradeId }: { coeGradeId?: number | string }) => {
        return axiosInstance.get<CustomApiResponse<COEPLO[]>>(CONTROLLER + "/GetCOEPLOByGrade", {
            params: {
                coeGradeId: coeGradeId
            }
        })
    }
}

