import { COECourseSection } from "@/interfaces/shared-interfaces/COECourseSection";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/COECourseSection"

export const COECourseSectionService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<COECourseSection>(CONTROLLER, baseAxios),

    getCOECourseSectionByCOEGrade: (params: {
        COEGradeId?: number
    }) => {
        return baseAxios.get<CustomApiResponse<COECourseSection[]>>(CONTROLLER + "/GetCOECourseSectionByCOEGrade", { params })
    },

    getCOECourseSectionBySplitPoint: (params: {
        COEGradeId?: number,
        formulaType?: number
    }) => {
        return baseAxios.get<CustomApiResponse<COECourseSection[]>>(CONTROLLER + "/GetCOECourseSectionBySplitPoint", { params })
    },

    findByActivityPlanId: (params: {
        activityPlanId?: number
    }) => {
        return baseAxios.get<CustomApiResponse<COECourseSection[]>>(CONTROLLER + "/FindByActivityPlanId", { params })
    },

    import: (body: COECourseSectionImport[]) => {
        return baseAxios.post<CustomApiResponse<COECourseSection[]>>(CONTROLLER + "/Import", body)
    },
}

interface COECourseSectionImport {
    activityPlanId?: number
    code?: string,
    subjectCode?: string,
    classCodes?: string[],
    pointRecordUserCode?: string
}