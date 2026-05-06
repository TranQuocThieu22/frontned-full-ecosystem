import iamAxiosInstance from "@aq-fe/aq-legacy-framework/shared/configs/iamAxiosInstance";
import { CustomAPIResponse } from "@aq-fe/aq-legacy-framework/shared/interfaces/CustomAPIResponse";
import { User } from "@aq-fe/aq-legacy-framework/shared/interfaces/User";
import { PagingParams } from "@aq-fe/aq-legacy-framework/shared/libs/iam/createBaseAPI";
import { useAuthenticateStore } from "@aq-fe/aq-legacy-framework/shared/stores/useAuthenticateStore";
import { Role } from "@aq-fe/aq-legacy-framework/shared/interfaces/Role";

const CONTROLLER = "/user";

export const userService = {
    getAll: ({ pagingParams, tenantId }: { pagingParams?: PagingParams, tenantId?: string }) => {
        const effectiveTenantId = tenantId || useAuthenticateStore.getState().state.tenantId
        return iamAxiosInstance.get<CustomAPIResponse<User[]>>(`${CONTROLLER}/${effectiveTenantId}`, { params: pagingParams });
    },

    create: ({ data }: { data: User }) => {
        const tenantId = data.tenantId || useAuthenticateStore.getState().state.tenantId
        return iamAxiosInstance.post(`${CONTROLLER}/${tenantId}`, data);
    },

    update: ({ id, data }: { id: string, data: User }) => {
        const tenantId = data.tenantId || useAuthenticateStore.getState().state.tenantId
        return iamAxiosInstance.put(`${CONTROLLER}/${tenantId}/${id}`, data);
    },

    getById: ({ id, tenantId }: { id: string, tenantId?: string }) => {
        const effectiveTenantId = tenantId || useAuthenticateStore.getState().state.tenantId
        return iamAxiosInstance.get(`${CONTROLLER}/${effectiveTenantId}/${id}`);
    },

    delete: ({ id, tenantId }: { id: string, tenantId?: string }) => {
        const effectiveTenantId = tenantId || useAuthenticateStore.getState().state.tenantId
        return iamAxiosInstance.delete(`${CONTROLLER}/${effectiveTenantId}/${id}`);
    },

    assignRoles: (userId: string, roleIds: string[], tenantId?: string) => {
        const effectiveTenantId = tenantId || useAuthenticateStore.getState().state.tenantId
        return iamAxiosInstance.post(`${CONTROLLER}/${effectiveTenantId}/${userId}/assign-roles`, { roleIds: roleIds })
    },
    unassignRoles: (userId: string, roleIds: string[], tenantId?: string) => {
        const effectiveTenantId = tenantId || useAuthenticateStore.getState().state.tenantId
        return iamAxiosInstance.post(`${CONTROLLER}/${effectiveTenantId}/${userId}/unassign-roles`, { roleIds: roleIds })
    },
    getRoles: (userId: string, tenantId?: string) => {
        const effectiveTenantId = tenantId || useAuthenticateStore.getState().state.tenantId
        return iamAxiosInstance.get<CustomAPIResponse<Role[]>>(`${CONTROLLER}/${effectiveTenantId}/${userId}/get-roles`)
    },
    activate: (id: string, status: number) => {
        return iamAxiosInstance.patch<CustomAPIResponse<any>>(`${CONTROLLER}/${id}/activate`, { status })
    }
};
