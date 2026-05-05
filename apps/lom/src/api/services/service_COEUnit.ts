import { COEUnit } from "@/interfaces/shared-interfaces/COEUnit";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/COEUnit"

export const service_COEUnit = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<COEUnit>(CONTROLLER, baseAxios),
}
