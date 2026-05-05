import { IDayOffRequest } from "@/interfaces/DayOffRequest";
import { createBaseApi, MyApiResponse } from "aq-fe-framework/shared";
import baseAxios from "../config/baseAxios";

const CONTROLLER = "/courseSection"

export const service_courseSection = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<IDayOffRequest>(CONTROLLER, baseAxios),

    // Các hàm custom 
    ScheduleDetail: ({ param = "" }: { param?: string }) => {
        return baseAxios.get<MyApiResponse<any>>(CONTROLLER + `/ScheduleDetail?${param}`)
    },
}
