import { ITimeClusterDetails } from "@/interfaces/timeClusterDetails";
import { createBaseApi } from "aq-fe-framework/shared";
import baseAxios from "../config/baseAxios";

const CONTROLLER = "/TimeType"

export const service_timeTypeDetail = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<ITimeClusterDetails>(CONTROLLER, baseAxios),
}
