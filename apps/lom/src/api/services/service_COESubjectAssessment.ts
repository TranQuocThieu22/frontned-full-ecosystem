import { COESubjectAssessment } from "@/interfaces/shared-interfaces/COESubjectAssessment";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/COESubjectAssessment"

export const service_COESubjectAssessment = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<COESubjectAssessment>(CONTROLLER, baseAxios),
    getAssessmentByFormula: ({ formulaId }: { formulaId?: number | string }) => {
        return baseAxios.get<CustomApiResponse<IGetAssessmentByFormulaRes[]>>(CONTROLLER + "/GetAssessmentByFormula", {
            params: {
                coeFormulaId: formulaId
            }
        })
    },
    getCOESubjectAssessment: (params: {
        coeGradeSubjectId?: number,
        [key: string]: any
    }) => {
        return baseAxios.get<CustomApiResponse<COESubjectAssessment[]>>(CONTROLLER + "/FindByGradeSubject", {
            params
        })
    }
}


interface IGetAssessmentByFormulaRes {
    coeSubjectAssessments?: COESubjectAssessment[]
}