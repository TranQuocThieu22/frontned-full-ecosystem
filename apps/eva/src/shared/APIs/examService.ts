import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { IBaseEntity } from "aq-fe-framework/interfaces";
import { IExamSection } from "./examSectionService";

const CONTROLLER = "/eva/Exam"

export const examService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<IExam>(CONTROLLER, axiosInstance),
    GetDificultyDetailsByDifficultyId: ({ param = "" }: { param?: string }) => {
        return axiosInstance.get<CustomApiResponse<IExam[]>>(CONTROLLER + `/GetDificultyDetailsByDifficultyId?${param}`)
    },
}



export interface IExam extends IBaseEntity {
    startDate?: string,
    endDate?: string,
    note?: string,
    subjectQuantity?: number,
    examSectionQuantity?: number,
    evaExamSections?: IExamSection[]

}

