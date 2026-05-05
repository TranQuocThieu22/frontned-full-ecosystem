import { EmailConfig } from "@aq-fe/core-ui/shared/interfaces/EmailConfig";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import axiosInstance from "../configs/axiosInstance";

const CONTROLLER = "/EmailConfig"

export const emailConfigService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<EmailConfig>(CONTROLLER, axiosInstance),
}
