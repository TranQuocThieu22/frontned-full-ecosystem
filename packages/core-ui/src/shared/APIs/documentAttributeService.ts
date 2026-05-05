import { DocumentAttribute } from '@aq-fe/core-ui/shared/interfaces/DocumentAttribute';
import {
  createBaseApi,
  CustomApiResponse,
} from '@aq-fe/core-ui/shared/libs/createBaseApi';
import axiosInstance from '../configs/axiosInstance';

const CONTROLLER = '/DocumentAttribute';

export const documentAttributeService = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<DocumentAttribute>(CONTROLLER, axiosInstance),
  GetByType: (FormTypeId?: number) => {
    return axiosInstance.get<CustomApiResponse<DocumentAttribute[]>>(
      CONTROLLER + `/GetByType?documentType=${FormTypeId}`
    );
  },
};
