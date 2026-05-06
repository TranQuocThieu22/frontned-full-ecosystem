import type { Scope } from "@aq-fe/aq-legacy-framework/shared/interfaces/Scope"
import { createBaseAPI } from "@aq-fe/aq-legacy-framework/shared/libs/iam/createBaseAPI"
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance"

const CONTROLLER = "/scope"

export const scopeService = {
    ...createBaseAPI<Scope>(CONTROLLER, axiosInstance),

    /** Gán danh sách scope cho một user */
    assignToUser: (userId: number, scopeIds: string[]) =>
        axiosInstance.post(`${CONTROLLER}/assign/user/${userId}`, { scopeIds }),

    /** Lấy danh sách scope đã gán cho một user */
    getByUser: (userId: number) =>
        axiosInstance.get(`${CONTROLLER}/user/${userId}`),

    /** Gán danh sách scope cho một role */
    assignToRole: (roleId: number, scopeIds: string[]) =>
        axiosInstance.post(`${CONTROLLER}/assign/role/${roleId}`, { scopeIds }),

    /** Lấy danh sách scope đã gán cho một role */
    getByRole: (roleId: number) =>
        axiosInstance.get(`${CONTROLLER}/role/${roleId}`),

    /** Tra cứu scope thực tế đang áp dụng cho user hoặc role */
    getEffectiveScopes: (params: { userId?: number; roleId?: number }) =>
        axiosInstance.get(`${CONTROLLER}/effective`, { params }),
}
