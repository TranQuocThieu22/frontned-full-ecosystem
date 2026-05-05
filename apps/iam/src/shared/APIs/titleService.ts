import { SRMTitle } from '@/shared/interfaces/SRMTitle';
import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { createBaseApi, CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';

const CONTROLLER = '/srm/SRMTitle';

export const titleService = {
  ...createBaseApi<SRMTitle>(CONTROLLER, axiosInstance),

  GetAllByType: (type: number, cols?: string[]) => {
    if (!cols) return axiosInstance.get<CustomApiResponse<SRMTitle[]>>(`${CONTROLLER}/GetAllByType?Type=${type}`);
    return axiosInstance.get<CustomApiResponse<SRMTitle[]>>(`${CONTROLLER}/GetAllByType?Type=${type}&cols=${cols?.join(',')}`);
  },
};
