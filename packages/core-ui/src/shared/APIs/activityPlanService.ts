import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import axiosInstance from "../configs/axiosInstance";
import { ActivityPlan } from "../interfaces/ActivityPlan";

const CONTROLLER = "/ActivityPlan"

export const activityPlanService = {
    ...createBaseApi<ActivityPlan>(CONTROLLER, axiosInstance),
    activityPlanOnlyGetAll: () => {
        return axiosInstance.get(`${CONTROLLER}/ActivityPlanOnlyGetAll`)
    }
}
