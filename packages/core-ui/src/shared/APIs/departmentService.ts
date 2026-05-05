import { Department } from '@aq-fe/core-ui/shared/interfaces/Department';
import {
  createBaseApi,
  CustomApiResponse,
} from '@aq-fe/core-ui/shared/libs/createBaseApi';
import axiosInstance from '../configs/axiosInstance';

const CONTROLLER = '/department';

export const departmentService = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<Department>(CONTROLLER, axiosInstance),
  getWorkingUnit: () => {
    return axiosInstance.get<CustomApiResponse<Department[]>>(
      CONTROLLER + `/GetWorkingUnit`
    );
  },
};
