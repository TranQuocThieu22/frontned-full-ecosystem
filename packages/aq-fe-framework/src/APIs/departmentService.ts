import { IDepartment } from '@/interfaces/IDepartment';
import {
  createBaseApi,
  MyApiResponse,
} from '@/shared/lib/createBaseApi';
import baseAxios from '../shared/config/baseAxios';

const CONTROLLER = '/department';

export const departmentService = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<IDepartment>(CONTROLLER, baseAxios),
  getWorkingUnit: () => {
    return baseAxios.get<MyApiResponse<IDepartment[]>>(
      CONTROLLER + `/GetWorkingUnit`
    );
  },
};
