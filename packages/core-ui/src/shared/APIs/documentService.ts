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
  GetByDocumentAttribute: (documentType?: number) => {
    return axiosInstance.get<CustomApiResponse<Document[]>>(
      CONTROLLER + `/GetByDocumentAttribute?id=${documentType}`
    );
  },
  GetByType: (documentId?: number) => {
    return axiosInstance.get<CustomApiResponse<Document[]>>(
      CONTROLLER + `/GetByType?documentType=${documentId}`
    );
  },
};
