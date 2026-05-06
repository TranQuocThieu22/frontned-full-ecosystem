import { PagePermission } from "@aq-fe/aq-legacy-framework/shared/interfaces/PagePermission";
import { createBaseApi, CustomApiResponse, PagingParams } from "@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi";
import axiosInstance from "@aq-fe/aq-legacy-framework/shared/configs/axiosInstance";
import { Lecturer } from "@aq-fe/aq-legacy-framework/shared/interfaces/Lecturer";
import { Student } from "@aq-fe/aq-legacy-framework/shared/interfaces/Student";
import { StudentActivityPlan } from "@aq-fe/aq-legacy-framework/shared/interfaces/StudentActivityPlan";
import { User } from "@aq-fe/aq-legacy-framework/shared/interfaces/User";

const CONTROLLER = "/account"

export const accountService = {
    ...createBaseApi<User>(CONTROLLER, axiosInstance),
    signIn: (values: ISignInViewModel) => {
        return axiosInstance.post<CustomApiResponse<ISignInRes>>(CONTROLLER + `/SignIn`, values);
    },
    signInWithToken: (code: string) => {
        return axiosInstance.post<CustomApiResponse<ISignInRes>>(CONTROLLER + `/SignInWithToken`, null, { params: { code } });
    },
    googleLogin: (token: string) => {
        return axiosInstance.post<CustomApiResponse<ISignInRes>>(CONTROLLER + `/google-login`, token, {
            headers: { 'Content-Type': 'application/json' }
        });
    },
    getAdminAccount: (params: { paging?: PagingParams, name?: string, workingUnitId?: number } = {}) => {
        return axiosInstance.get<CustomApiResponse<User[]>>(CONTROLLER + `/GetAdminAccount`, {
            params: {
                pageNumber: params.paging?.pageNumber,
                pageSize: params.paging?.pageSize,
                name: params.name,
                workingUnitId: params.workingUnitId
            }
        });
    },
    getAdminAccountForSetPermission: (params: { paging?: PagingParams, name?: string } = {}) => {
        return axiosInstance.get<CustomApiResponse<User[]>>(CONTROLLER + `/GetAdminAccountForSetPermission`, {
            params: {
                pageNumber: params.paging?.pageNumber,
                pageSize: params.paging?.pageSize,
                name: params.name
            }
        });
    },
    getEdusoftNetAccount: () => {
        return axiosInstance.get<CustomApiResponse<User[]>>(CONTROLLER + '/GetEdusoftNetAccount')
    },
    syncAQDataManager: () => {
        return axiosInstance.post<CustomApiResponse<string>>(CONTROLLER + `/AQDataManager`);
    },
    changePassWord: (body: IChangePassWordBody) => {
        return axiosInstance.post<CustomApiResponse<any>>(CONTROLLER + "/ChangePassWord", body)
    },
    getStudentList: (params?: { pageSize?: number, pageNumber?: number, name?: string }) => {
        return axiosInstance.get<CustomApiResponse<Student[]>>(`${CONTROLLER}/GetStudentList`, {
            params
        })
    },
    getStudentCOE: (params?: { pageSize?: number, pageNumber?: number, codeOrName?: string }) => {
        return axiosInstance.get<CustomApiResponse<Student[]>>(`${CONTROLLER}/GetStudentCOE`, {
            params
        })
    },
    getAllLecturer: () => {
        return axiosInstance.get<CustomApiResponse<Student[]>>(`${CONTROLLER}/GetAllLecturer`)
    },
    getStudentActivitiyPlan: (params?: { pageSize?: number, pageNumber?: number, activityPlanId?: number }) => {
        return axiosInstance.post<CustomApiResponse<StudentActivityPlan[]>>(`${CONTROLLER}/GetStudentActivitiyPlan`, null, { params })
    },
    importStudentActivityPlan: (body?: ImportStudentActivityPlan[]) => {
        return axiosInstance.post<CustomApiResponse<any>>(`${CONTROLLER}/importStudentActivityPlan`, body)
    },
    createLecturer: (body: Lecturer) => {
        return axiosInstance.post<CustomApiResponse<any>>(`${CONTROLLER}/CreateLecturer`, body)
    },
    importLecturers: (values: Lecturer[]) => {
        return axiosInstance.post<CustomApiResponse<any>>(`${CONTROLLER}/import-lecturers`, values)
    },
    getStudentsBasicInfo: (params?: {
        codeOrFullname?: string,
        pageNumber?: number,
        pageSize?: number
    }) => {
        return axiosInstance.get<CustomApiResponse<User[]>>(`${CONTROLLER}/get-students-basic-info`, { params })
    }
}

export interface ImportStudentActivityPlan {
    activityPlanCode?: string
    studentCode?: string
}
export interface ISignInRes {
    workingUnitId?: number
    userName?: string,
    userId?: number,
    userFullName?: string
    token?: string
    roleIds?: number[]
    permissions?: PagePermission[]
}

export interface ISignInViewModel {
    userName?: string;
    passWord?: string;
    rememberMe?: boolean;
}

export interface IAQSSOViewModel {
    token?: string;
    clientId?: string;
}

export interface IChangePassWordBody {
    userId?: number,
    currentPassWord?: string
    newPassWord?: string
}
