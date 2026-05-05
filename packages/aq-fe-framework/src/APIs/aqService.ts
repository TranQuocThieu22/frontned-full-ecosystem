import { IDocument } from '@/interfaces';
import {
    createBaseApi,
    MyApiResponse
} from '@/shared/lib/createBaseApi';
import { IAQFileDetail } from '@/utils';
import baseAxios from '../shared/config/baseAxios';

const CONTROLLER = '/AQ';

export const aqService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<IDocument>(CONTROLLER, baseAxios),
    getFile: (params: { filePath?: string }) => {
        return baseAxios.get<MyApiResponse<IAQFileDetail>>(
            CONTROLLER + `/GetFile`,
            { params }
        );
    }
};


