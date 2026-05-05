import { IDayOffRequest } from "@/interfaces/DayOffRequest";
import { createBaseApi, MyApiResponse } from "aq-fe-framework/shared";
import baseAxios from "../config/baseAxios";

const CONTROLLER = "/DayOffRequest"

export const service_dayOffRequest = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<IDayOffRequest>(CONTROLLER, baseAxios),

    // Các hàm custom 
    LecturerRequest: ({ param = "" }: { param?: string }) => {
        return baseAxios.get<MyApiResponse<IDayOffRequest[]>>(CONTROLLER + `/LecturerRequest?${param}`)
    },
}
