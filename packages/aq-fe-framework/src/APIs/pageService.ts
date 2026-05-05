import { IPage } from "@/interfaces/IPage";
import { createBaseApi } from "@/shared/lib/createBaseApi";
import baseAxios from "../shared/config/baseAxios";

const CONTROLLER = "/Page"

export const pageService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<IPage>(CONTROLLER, baseAxios),
}
