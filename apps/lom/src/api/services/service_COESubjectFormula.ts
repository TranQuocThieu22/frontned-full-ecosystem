import { COESubjectFormula } from "@/interfaces/shared-interfaces/COESubjectFormula";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/COESubjectFormula"

export const service_COESubjectFormula = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<COESubjectFormula>(CONTROLLER, baseAxios),
    findByGradeSubject: ({ gradeSubjectId }: { gradeSubjectId?: number }) => {
        return baseAxios.get<CustomApiResponse<COESubjectFormula[]>>(CONTROLLER + "/FindByGradeSubject", {
            params: {
                coeGradeSubjectId: gradeSubjectId
            }
        })
    }
}
