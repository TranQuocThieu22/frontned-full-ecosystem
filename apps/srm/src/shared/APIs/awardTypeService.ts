import { SRMAwardType } from '@/shared/interfaces/SRMAwardType';
import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { createBaseApi, CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';

const CONTROLLER = '/srm/SRMAwardType';

export const AwardTypeService = {
  ...createBaseApi<SRMAwardType>(CONTROLLER, axiosInstance),
  getAllIsActive: () => {
    return axiosInstance.get<CustomApiResponse<SRMAwardType[]>>(CONTROLLER + '/GetAllIsActive')
  },
};