import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { ClassActivityPlan, ClassSubjectLecturer } from "@/interfaces/classActivityPlan";
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = 'ClassActivityPlan'

interface Params extends BaseEntity {
    activityPlanId?: number,
    cols?: string
}

export const service_classActivityPlan = {
    ...createBaseApi<ClassActivityPlan>(`${CONTROLLER}`, axiosInstance),

    getByActivityPlan: (params: Params) => {
        return axiosInstance.get<CustomApiResponse<ClassActivityPlan[]>>(`${CONTROLLER}/getByActivityPlan`, {
            params: params
        })
    },

    findByLecturer: (params: Params) => {
        return axiosInstance.get<CustomApiResponse<ClassActivityPlan[]>>(`${CONTROLLER}/findByLecturer`, {
            params: params
        })
    },

    findBySubLecturer: (params: Params) => {
        return axiosInstance.get<CustomApiResponse<ClassSubjectLecturer[]>>(`${CONTROLLER}/findBySubLecturer`, {
            params: {
                ...params
            }
        })
    },
}
