import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { DashboardInfo, EventByStandardDashboard, EventDeployDashboard, StudentRankingByFacultyDashboard } from "@/interfaces/dashboardInfo"
import {CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = 'Dashboard'

export const service_dashboard = {

    getGeneralInfo: (params?: { activityPlanId?: number }) => {
        return axiosInstance.get<CustomApiResponse<DashboardInfo>>(`${CONTROLLER}/GetGeneralInfo`, {
            params: params
        })
    },

    eventByStandardCount: (params?: { activityPlanId?: number }) => {
        return axiosInstance.get<CustomApiResponse<EventByStandardDashboard[]>>(`${CONTROLLER}/EventByStandardCount`, {
            params: params
        })
    },

    getRegistrationAndParticipationPoint: (params?: { activityPlanId?: number }) => {
        return axiosInstance.get<CustomApiResponse<DashboardInfo>>(`${CONTROLLER}/GetRegistrationAndParticipationPoint`, {
            params: params
        })
    },

    studentRankingFacultyCount: (params?: { activityPlanId?: number, rankingName?: string }) => {
        return axiosInstance.get<CustomApiResponse<StudentRankingByFacultyDashboard[]>>(`${CONTROLLER}/StudentRankingFacultyCount`, {
            params: params
        })
    },

    getTopMostAndTopLeastRegisteredEvent: (params?: { activityPlanId?: number, quantity?: number }) => {
        return axiosInstance.get<CustomApiResponse<DashboardInfo>>(`${CONTROLLER}/GetTopMostAndTopLeastRegisteredEvent`, {
            params: params
        })
    },

    eventDeploymentTracking: (params?: { activityPlanId?: number }) => {
        return axiosInstance.get<CustomApiResponse<EventDeployDashboard[]>>(`${CONTROLLER}/EventDeploymentTracking`, {
            params: params
        })
    },
}
