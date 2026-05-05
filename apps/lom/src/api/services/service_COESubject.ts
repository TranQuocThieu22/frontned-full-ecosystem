import { COEGradeSubject } from "@/interfaces/shared-interfaces/COEGradeSubject";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/COESubject"

export const service_COESubject = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<COEGradeSubject>(CONTROLLER, baseAxios),
}
