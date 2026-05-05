import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { SRMAwardLevel } from '../interfaces/SRMAwardLevel';


const CONTROLLER = '/srm/SRMAwardLevel';

export const AwardLevelService = {
     ...createBaseApi<SRMAwardLevel>(`${CONTROLLER}`, axiosInstance),

     getAllIsActive: () => {
          return axiosInstance.get<CustomApiResponse<SRMAwardLevel[]>>(CONTROLLER + '/GetAllIsActive')
     },
}