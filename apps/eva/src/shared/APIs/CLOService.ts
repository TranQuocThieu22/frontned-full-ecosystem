import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { IBaseEntity } from "aq-fe-framework/interfaces";

const CONTROLLER = "/eva/CLO"

export const CLOService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<ICLO>(CONTROLLER, axiosInstance),
    GetCLOsBySubjectId: (id: number) => {
        return axiosInstance.get<CustomApiResponse<ICLO[]>>(CONTROLLER + `/GetCLOsBySubjectId?subjectId=${id}`)
    },
}



export interface ICLO extends IBaseEntity {
    description?: string,
    evaSubjectId?: number,

}

