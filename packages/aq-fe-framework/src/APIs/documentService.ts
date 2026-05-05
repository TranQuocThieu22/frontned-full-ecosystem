import { IDocument } from '@/interfaces';
import {
  createBaseApi,
  MyApiResponse,
} from '@/shared/lib/createBaseApi';
import baseAxios from '../shared/config/baseAxios';

const CONTROLLER = '/Document';

export const documentService = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<IDocument>(CONTROLLER, baseAxios),
  GetByDocumentAttribute: (documentType?: number) => {
    return baseAxios.get<MyApiResponse<IDocument[]>>(
      CONTROLLER + `/GetByDocumentAttribute?id=${documentType}`
    );
  },
  GetByType: (documentId?: number) => {
    return baseAxios.get<MyApiResponse<IDocument[]>>(
      CONTROLLER + `/GetByType?documentType=${documentId}`
    );
  },
};
