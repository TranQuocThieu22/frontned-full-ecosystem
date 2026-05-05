import { ActivityPlan } from "@/interfaces/shared-interfaces/ActivityPlan";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = 'ActivityPlan'

interface IBody extends BaseEntity {
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
    ...createBaseApi<ActivityPlan>(`${CONTROLLER}`, baseAxios),

    getActivityPlans: () => {
        return baseAxios.get<CustomApiResponse<ActivityPlan[]>>(`${CONTROLLER}/GetActivityPlans`)
    },

    getFuturePlan: (body: IBody) => {
        return baseAxios.post<CustomApiResponse<ActivityPlan[]>>(`${CONTROLLER}/FuturePlan`, body)
    },

    getExternalFuturePlan: (body: IBody) => {
        return baseAxios.post<CustomApiResponse<ActivityPlan[]>>(`${CONTROLLER}/ExternalFuturePlan`, body)
    },

    getPlanActivityInit: (body: IBody) => {
        return baseAxios.post<CustomApiResponse<ActivityPlan>>(`${CONTROLLER}/PlanActivityInit`, body)
    },

    setCurrent: (activitiPlanId: number) => {
        return baseAxios.post<CustomApiResponse<ActivityPlan>>(`${CONTROLLER}/setCurrent?activitiPlanId=${activitiPlanId}`)
    },
    PlanSyncEventRequired: (activitiPlanId: number) => {
        return baseAxios.post<CustomApiResponse<ActivityPlan>>(`${CONTROLLER}/PlanSyncEventRequired?activitiPlanId=${activitiPlanId}`)
    },
    PlanReInit: (activitiPlanId: number) => {
        return baseAxios.post<CustomApiResponse<ActivityPlan>>(`${CONTROLLER}/PlanReInit?activitiPlanId=${activitiPlanId}`)
    },
}
