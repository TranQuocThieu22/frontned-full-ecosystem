import { IEmailConfig } from "@/interfaces";
import { createBaseApi } from "@/shared/lib/createBaseApi";
import baseAxios from "../shared/config/baseAxios";

const CONTROLLER = "/EmailConfig"

export const emailConfigService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<IEmailConfig>(CONTROLLER, baseAxios),
}
