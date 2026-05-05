import { IDocumentAttribute } from '@/interfaces/IDocumentAttribute';
import {
  createBaseApi,
  MyApiResponse,
} from '@/shared/lib/createBaseApi';
import baseAxios from '../shared/config/baseAxios';

const CONTROLLER = '/DocumentAttribute';

export const documentAttributeService = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<IDocumentAttribute>(CONTROLLER, baseAxios),
  GetByType: (FormTypeId?: number) => {
    return baseAxios.get<MyApiResponse<IDocumentAttribute[]>>(
      CONTROLLER + `/GetByType?documentType=${FormTypeId}`
    );
  },
};
