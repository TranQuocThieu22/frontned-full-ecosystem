import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { Department } from '@aq-fe/core-ui/shared/interfaces/Department';
import { createBaseApi, CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';

// Ví dụ tạo service
const CONTROLLER = '/Department';

export const service_Department = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<Department>(CONTROLLER, axiosInstance),
  FindbyType: (params: { Type?: number }) => {
    return axiosInstance.get<CustomApiResponse<Department[]>>(
      CONTROLLER + '/FindbyType',
      { params }
    );
  },
};
