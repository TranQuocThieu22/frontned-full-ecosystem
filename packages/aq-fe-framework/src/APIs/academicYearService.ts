import { IAcademicYear } from '@/interfaces/IAcademicYear';
import { createBaseApi, MyApiResponse } from '@/shared/lib/createBaseApi';
import baseAxios from '../shared/config/baseAxios';

const CONTROLLER = '/academicYear';

export const academicYearService = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<IAcademicYear>(CONTROLLER, baseAxios),
  academicGetAll: () => {
    return baseAxios.get<MyApiResponse<IAcademicYear[]>>(`${CONTROLLER}/AcademicGetAll`)
  }
};
