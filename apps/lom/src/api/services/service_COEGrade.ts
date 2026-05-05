import { IGradeSubjectInfoViewModel } from "@/features/admin/Curriculum&Subject/ModuleGradeSubject/ConfigAMRI/Interfaces/Interfaces";
import { COEGrade } from "@/interfaces/shared-interfaces/COEGrade";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/COEGrade"

export const service_COEGrade = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<COEGrade>(CONTROLLER, baseAxios),

    getGradeByProgram: (params: { COEProgramId?: number }) => {
        return baseAxios.get<CustomApiResponse<COEGrade[]>>(CONTROLLER + "/GetGradeByProgram", { params })
    },

    getDetail: (params: { gradeId?: number }) => {
        return baseAxios.get<CustomApiResponse<IGradeSubjectInfoViewModel[]>>(CONTROLLER + "/GetDetail", { params })
    },

    importIRM: (body: ImportIRMToGradeBody[]) => {
        return baseAxios.post(CONTROLLER + "/ImportIRM", body)
    },

    removeIRM: (gradeIds?: number[]) => {
        return baseAxios.post(CONTROLLER + "/RemoveIRM", gradeIds)
    }
}


export interface ImportIRMToGradeBody {
    gradeCode?: string,
    irmCode?: string,
    id?: number
}