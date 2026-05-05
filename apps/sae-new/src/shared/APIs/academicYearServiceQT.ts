import { AcademicYear, AcademicYearStateEnum, Criterion } from "@/shared/interfaces/AcademicYear";
import { CustomAPIResponse } from "@aq-fe/aq-core-framework/shared/interfaces/CustomAPIResponse";
import { createBaseAPI } from "@aq-fe/aq-core-framework/shared/libs/createBaseAPI";
import axiosInstance from "../configs/axiosInstance";
import { Semester } from "../interfaces/Semester";

const CONTROLLER = "/academicYear";

export const academicYearService = {
    ...createBaseAPI(CONTROLLER, axiosInstance),
    getAll: ({
        tenantId,
        ...rest
    }: {
        tenantId?: string;
        state?: AcademicYearStateEnum;
        CodeOrName?: string;
        PageNumber?: number;
        PageSize?: number;
    }) => {
        return axiosInstance.get<CustomAPIResponse<AcademicYear[]>>(`${CONTROLLER}/${tenantId}`, {
            params: rest,
        });
    },

    /** Tạo mới năm học */
    create: ({ tenantId, body }: { tenantId?: string; body: AcademicYear }) => {
        return axiosInstance.post<CustomAPIResponse<AcademicYear>>(`${CONTROLLER}/${tenantId}`, body);
    },

    /** Lấy chi tiết 1 năm học — hỗ trợ include=semesters,scoreFrameworkVersion,semesterCount */
    get: ({ tenantId, id, }: { tenantId?: string; id?: string; }) => {
        return axiosInstance.get<CustomAPIResponse<AcademicYear>>(`${CONTROLLER}/${tenantId}/${id}`);
    },

    /** Kích hoạt năm học hiện hành */
    activate: ({ tenantId, id }: { tenantId?: string; id?: string }) => {
        return axiosInstance.post<CustomAPIResponse<AcademicYear>>(`${CONTROLLER}/${tenantId}/${id}/activate`);
    },

    /** Lưu trữ năm học */
    archive: ({ tenantId, id }: { tenantId?: string; id?: string }) => {
        return axiosInstance.post<CustomAPIResponse<AcademicYear>>(`${CONTROLLER}/${tenantId}/${id}/archive`);
    },

    /** Kiểm tra tồn tại */
    exists: ({ tenantId, state }: { tenantId?: string; state?: AcademicYearStateEnum }) => {
        return axiosInstance.get<CustomAPIResponse<boolean>>(`${CONTROLLER}/${tenantId}/exists`, { params: { state } });
    },

    /** Xóa năm học (chỉ Inactive mới cho xóa theo FRD) */
    delete: ({ tenantId, id }: { tenantId?: string; id?: string }) => {
        return axiosInstance.delete<CustomAPIResponse<void>>(`${CONTROLLER}/${tenantId}/${id}`);
    },

    /** GET /api/academicyear/{tenantId}/current — Lấy năm học hiện hành (Active) */
    getCurrentAcademicYear: ({ tenantId }: { tenantId?: string }) => {
        return axiosInstance.get<CustomAPIResponse<AcademicYear>>(
            `${CONTROLLER}/${tenantId}/current`,
        );
    },

    activeAcademicYear: () => {
        return axiosInstance.post<CustomAPIResponse<AcademicYear[]>>(`${CONTROLLER}/active`);
    },

    update: ({ tenantId, id, body }: { tenantId?: string; id?: string, body: AcademicYear }) => {
        return axiosInstance.put<CustomAPIResponse<AcademicYear>>(`${CONTROLLER}/${tenantId}/${id}`, body);
    },

    /** GET /api/academicyear/{tenantId}/{id}/criterias — Lấy danh sách tiêu chí theo năm học */
    getCriterias: ({ tenantId, id }: { tenantId?: string; id?: string }) => {
        return axiosInstance.get<CustomAPIResponse<Criterion[]>>(
            `${CONTROLLER}/${tenantId}/${id}/criterias`,
        );
    },

    getSemesters: ({ tenantId, id }: { tenantId?: string; id?: string }) => {
        return axiosInstance.get<CustomAPIResponse<Semester[]>>(
            `${CONTROLLER}/${tenantId}/${id}/semesters`,
        );
    },
};
