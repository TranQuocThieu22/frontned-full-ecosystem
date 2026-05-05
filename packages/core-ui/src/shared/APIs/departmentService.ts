import { Department } from '@aq-fe/core-ui/shared/interfaces/Department';
import {
  createBaseApi,
  CustomApiResponse,
} from '@aq-fe/core-ui/shared/libs/createBaseApi';
import axiosInstance from '../configs/axiosInstance';

const CONTROLLER = '/Department';

export const departmentService = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<Department>(CONTROLLER, axiosInstance),

  getAllDepartments: (params: { pageSize?: number, pageNumber?: number, searchValue?: string, cols?: string } = {}) => {
    return axiosInstance.get<CustomApiResponse<Department[]>>(CONTROLLER + "/get-all-departments", {
      params: params
    })
  },

  getWorkingUnit: () => {
    return axiosInstance.get<CustomApiResponse<Department[]>>(
      CONTROLLER + `/GetWorkingUnit`
    );
  },
};
