import { ExamSet } from "@/shared/interfaces/ExamSet";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/eva/examSet"

export const examSetService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<ExamSet>(CONTROLLER, axiosInstance),
    getExamSet: (params: { examId?: number, subjectId?: number, [key: string]: any }) => {
        return axiosInstance.get<CustomApiResponse<ExamSet[]>>(CONTROLLER + "/GetExamSet", { params })
    }
}



