
import { COEIRM } from "@/interfaces/shared-interfaces/COEIRM";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/COEIRM"

export const COEIRMService = {
    ...createBaseApi<COEIRM>(CONTROLLER, axiosInstance),
}


