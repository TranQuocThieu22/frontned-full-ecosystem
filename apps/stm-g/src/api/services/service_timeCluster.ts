import { ITimeCluster } from "@/interfaces/timeCluster";
import { createBaseApi } from "aq-fe-framework/shared";
import baseAxios from "../config/baseAxios";

const CONTROLLER = "/TimeCluster"

export const service_timeCluster = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<ITimeCluster>(CONTROLLER, baseAxios),
}
