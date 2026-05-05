/**
 * Activity Service — OpenAPI 3.0 Sprint 1 spec aligned
 * Theo FRD SAE DAV.md §12.2 — Activity Service
 *
 * Endpoints:
 *  GET    /api/activity/{tenantId}              — Danh sách hoạt động (phân trang)
 *  POST   /api/activity/{tenantId}              — Tạo hoạt động
 *  GET    /api/activity/{tenantId}/{id}         — Chi tiết hoạt động
 *  PUT    /api/activity/{tenantId}/{id}         — Cập nhật hoạt động
 *  DELETE /api/activity/{tenantId}/{id}         — Xóa hoạt động
 *  POST   /api/activity/{tenantId}/{id}/register — Đăng ký hoạt động
 */

import { Activity, ActivityTypeEnum } from "@/shared/interfaces/Activity";
import { CustomAPIResponse } from "@aq-fe/aq-core-framework/shared/interfaces/CustomAPIResponse";
import axiosInstance from "../configs/axiosInstance";

const CONTROLLER = "/activity";

export const activityServiceQT = {
    // ── GET /api/activity/{tenantId} — Danh sách hoạt động ─────────────────
    getAll: ({
        tenantId,
        ...rest
    }: {
        tenantId?: string;
        CodeOrName?: string;
        Type?: ActivityTypeEnum,
        State?: number;
        PageNumber?: number;
        PageSize?: number;
    }) => {
        return axiosInstance.get<CustomAPIResponse<Activity[]>>(`${CONTROLLER}/${tenantId}`, {
            params: rest,
        });
    },

    // ── POST /api/activity/{tenantId} — Tạo hoạt động ─────────────────────
    create: ({
        tenantId,
        body,
    }: {
        tenantId?: string;
        body: {
            code?: string | null;
            name?: string | null;
            description?: string | null;
            type?: number;
            semesterId?: string | null;
            quota?: number;
            maxScore?: number;
            organizerUnit?: string | null;
            criteriaId?: string | null;
        };
    }) => {
        return axiosInstance.post<CustomAPIResponse<Activity>>(`${CONTROLLER}/${tenantId}`, body);
    },

    // ── GET /api/activity/{tenantId}/{id} — Chi tiết hoạt động ────────────
    getById: ({
        tenantId,
        id,
    }: {
        tenantId?: string;
        id?: string;
    }) => {
        return axiosInstance.get<CustomAPIResponse<Activity>>(`${CONTROLLER}/${tenantId}/${id}`);
    },

    // ── PUT /api/activity/{tenantId}/{id} — Cập nhật hoạt động ───────────
    update: ({
        tenantId,
        id,
        body,
    }: {
        tenantId?: string;
        id?: string;
        body: {
            name?: string | null;
            maxScore?: number;
            organizerUnit?: string | null;
        };
    }) => {
        return axiosInstance.put<CustomAPIResponse<Activity>>(
            `${CONTROLLER}/${tenantId}/${id}`,
            body,
        );
    },

    // ── DELETE /api/activity/{tenantId}/{id} — Xóa hoạt động ──────────────
    delete: ({
        tenantId,
        id,
    }: {
        tenantId?: string;
        id?: string;
    }) => {
        return axiosInstance.delete<CustomAPIResponse<void>>(
            `${CONTROLLER}/${tenantId}/${id}`,
        );
    },

    // ── POST /api/activity/{tenantId}/{id}/register — Đăng ký hoạt động ──
    register: ({
        tenantId,
        id,
        body,
    }: {
        tenantId?: string;
        id?: string;
        body: {
            activityId?: string | null;
            studentId?: string | null;
        };
    }) => {
        return axiosInstance.post<CustomAPIResponse<void>>(
            `${CONTROLLER}/${tenantId}/${id}/register`,
            body,
        );
    },

    importActivityParticipations: ({ tenantId, id, body }: { tenantId: string, id: string, body: ImportActivityParticipationsRequestBody }) => {
        return axiosInstance.post<CustomAPIResponse<Participations[]>>(`${CONTROLLER}/${tenantId}/${id}/import-activity-participations`, body);
    }
};


export interface ImportActivityParticipationsRequestBody {
    participations: Participations[]
}

export interface Participations {
    studentCode: string
    proposedScore: number
}