import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { ClassActivityPlan } from "@/interfaces/classActivityPlan"
import { StudentActivityPlan } from "@/interfaces/StudentActivityPlan"
import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
const CONTROLLER = 'StudentActivityPlan'

interface Params extends BaseEntity {
    activityPlanId?: number,
    cols?: string,
}

export const service_studentActivityPlan = {
    ...createBaseApi<ClassActivityPlan>(`${CONTROLLER}`, axiosInstance),

    findbyActivityPlan: (params?: Params) => {
        return axiosInstance.get<CustomApiResponse<StudentActivityPlan[]>>(`${CONTROLLER}/findbyActivityPlan`, { params: params });
    }
}
