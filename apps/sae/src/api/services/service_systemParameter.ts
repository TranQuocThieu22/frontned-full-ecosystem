import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import {createBaseApi} from "@aq-fe/core-ui/shared/libs/createBaseApi";
const CONTROLLER = 'SystemParameter';

export interface SystemParameter extends BaseEntity {
    value?: number;
}

export const service_systemParameter = {
    ...createBaseApi<SystemParameter>(`${CONTROLLER}`, axiosInstance),
}
