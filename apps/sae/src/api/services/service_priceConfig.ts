import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Program } from "@/interfaces/account";
import { Branch } from "@/interfaces/branch";
import { Course } from "@/interfaces/course";
import { Exam } from "@/interfaces/exam";
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = 'PriceConfig';


export interface PriceConfig extends BaseEntity {
    type?: number,
    program?: Program,
    branch?: Branch,
    course?: Course,
    exam?: Exam,
    price?: number,
}

export const service_priceConfig = {
    ...createBaseApi<PriceConfig>(`${CONTROLLER}`, axiosInstance),

    // GetByType
    getByType: (type?: number) => {
        return axiosInstance.post<CustomApiResponse<PriceConfig[]>>(`${CONTROLLER}/GetByType?type=${type}`)
    },
}
