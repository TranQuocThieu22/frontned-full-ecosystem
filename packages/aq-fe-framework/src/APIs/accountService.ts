import { IPagePermission } from "@/interfaces";
import { IAccount } from "@/interfaces/IAccount";
import { createBaseApi, IPagingParams, MyApiResponse } from "@/shared/lib/createBaseApi";
import baseAxios from "../shared/config/baseAxios";

const CONTROLLER = "/account"

export const accountService = {
    ...createBaseApi<IAccount>(CONTROLLER, baseAxios),
    signIn: (values: { userName?: string, passWord?: string }) => {
        return baseAxios.post<MyApiResponse<ISignInRes[]>>(CONTROLLER + `/SignIn`, { values });
    },
    getAdminAccount: (params: { paging?: IPagingParams, name?: string } = {}) => {
        return baseAxios.get<MyApiResponse<IAccount[]>>(CONTROLLER + `/GetAdminAccount`, {
            params: {
                pageNumber: params.paging?.pageNumber,
                pageSize: params.paging?.pageSize,
                name: params.name
            }
        });
    },
    getAdminAccountForSetPermission: (params: { paging?: IPagingParams, name?: string } = {}) => {
        return baseAxios.get<MyApiResponse<IAccount[]>>(CONTROLLER + `/GetAdminAccountForSetPermission`, {
            params: {
                pageNumber: params.paging?.pageNumber,
                pageSize: params.paging?.pageSize,
                name: params.name
            }
        });
    },
    getEdusoftNetAccount: () => {
        return baseAxios.get<MyApiResponse<IAccount[]>>(CONTROLLER + '/GetEdusoftNetAccount')
    },
    syncAQDataLecturer: () => {
        return baseAxios.post<MyApiResponse<string>>(CONTROLLER + `/AQDataLecturer`);
    },
    syncAQDataManager: () => {
        return baseAxios.post<MyApiResponse<string>>(CONTROLLER + `/AQDataManager`);
    },
    changePassWord: (body: IChangePassWordBody) => {
        return baseAxios.post<MyApiResponse<any>>(CONTROLLER + "/ChangePassWord", body)
    }
}
export interface ISignInRes {
    workingUnitId?: number
    userName?: string,
    userId?: number,
    userFullName?: string
    token?: string
    roleIds?: number[]
    permissions?: IPagePermission[]
}

export interface IChangePassWordBody {
    userId?: number,
    currentPassWord?: string
    newPassWord?: string
}
