import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { IBaseEntity } from "aq-fe-framework/interfaces";
import { IDifficulty } from "./difficultyService";

const CONTROLLER = "/eva/Subject"

export const subjectService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<ISubject>(CONTROLLER, axiosInstance),
    // GetEvaluationDetailsByEvaluationId: ({ param = "" }: { param?: string }) => {
    //     return axiosInstance.get<MyApiResponse<IEvaluation[]>>(CONTROLLER + `/GetEvaluationDetailsByEvaluationId?${param}`)
    // },

}

export interface ISubject extends IBaseEntity {
    note?: string;
    evaDifficultyId?: number;
    evaDifficulty?: IDifficulty
}
