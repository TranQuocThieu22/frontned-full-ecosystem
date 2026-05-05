
import { SRMLecturer } from '@/shared/interfaces/SRMLecturer';
import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance';
import { Account } from '@aq-fe/core-ui/shared/interfaces/Account';
import { createBaseApi, CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';

const CONTROLLER = '/Account';

export const accountService = {
    ...createBaseApi<Account>(CONTROLLER, axiosInstance),

    // getAllLecturer: () => {
    //     return axiosInstance.get<MyApiResponse<ILecturer[]>>(CONTROLLER + '/GetAllLecturer')
    // },
    getEdusoftNetAccount: () => {
        return axiosInstance.get<CustomApiResponse<SRMLecturer[]>>(CONTROLLER + '/GetEdusoftNetAccount')
    },

    createLecturer: (body: SRMLecturer) => {
        return axiosInstance.post<CustomApiResponse<SRMLecturer>>(CONTROLLER + '/CreateLecturer', body)
    },
    syncAQDataLecturer: () => {
        return axiosInstance.post<CustomApiResponse<string>>(CONTROLLER + '/AQDataLecturer')
    },
    /* bên ngoài */
    getEdusoftNetAccountExternal: () => {
        return axiosInstance.get<CustomApiResponse<SRMLecturer[]>>(CONTROLLER + '/GetEdusoftNetAccountExternal')
    },
    /* nội bộ */
    getEdusoftNetAccountInternal: () => {
        return axiosInstance.get<CustomApiResponse<SRMLecturer[]>>(CONTROLLER + '/GetEdusoftNetAccountInternal')
    },
    /* sinh viên*/
    getStudentList: () => {
        return axiosInstance.get<CustomApiResponse<Account[]>>(CONTROLLER + '/GetStudentList')
    }
};

