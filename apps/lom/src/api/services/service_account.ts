import { StudentList } from "@/interfaces/shared-interfaces/StudentList";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { createBaseApi, CustomApiResponse, PagingParams } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/Account"
interface IParams extends BaseEntity {
    planId?: number,
    facultyId?: number,
    isStudent?: boolean,
    isActive?: boolean,
    name?: string,
    codeOrName?: string,
    paging?: PagingParams,
    cols?: string
}

export const service_account = {
    ...createBaseApi<Account>(CONTROLLER, baseAxios),
    getCOEStudentInfo: ({ studentId }: { studentId?: number }) => {
        return baseAxios.get<CustomApiResponse<ICOEStudentInfoRes>>(CONTROLLER + `/COEStudentInfo?studentId=${studentId}`)
    },
    getAdminAccount: (params: { paging?: PagingParams, name?: string }) => {
        return baseAxios.get<CustomApiResponse<Account[]>>(`${CONTROLLER}/GetAdminAccount`, {
            params: {
                pageSize: params.paging?.pageSize,
                pageNumber: params.paging?.pageNumber,
                name: params.name
            }
        })
    },
    getAllLecturer: () => {
        return baseAxios.get<CustomApiResponse<Account[]>>(`${CONTROLLER}/GetAllLecturer`)
    },
    getStudentList: (params: IParams) => {
        return baseAxios.get<CustomApiResponse<StudentList[]>>(`${CONTROLLER}/GetStudentList`, {
            params: {
                pageSize: params.paging?.pageSize,
                pageNumber: params.paging?.pageNumber,
                name: params.name
            }
        })
    },
    getStudentCOE: (params: IParams) => {
        return baseAxios.get<CustomApiResponse<StudentList[]>>(`${CONTROLLER}/GetStudentCOE`, {
            params: {
                pageSize: params.paging?.pageSize,
                pageNumber: params.paging?.pageNumber,
                codeOrName: params.codeOrName,
                cols: params.cols
            }
        })
    },
}


export interface ICOEStudentInfoRes extends Account {
    className?: string,
    coeGradeName?: string,
    coeGradeId?: number,
    coeProgramName?: string
    coeProgramId?: number
}
