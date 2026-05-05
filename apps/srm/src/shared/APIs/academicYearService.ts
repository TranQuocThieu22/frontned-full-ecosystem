import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { AcademicYear } from '@aq-fe/core-ui/shared/interfaces/AcademicYear';
import { createBaseApi, CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';

const CONTROLLER = '/academicYear';

export const academicYearService = {
  ...createBaseApi<AcademicYear>(CONTROLLER, axiosInstance),
  academicGetAll: () => {
    return axiosInstance.get<CustomApiResponse<AcademicYear[]>>(`${CONTROLLER}/AcademicGetAll`)
  }
};
