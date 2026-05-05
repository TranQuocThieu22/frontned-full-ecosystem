import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { IBaseEntity } from "aq-fe-framework/interfaces";
import { IEvaluation } from "./evaluationService";

const CONTROLLER = "/eva/EvaluationDetail"

export const evaluationDetailService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<IEvaluationDetail>(CONTROLLER, axiosInstance),
    GetEvaluationDetailsByEvaluationId: ({ param = "" }: { param?: string }) => {
        return axiosInstance.get<CustomApiResponse<IEvaluation[]>>(CONTROLLER + `/GetEvaluationDetailsByEvaluationId?${param}`)
    },
}

export interface IEvaluationDetail extends IBaseEntity {
    note?: string;
    evaEvaluationId?: number;
    evaluation?: IEvaluation;
    density?: number;
}
