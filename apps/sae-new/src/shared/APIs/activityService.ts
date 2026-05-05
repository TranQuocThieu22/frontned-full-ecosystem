/**
 * US-P-01: Xem danh sách hoạt động (Student Public View)
 *
 * API endpoints:
 *   GET  /api/activity/{tenantId}   — list activities with filter + paging
 *   POST /api/activity/{tenantId}/{id}/register — register for activity
 */

import axiosInstance from "../configs/axiosInstance";
import {
    ActivityApiItem,
    ActivityApiResults,
    ActivityFilterRequest,
    ApproveActivityScoreRequest,
    ApproveType,
    RegisterActivityRequest,
} from "../interfaces/ActivityStudent";
import { createBaseAPI } from "@aq-fe/aq-core-framework/shared/libs/createBaseAPI";
import { CustomAPIResponse } from "@aq-fe/aq-core-framework/shared/interfaces/CustomAPIResponse";
import { MAIN_TENANT_ID } from "../consts/data/mainTenantId";
import { useAuthenticateStore } from "@aq-fe/aq-core-framework/shared/stores/useAuthenticateStore";

const CONTROLLER = "/activity";
export const HARDCODED_STUDENT_ID = "00000000-0000-0000-0000-000000000003";

export const activityService = {
    ...createBaseAPI<ActivityApiResults>(CONTROLLER, axiosInstance),
    getActivities: (filter: ActivityFilterRequest = {}) => {
        const tenantId = useAuthenticateStore.getState().state.tenantId
        return axiosInstance.get<CustomAPIResponse<ActivityApiItem[]>>(
            `${CONTROLLER}/${tenantId}`,
            { params: filter }
        );
    },
    register: (activityId: string) => {
        const body: RegisterActivityRequest = {
            studentId: HARDCODED_STUDENT_ID,
        };
        const tenantId = useAuthenticateStore.getState().state.tenantId
        return axiosInstance.post(
            `${CONTROLLER}/${tenantId}/${activityId}/register`,
            body
        );
    },
    approveActivityScore: (activityId: string, studentId: string, action: ApproveType = ApproveType.Approve, rejectReason?: string) => {
        const body: ApproveActivityScoreRequest = {
            studentId,
            action,
            rejectReason,
        };
        const tenantId = useAuthenticateStore.getState().state.tenantId
        return axiosInstance.post(
            `${CONTROLLER}/${tenantId}/${activityId}/approve-activity-score`,
            body
        );
    },
    changeState: ({ id, state }: { id?: string, state?: number }) => {
        const tenantId = useAuthenticateStore.getState().state.tenantId
        return axiosInstance.put(
            `${CONTROLLER}/${tenantId}/${id}/change-state`,
            { state }
        )
    }
};
