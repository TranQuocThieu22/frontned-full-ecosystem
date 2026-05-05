import { ICertificate } from "@/interfaces/certificate";
import { createBaseApi } from "aq-fe-framework/shared";
import baseAxios from "../config/baseAxios";

const CONTROLLER = "/Certificate"

export const service_certificate = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<ICertificate>(CONTROLLER, baseAxios),
}
