import { EmailConfig } from "@aq-fe/aq-legacy-framework/shared/interfaces/EmailConfig";
import { createBaseApi } from "@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi";
import axiosInstance from "@aq-fe/aq-legacy-framework/shared/configs/axiosInstance";

const CONTROLLER = "/EmailConfig"

export const emailConfigService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<EmailConfig>(CONTROLLER, axiosInstance),
}
