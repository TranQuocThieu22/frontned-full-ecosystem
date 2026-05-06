import { Page } from "@aq-fe/aq-legacy-framework/shared/interfaces/Page";
import { createBaseApi } from "@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi";
import axiosInstance from "@aq-fe/aq-legacy-framework/shared/configs/axiosInstance";

const CONTROLLER = "/Page"

export const pageService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<Page>(CONTROLLER, axiosInstance),
}
