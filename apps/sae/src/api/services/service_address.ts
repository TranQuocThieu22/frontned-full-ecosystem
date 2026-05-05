import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Address } from "@/interfaces/address"
import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";
const CONTROLLER = 'Address'

interface Params {
    name?: string
    isInsiteSchool?: boolean
}

export const service_address = {
    ...createBaseApi<Address>(`${CONTROLLER}`, axiosInstance),

    findbyInsiteSchool: (params: Params) => {
        return axiosInstance.get<CustomApiResponse<Address[]>>(`${CONTROLLER}/FindbyInsiteSchool`, { params })
    }
}
