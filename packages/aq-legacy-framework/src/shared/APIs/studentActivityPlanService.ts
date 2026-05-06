import { createBaseApi } from "@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi";
import axiosInstance from "@aq-fe/aq-legacy-framework/shared/configs/axiosInstance";
import { StudentActivityPlan } from "@aq-fe/aq-legacy-framework/shared/interfaces/StudentActivityPlan";

const CONTROLLER = "/StudentActivityPlan"

export const studentActivityPlanService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<StudentActivityPlan>(CONTROLLER, axiosInstance),
}
