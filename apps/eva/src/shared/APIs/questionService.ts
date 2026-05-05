import { Question } from "@/shared/interfaces/Question";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/eva/question"

export const questionService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<Question>(CONTROLLER, axiosInstance),
    getQuestion: (params: { evaSubjectId: number, [key: string]: any }) => {
        return axiosInstance.get<CustomApiResponse<Question[]>>(`${CONTROLLER}/GetQuestion`, { params })
    }
}



