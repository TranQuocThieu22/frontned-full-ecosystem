import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Class } from "@/interfaces/class";
import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

const CONTROLLER = 'Class'

interface Params extends BaseEntity {
    searchText?: string,
    pageNumber?: number,
    pageSize?: number
}

export const service_class = {
    ...createBaseApi<Class>(`${CONTROLLER}`, axiosInstance),

    findBy: (params: Params) => {
        return axiosInstance.get<CustomApiResponse<Class[]>>(`${CONTROLLER}/FindBy`, { params })
    }
}
