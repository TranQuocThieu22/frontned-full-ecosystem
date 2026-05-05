import { Class } from "@/interfaces/shared-interfaces/Class";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/Class"

export const ClassService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<Class>(CONTROLLER, baseAxios),

    findByGradeId: (params: {
        coeGradeId?: number
    }) => {
        return baseAxios.get<CustomApiResponse<Class[]>>(CONTROLLER + "/FindByGradeId", { params })
    },

    findByActivityPlanId: (params: {
        activityPlanId?: number
        pageSize?: number,
        pageNumber?: number,
    }) => {
        return baseAxios.get<CustomApiResponse<Class[]>>(CONTROLLER + "/FindByActivityPlanId", { params })
    },

    findByGradeAndActivityPlanId: (params: {
        coeGradeId?: number
        activityPlanId?: number
        cols?: string
    }) => {
        return baseAxios.get<CustomApiResponse<Class[]>>(CONTROLLER + "/FindByGradeAndActivityPlanId", { params })
    },

    import: (body: ClassImportProps[]) => {
        return baseAxios.post<CustomApiResponse<Class[]>>(CONTROLLER + "/Import", body)
    },
}

interface ClassImportProps {
    code?: string,
    name?: string,
    egName?: string,
    gradeCode?: string,
    note?: string
}