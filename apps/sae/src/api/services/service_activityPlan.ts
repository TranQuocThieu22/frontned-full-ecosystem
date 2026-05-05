import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { ActivityPlan } from "@/interfaces/activityPlan";
import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

const CONTROLLER = 'ActivityPlan'

interface Body extends BaseEntity {
    standardId?: number,
    host?: string,
    facultyId?: number,
    activityPlanId?: number,
    searchText?: string,
    isOrganization?: boolean;
    startDate?: string,
    endDate?: string,
    approvalStatus?: number;
    pageNumber?: number,
    pageSize?: number,
}

export const service_activityPlan = {
    ...createBaseApi<ActivityPlan>(`${CONTROLLER}`, axiosInstance),

    getActivityPlans: () => {
        return axiosInstance.get<CustomApiResponse<ActivityPlan[]>>(`${CONTROLLER}/GetActivityPlans`)
    },

    getFuturePlan: (body: Body) => {
        return axiosInstance.post<CustomApiResponse<ActivityPlan[]>>(`${CONTROLLER}/FuturePlan`, body)
    },

    getExternalFuturePlan: (body: Body) => {
        return axiosInstance.post<CustomApiResponse<ActivityPlan[]>>(`${CONTROLLER}/ExternalFuturePlan`, body)
    },

    getPlanActivityInit: (body: Body) => {
        return axiosInstance.post<CustomApiResponse<ActivityPlan>>(`${CONTROLLER}/PlanActivityInit`, body)
    },

    setCurrent: (activitiPlanId: number) => {
        return axiosInstance.post<CustomApiResponse<ActivityPlan>>(`${CONTROLLER}/setCurrent?activitiPlanId=${activitiPlanId}`)
    },
    PlanSyncEventRequired: (activitiPlanId: number) => {
        return axiosInstance.post<CustomApiResponse<ActivityPlan>>(`${CONTROLLER}/PlanSyncEventRequired?activitiPlanId=${activitiPlanId}`)
    },
    PlanReInit: (activitiPlanId: number) => {
        return axiosInstance.post<CustomApiResponse<ActivityPlan>>(`${CONTROLLER}/PlanReInit?activitiPlanId=${activitiPlanId}`)
    },
}
