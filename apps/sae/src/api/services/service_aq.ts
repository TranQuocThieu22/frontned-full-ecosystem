import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Address } from "@/interfaces/address"
import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
const CONTROLLER = 'AQ'

export const service_aq = {
    ...createBaseApi<Address>(`${CONTROLLER}`, axiosInstance),

    getAQSyncDataHistory: (params: BaseEntity) => {
        return axiosInstance.get<CustomApiResponse<Address[]>>(`${CONTROLLER}/AQSyncDataHistory`, { params })
    }
}
