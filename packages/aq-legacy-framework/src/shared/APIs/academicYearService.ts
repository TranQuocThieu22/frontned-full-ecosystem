import { AcademicYear } from '@aq-fe/aq-legacy-framework/shared/interfaces/AcademicYear';
import { createBaseApi, CustomApiResponse } from '@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi';
import axiosInstance from '@aq-fe/aq-legacy-framework/shared/configs/axiosInstance';

const CONTROLLER = '/academicYear';

export const academicYearService = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<AcademicYear>(CONTROLLER, axiosInstance),

  academicGetAll: () => {
    return axiosInstance.get<CustomApiResponse<AcademicYear[]>>(`${CONTROLLER}/AcademicGetAll`)
  },

  getAllAcademicYears: (params: { pageSize?: number, pageNumber?: number, searchValue?: string} = {}) => {
    return axiosInstance.get<CustomApiResponse<AcademicYear[]>>(`${CONTROLLER}/get-all-academic-years`,{
      params
    })
  },

  import: (data: AcademicYear[]) => {
    return axiosInstance.post<CustomApiResponse<AcademicYear[]>>(`${CONTROLLER}/import`, data)
  }
};
