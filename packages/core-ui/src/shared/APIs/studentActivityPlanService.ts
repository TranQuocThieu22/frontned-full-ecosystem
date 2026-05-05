import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import axiosInstance from "../configs/axiosInstance";
import { StudentActivityPlan } from "../interfaces/StudentActivityPlan";

const CONTROLLER = "/StudentActivityPlan"

export const studentActivityPlanService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<StudentActivityPlan>(CONTROLLER, axiosInstance),
}
