import { Document } from '@aq-fe/core-ui/shared/interfaces/Document';
import {
  createBaseApi,
  CustomApiResponse,
} from '@aq-fe/core-ui/shared/libs/createBaseApi';
import axiosInstance from '../configs/axiosInstance';

const CONTROLLER = '/Document';

export const documentService = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<Document>(CONTROLLER, axiosInstance),

  getByDocumentAttribute: (documentType?: number) => {
    return axiosInstance.get<CustomApiResponse<Document[]>>(
      CONTROLLER + `/GetByDocumentAttribute?id=${documentType}`
    );
  },

  getByType: (documentId?: number) => {
    return axiosInstance.get<CustomApiResponse<Document[]>>(
      CONTROLLER + `/GetByType?documentType=${documentId}`
    );
  },

  import: (values: Document[]) => {
    return axiosInstance.post<CustomApiResponse<Document[]>>(
      CONTROLLER + `/import`, values
    );
  }
};
