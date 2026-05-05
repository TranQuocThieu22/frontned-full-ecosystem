import { SRMArea } from '@/shared/interfaces/SRMArea';
import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { createBaseApi, CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';

const CONTROLLER = '/srm/SRMArea';

export const areaService = {
  ...createBaseApi<SRMArea>(CONTROLLER, axiosInstance),
  getAllIsActive: () => {
    return axiosInstance.get<CustomApiResponse<SRMArea[]>>(CONTROLLER + '/GetAllIsActive')
  },
};
