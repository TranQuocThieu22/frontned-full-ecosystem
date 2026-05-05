import { AcademicYear } from '@aq-fe/core-ui/shared/interfaces/AcademicYear';
import { createBaseApi, CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';
import axiosInstance from '../configs/axiosInstance';

const CONTROLLER = '/academicYear';

export const academicYearService = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<AcademicYear>(CONTROLLER, axiosInstance),
  academicGetAll: () => {
    return axiosInstance.get<CustomApiResponse<AcademicYear[]>>(`${CONTROLLER}/AcademicGetAll`)
  }
};
