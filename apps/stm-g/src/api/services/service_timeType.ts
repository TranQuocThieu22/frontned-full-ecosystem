import { ITimeType } from "@/interfaces/timeType";
import { createBaseApi } from "aq-fe-framework/shared";
import baseAxios from "../config/baseAxios";

const CONTROLLER = "/TimeType"

export const service_timeType = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<ITimeType>(CONTROLLER, baseAxios),
}
