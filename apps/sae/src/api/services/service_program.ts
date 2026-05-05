import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";import {createBaseApi} from "@aq-fe/core-ui/shared/libs/createBaseApi";
const CONTROLLER = 'Program';

export const service_program = {
    ...createBaseApi<BaseEntity>(`${CONTROLLER}`, axiosInstance),
}
