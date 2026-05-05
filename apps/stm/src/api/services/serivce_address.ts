import { IAddress } from "@/modules-features/admin/ModuleCourseSectionSchedule/CheckAttendance/interface";
import { createBaseApi } from "aq-fe-framework/shared";
import baseAxios from "../config/baseAxios";

const CONTROLLER = "/Address"

export const service_address = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<IAddress>(CONTROLLER, baseAxios),
}
