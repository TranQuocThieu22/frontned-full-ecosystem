import { AQFileDetail } from '@aq-fe/core-ui/shared/interfaces/AQFileDetail';
import { Document } from '@aq-fe/core-ui/shared/interfaces/Document';
import {
    createBaseApi,
    CustomApiResponse
} from '@aq-fe/core-ui/shared/libs/createBaseApi';
import axiosInstance from '../configs/axiosInstance';

const CONTROLLER = '/AQ';

export const aqService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<Document>(CONTROLLER, axiosInstance),
    getFile: (params: { filePath?: string }) => {
        return axiosInstance.get<CustomApiResponse<AQFileDetail>>(
            CONTROLLER + `/GetFile`,
            { params }
        );
    }
};


