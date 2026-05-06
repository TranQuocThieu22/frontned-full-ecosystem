import { createBaseApi } from "@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi";
import axiosInstance from "@aq-fe/aq-legacy-framework/shared/configs/axiosInstance";
import { ActivityPlan } from "@aq-fe/aq-legacy-framework/shared/interfaces/ActivityPlan";

const CONTROLLER = "/ActivityPlan"

export const activityPlanService = {
    ...createBaseApi<ActivityPlan>(CONTROLLER, axiosInstance),
    activityPlanOnlyGetAll: () => {
        return axiosInstance.get(`${CONTROLLER}/ActivityPlanOnlyGetAll`)
    }
}
