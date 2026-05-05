import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Branch } from "@/interfaces/branch";
import {createBaseApi} from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = 'Branch'

export const service_branch = {
    ...createBaseApi<Branch>(`${CONTROLLER}`, axiosInstance),
}
