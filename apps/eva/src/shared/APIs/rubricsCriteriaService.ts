import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { IBaseEntity } from "aq-fe-framework/interfaces";
import { IEvaluation } from "./evaluationService";
import { ISubject } from "./subjectService";

const CONTROLLER = "/eva/RubricsCriteria"

export const rubricsCriteriaService = {
    ...createBaseApi<IRubrics>(CONTROLLER, axiosInstance),

    GetRubricsCriteriasByRubricsId: (rubricId: number) => {
        return axiosInstance.get<CustomApiResponse<IEvaRubricsCriterias[]>>(CONTROLLER + `/GetRubricsCriteriasByRubricsId?rubricsId=${rubricId}`)
    },
};

export interface IRubrics extends IBaseEntity {
    note?: string,
    evaSubjectId?: number,
    evaEvaluationId?: number,
    evaluation?: IEvaluation,
    subject?: ISubject
    evaRubricsCriterias?: IEvaRubricsCriterias[]
}
export interface IEvaRubricsCriterias extends IBaseEntity {
    density?: number,
    description?: string,
    evaRubricsId?: number,
    evaEvaluationId?: number,
    evaRubricsCriteriaDetails?: IEvaRubricsCriteriaDetails[]
}
export interface IEvaRubricsCriteriaDetails extends IBaseEntity {
    description?: string,
    evaRubricsCriteriaId?: number
    evaEvaluationDetailId?: number
}

