import { IRole } from "@/interfaces/IRole";
import { createBaseApi, IPagingParams, MyApiResponse } from "@/shared/lib/createBaseApi";
import baseAxios from "../shared/config/baseAxios";

const CONTROLLER = "/role"

export const roleService = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<IRole>(CONTROLLER, baseAxios),

    getAdminRole: (paging?: IPagingParams) => {
        return baseAxios.get<MyApiResponse<IRole[]>>(CONTROLLER + `/GetAdminRole`, {
            params: paging
        });
    },
    getRolePermission: (params: { roleId?: number }) => {
        return baseAxios.get<MyApiResponse<IRole[]>>(CONTROLLER + "/GetRolePermission", {
            params
        })
    },
    getUserPermission: (params: { userId?: number }) => {
        return baseAxios.get<MyApiResponse<IRole[]>>(CONTROLLER + "/GetUserPermission", {
            params
        })
    },
    updateRolePermission: (body?: { pagePermissions?: IRole[], roleId?: number }) => {
        return baseAxios.put<MyApiResponse<IRole[]>>(CONTROLLER + "/UpdateRolePermission", body)
    },
    updateUserPermission: (body?: { pagePermissions?: IRole[], userId?: number }) => {
        return baseAxios.put<MyApiResponse<IRole[]>>(CONTROLLER + "/UpdateUserPermission", body)
    },
    addUser: (params: { userId?: number }, roleIds: number[]) => {
        return baseAxios.post<MyApiResponse<IRole[]>>(CONTROLLER + "/AddUser", { params, body: roleIds })
    },
    addUsers: (params: { roleId?: number }, userIds: number[]) => {
        return baseAxios.post<MyApiResponse<IRole[]>>(
            CONTROLLER + "/AddUsers",
            userIds,
            { params }
        );
    },
    addUsersByCode: (params: { roleId?: number }, codes?: string[]) => {
        return baseAxios.post<MyApiResponse<IRole[]>>(CONTROLLER + "/AddUsersByCode", codes, { params })
    },
    removeUsersFromRole: ({
        roleId,
        userIds,
    }: {
        roleId?: number;
        userIds: number[];
    }) => {
        return baseAxios.post<MyApiResponse<IRole[]>>(
            CONTROLLER + "/RemoveUsersFromRole",
            userIds,                 // body
            { params: { roleId } }       // query param
        );
    },
    getUserByRole: (params: { roleId?: number }) => {
        return baseAxios.get<MyApiResponse<IRole[]>>(CONTROLLER + "/GetUserByRole", {
            params
        })
    }
}
