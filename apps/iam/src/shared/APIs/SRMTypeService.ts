import { SRMType } from "@/shared/interfaces/SRMType";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";


const CONTROLLER = '/srm/SRMType';

export const SRMTypeService = {
    ...createBaseApi<SRMType>(`${CONTROLLER}`, axiosInstance),

    getAllIsActive: () => {
        return axiosInstance.get<CustomApiResponse<SRMType[]>>(CONTROLLER + '/GetAllIsActive')
    },
}