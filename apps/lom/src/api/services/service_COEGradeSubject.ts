import { COEGradeSubject, COEGradeSubjectImport } from "@/interfaces/shared-interfaces/COEGradeSubject";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/COEGradeSubject"

export const service_COEGradeSubject = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<COEGradeSubject>(CONTROLLER, baseAxios),

    getSubjectByGrade: (params: { COEGradeId?: number, cols?: string }) => {
        return baseAxios.get<CustomApiResponse<COEGradeSubject[]>>(CONTROLLER + "/GetSubjectByGrade", { params })
    },

    getSubjectByCore: (params: { COEGradeId?: number, cols?: string, isCore?: boolean }) => {
        return baseAxios.get<CustomApiResponse<COEGradeSubject[]>>(CONTROLLER + "/GetSubjectByGrade", { params })
    },

    importGradeSubjectByCode: (body: COEGradeSubjectImport[], param: { COEGradeId?: number }) => {
        return baseAxios.post<CustomApiResponse<COEGradeSubject[]>>(CONTROLLER + "/ImportUnit", body, { params: param })
    },
    
    removeGradeSubjectUnit: (body: number[]) => {
        return baseAxios.post<CustomApiResponse<COEGradeSubject[]>>(CONTROLLER + "/RemoveUnit", body)
    },
}
