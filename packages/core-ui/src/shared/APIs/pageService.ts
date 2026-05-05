import { Page } from "@aq-fe/core-ui/shared/interfaces/Page";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import axiosInstance from "../configs/axiosInstance";

const CONTROLLER = "/Page"

export const pageService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<Page>(CONTROLLER, axiosInstance),
}
