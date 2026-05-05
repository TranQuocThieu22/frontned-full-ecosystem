import { IAccount } from "aq-fe-framework/interfaces";
import { createBaseApi, MyApiResponse } from "aq-fe-framework/shared";
import baseAxios from "../config/baseAxios";

const CONTROLLER = "/Account"

export const service_account = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<IAccount>(CONTROLLER, baseAxios),

    // Các hàm custom 
    getStudentList: () => {
        return baseAxios.get<MyApiResponse<IAccount[]>>(CONTROLLER + `/GetStudentList`)
    },
    getAllLecturer: () => {
        return baseAxios.get<MyApiResponse<IAccount[]>>(CONTROLLER + `/GetAllLecturer`)
    },
}
