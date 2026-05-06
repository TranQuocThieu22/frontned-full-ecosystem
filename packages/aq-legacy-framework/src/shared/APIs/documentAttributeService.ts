import { DocumentAttribute } from '@aq-fe/aq-legacy-framework/shared/interfaces/DocumentAttribute';
import {
  createBaseApi,
  CustomApiResponse,
} from '@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi';
import axiosInstance from '@aq-fe/aq-legacy-framework/shared/configs/axiosInstance';

const CONTROLLER = '/DocumentAttribute';

export const documentAttributeService = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<DocumentAttribute>(CONTROLLER, axiosInstance),

  getByType: (documentType?: number) => {
    return axiosInstance.get<CustomApiResponse<DocumentAttribute[]>>(
      CONTROLLER + `/GetByType?documentType=${documentType}`
    );
  },

  import: (values: DocumentAttribute[]) => {
    return axiosInstance.post<CustomApiResponse<any>>(`${CONTROLLER}/import`, values);
  }
};
