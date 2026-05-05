import { COECG } from "@/interfaces/shared-interfaces/COECG";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/COECG"

export const service_COECG = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<COECG>(CONTROLLER, axiosInstance),
    getSource: ({ COEGradeSubjectId }: { COEGradeSubjectId?: number | string }) => {
        return axiosInstance.get<CustomApiResponse<COECG[]>>(CONTROLLER + "/GetSource", {
            params: {
                COEGradeSubjectId: COEGradeSubjectId
            }
        })
    }
}

