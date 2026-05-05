import { SRMLevel } from "@/shared/interfaces/SRMLevel";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";


const CONTROLLER = '/srm/SRMLevel';

export const levelService = {
    ...createBaseApi<SRMLevel>(`${CONTROLLER}`, axiosInstance),

    getAllIsActive: () => {
        return axiosInstance.get<CustomApiResponse<SRMLevel[]>>(CONTROLLER + '/GetAllIsActive')
    },
}