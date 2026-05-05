import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { IBaseEntity } from "aq-fe-framework/interfaces";
import { IEvaluationDetail } from "./evaluationDetailService";

const CONTROLLER = "/eva/Evaluation"

export const evaluationService = {
    ...createBaseApi<IEvaluation>(CONTROLLER, axiosInstance),

}

export interface IEvaluation extends IBaseEntity {
    note?: string;
    evaluationDetails?: IEvaluationDetail[];

}
