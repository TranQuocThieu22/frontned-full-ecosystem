import { Account, StudentList } from "@/interfaces/account";
import { CurrentUser } from "@/interfaces/currentUser";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { createBaseApi, CustomApiResponse, PagingParams } from "@aq-fe/core-ui/shared/libs/createBaseApi";
const CONTROLLER = '/Account'


interface Params extends BaseEntity {
    planId?: number,
    facultyId?: number,
    isStudent?: boolean,
    isActive?: boolean,
    name?: string,
    paging?: PagingParams,
}

export const service_account = {
    ...createBaseApi<Account>(`${CONTROLLER}`, axiosInstance),

    //GetCurrentUser
    getCurrentUser: () => {
        return axiosInstance.get<CustomApiResponse<CurrentUser>>(`${CONTROLLER}/GetCurrentUser`)
    },

    //GetStudentList
    getStudentList: (params: Params) => {
        return axiosInstance.get<CustomApiResponse<StudentList[]>>(`${CONTROLLER}/GetStudentList`, {
            params: {
                pageSize: params.paging?.pageSize,
                pageNumber: params.paging?.pageNumber,
                name: params.name
            }
        })
    },

    getAdminAccount: (params: { paging?: PagingParams, name?: string }) => {
        return axiosInstance.get<CustomApiResponse<Account[]>>(`${CONTROLLER}/GetAdminAccount`, {
            params: {
                pageSize: params.paging?.pageSize,
                pageNumber: params.paging?.pageNumber,
                name: params.name
            }
        })
    },
    // GetAllLecturer
    getAllLecturer: (params: BaseEntity) => {
        return axiosInstance.get<CustomApiResponse<Account[]>>(`${CONTROLLER}/GetAllLecturer`, {
            params: params,
            // headers: {
            //     "Origin": "http://localhost:3000"
            // }
        })
    },
    AQDataActivityPlan: () => {
        return axiosInstance.post<CustomApiResponse<string>>(`${CONTROLLER}/AQDataActivityPlan`)
    },
    AQDataStudent: (body: any) => {
        return axiosInstance.post<CustomApiResponse<string>>(`${CONTROLLER}/AQDataStudent`, body)
    },
    //GetGoogleSetting
    getGoogleSetting: () => {
        return axiosInstance.get<CustomApiResponse<{ clientId: string }>>(`${CONTROLLER}/GetGoogleSetting`)
    }
}
