import { COESubjectFormula } from "@/interfaces/shared-interfaces/COESubjectFormula";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/COESubjectMethod"

export const service_COESubjectMethod = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<COESubjectFormula>(CONTROLLER, baseAxios),
    findBySubjectAssessment: (
        params: {
            coeSubjectAssessmentId: number,
            [key: string]: any
        }
    ) => {
        return baseAxios.get<CustomApiResponse<COESubjectFormula[]>>(CONTROLLER + "/FindBySubjectAssessment", {
            params
        })
    }
}
