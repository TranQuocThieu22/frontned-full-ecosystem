import { ClassActivityPlan } from "@/interfaces/shared-interfaces/ClassActivityPlan";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse, PagingParams } from "@aq-fe/core-ui/shared/libs/createBaseApi";

interface FindByLecturerAPIProps {
    activityPlanId?: number,
    paging?: PagingParams;
    cols?: string[];
}

interface GetByActivityPlanAPIProps {
    activityPlanId?: number,
    paging?: PagingParams;
}

const CONTROLLER = "/ClassActivityPlan"

export const ClassActivityPlanService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<ClassActivityPlan>(CONTROLLER, baseAxios),

    findByLecturer: (params: FindByLecturerAPIProps) => {
        return baseAxios.get<CustomApiResponse<ClassActivityPlan[]>>(CONTROLLER + "/FindbyLecturer", { params })
    },

    findBySubLecturer: () => {
        return baseAxios.get<CustomApiResponse<ClassActivityPlan[]>>(CONTROLLER + "/FindbySubLecturer")
    },

    getByActivityPlan: (params: GetByActivityPlanAPIProps) => {
        return baseAxios.get<CustomApiResponse<ClassActivityPlan[]>>(CONTROLLER + "/GetByActivityPlan", { params })
    },
}

