import { ClassActivityPlan } from "@/interfaces/shared-interfaces/ClassActivityPlan";
import { StudentActivityPlan } from "@/interfaces/shared-interfaces/StudentActivityPlan";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = 'StudentActivityPlan'

interface IParams extends BaseEntity {
    activityPlanId?: number,
    cols?: string,
}

export const service_studentActivityPlan = {
    ...createBaseApi<ClassActivityPlan>(`${CONTROLLER}`, baseAxios),

    findbyActivityPlan: (params?: IParams) => {
        return baseAxios.get<CustomApiResponse<StudentActivityPlan[]>>(`${CONTROLLER}/findbyActivityPlan`, { params: params });
    }
}
