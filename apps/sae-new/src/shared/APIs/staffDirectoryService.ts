/**
 * Staff Directory Service
 * Quản lý danh bạ nhân sự - IAM Admin
 */

import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { CustomAPIResponse } from "../interfaces/CustomAPIResponse";

const CONTROLLER = "/staff";

export interface StaffMember {
    id: string;
    userName: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    avatarUrl?: string;
    departmentId?: number;
    departmentName?: string;
    positionId?: number;
    positionName?: string;
    roleId: number;
    roleName: string;
    isBlocked: boolean;
    hireDate?: string;
    createdAt: string;
}

export interface StaffFilterParams {
    keyword?: string;
    departmentId?: number;
    roleId?: number;
    status?: "active" | "inactive" | "";
    pageNumber: number;
    pageSize: number;
}

export const staffDirectoryService = {
    /** Lấy danh sách nhân sự (phân trang) */
    getList: (params: StaffFilterParams) => {
        return axiosInstance.get<CustomAPIResponse<StaffMember[]>>(
            `${CONTROLLER}/GetList`,
            { params }
        );
    },

    /** Lấy chi tiết 1 nhân sự */
    getById: (id: string) => {
        return axiosInstance.get<CustomAPIResponse<StaffMember>>(
            `${CONTROLLER}/${id}`
        );
    },

    /** Tạo mới nhân sự */
    create: (body: Omit<StaffMember, "id" | "createdAt">) => {
        return axiosInstance.post<CustomAPIResponse<StaffMember>>(
            `${CONTROLLER}`,
            body
        );
    },

    /** Cập nhật nhân sự */
    update: (id: string, body: Partial<Omit<StaffMember, "id" | "createdAt">>) => {
        return axiosInstance.put<CustomAPIResponse<StaffMember>>(
            `${CONTROLLER}/${id}`,
            body
        );
    },

    /** Xóa nhân sự */
    delete: (id: string) => {
        return axiosInstance.delete<CustomAPIResponse<void>>(
            `${CONTROLLER}/${id}`
        );
    },

    /** Khóa tài khoản */
    suspend: (id: string) => {
        return axiosInstance.post<CustomAPIResponse<StaffMember>>(
            `${CONTROLLER}/Suspend`,
            { id }
        );
    },

    /** Kích hoạt tài khoản */
    activate: (id: string) => {
        return axiosInstance.post<CustomAPIResponse<StaffMember>>(
            `${CONTROLLER}/Activate`,
            { id }
        );
    },

    /** Xuất danh sách nhân sự (lấy file) */
    exportList: (params: Omit<StaffFilterParams, "pageNumber" | "pageSize">) => {
        return axiosInstance.get(`${CONTROLLER}/Export`, {
            params,
            responseType: "blob",
        });
    },
};
