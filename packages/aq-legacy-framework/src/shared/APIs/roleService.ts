import { Role } from "@aq-fe/aq-legacy-framework/shared/interfaces/Role";
import { createBaseApi, CustomApiResponse, PagingParams } from "@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi";
import axiosInstance from "@aq-fe/aq-legacy-framework/shared/configs/axiosInstance";

const CONTROLLER = "/role"

export const roleService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<Role>(CONTROLLER, axiosInstance),

    getAdminRole: (paging?: PagingParams) => {
        return axiosInstance.get<CustomApiResponse<Role[]>>(CONTROLLER + `/GetAdminRole`, {
            params: paging
        });
    },
    getRolePermission: (params: { roleId?: number }) => {
        return axiosInstance.get<CustomApiResponse<Role[]>>(CONTROLLER + "/GetRolePermission", {
            params
        })
    },
    getUserPermission: (params: { userId?: number }) => {
        return axiosInstance.get<CustomApiResponse<Role[]>>(CONTROLLER + "/GetUserPermission", {
            params
        })
    },
    updateRolePermission: (body?: { pagePermissions?: Role[], roleId?: number }) => {
        return axiosInstance.post<CustomApiResponse<Role[]>>(CONTROLLER + "/UpdateRolePermission", body)
    },
    updateUserPermission: (body?: { pagePermissions?: Role[], userId?: number }) => {
        return axiosInstance.post<CustomApiResponse<Role[]>>(CONTROLLER + "/UpdateUserPermission", body)
    },
    addUser: (params: { userId?: number }, roleIds: number[]) => {
        return axiosInstance.post<CustomApiResponse<Role[]>>(CONTROLLER + "/AddUser", { params, body: roleIds })
    },
    addUsers: (params: { roleId?: number }, userIds: number[]) => {
        return axiosInstance.post<CustomApiResponse<Role[]>>(
            CONTROLLER + "/AddUsers",
            userIds,
            { params }
        );
    },
    addUsersByCode: (params: { roleId?: number }, codes?: string[]) => {
        return axiosInstance.post<CustomApiResponse<Role[]>>(CONTROLLER + "/AddUsersByCode", codes, { params })
    },
    removeUsersFromRole: ({
        roleId,
        userIds,
    }: {
        roleId?: number;
        userIds: number[];
    }) => {
        return axiosInstance.post<CustomApiResponse<Role[]>>(
            CONTROLLER + "/RemoveUsersFromRole",
            userIds,                 // body
            { params: { roleId } }       // query param
        );
    },
    getUserByRole: (params: { roleId?: number }) => {
        return axiosInstance.get<CustomApiResponse<Role[]>>(CONTROLLER + "/GetUserByRole", {
            params
        })
    }
}
