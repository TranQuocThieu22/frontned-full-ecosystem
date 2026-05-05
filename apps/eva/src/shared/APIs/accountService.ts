import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/Account"

export const accountService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<IAccount>(CONTROLLER, axiosInstance),

    // Các hàm custom 
    getStudentList: () => {
        return axiosInstance.get<CustomApiResponse<IAccount[]>>(CONTROLLER + `/GetStudentList`)
    },
    getAllLecturer: () => {
        return axiosInstance.get<CustomApiResponse<IAccount[]>>(CONTROLLER + `/GetAllLecturer`)
    },
}


export interface IAccount extends BaseEntity {
    fullName?: string,
    email?: string,
    address?: string;
    phoneNumber?: string;
    gender?: number;
    EVAClassId?: number;
    facultyName?: string;
    classCode?: string;
    className?: string | null;
    majorsName?: string | null;
    dateOfBirth?: Date;
    placeOfBirth?: string | null;
    identifier?: string | null;
    identifierIssuePlace?: string | null;
    identifierIssueDate?: string | null;
    isEnabled?: boolean;
}