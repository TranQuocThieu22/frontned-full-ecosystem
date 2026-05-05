import { IDayOffRequest } from "@/interfaces/DayOffRequest";
import { createBaseApi } from "aq-fe-framework/shared";
import baseAxios from "../config/baseAxios";

const CONTROLLER = "/course"

export const service_course = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<IDayOffRequest>(CONTROLLER, baseAxios),

    // Các hàm custom 

}
