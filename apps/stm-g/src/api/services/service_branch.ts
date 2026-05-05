import { IBranch } from "@/interfaces/branch";
import { createBaseApi } from "aq-fe-framework/shared";
import baseAxios from "../config/baseAxios";

const CONTROLLER = "/Branch"

export const service_branch = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<IBranch>(CONTROLLER, baseAxios),
}
