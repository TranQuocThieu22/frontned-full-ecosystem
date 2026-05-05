import { COEPI, COEPIImport } from "@/interfaces/shared-interfaces/COEPI";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/COEPI"

export const service_COEPI = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<COEPI>(CONTROLLER, axiosInstance),
    getSubjectByGradeId: ({ coeGradeId, cols }: { coeGradeId?: number | string, cols?: any }) => {
        return axiosInstance.get<CustomApiResponse<COEPI[]>>(CONTROLLER + "/GetSubjectByGradeId", {
            params: {
                coeGradeId: coeGradeId,
                cols: cols
            },
        })
    },
    /** Hàm import thủ công bằng mã (không xài createlist) */
    importPIByCode: (body: COEPIImport[]) => {
        return axiosInstance.post<CustomApiResponse<COEPI[]>>(CONTROLLER + "/Import", body)
    },
}

