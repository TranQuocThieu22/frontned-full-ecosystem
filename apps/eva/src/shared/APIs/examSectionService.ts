import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { IBaseEntity } from "aq-fe-framework/interfaces";
import { IAccount } from "./accountService";

const CONTROLLER = "/eva/ExamSection"

export const examSectionService = {
    ...createBaseApi<IExamSection>(CONTROLLER, axiosInstance),
    getExamSectionsByExamId: (params: { examId?: number, [key: string]: any }) => {
        return axiosInstance.get<CustomApiResponse<IExamSection[]>>(CONTROLLER + `/getExamSectionsByExamId`, {
            params
        })
    },
    AssignLecturerToExamSection: (body?: IAssignLecturerToExamSection) => {
        return axiosInstance.post<CustomApiResponse<IExamSection[]>>(CONTROLLER + `/AssignLecturerToExamSection`, body)
    },
    UpdateAssignLecturerToExamSection: (body?: IUpdateAssignLecturerToExamSection) => {
        return axiosInstance.post<CustomApiResponse<IExamSection[]>>(CONTROLLER + `/UpdateAssignLecturerToExamSection`, body)
    },
    GetStudentsOfExamSectionByExamSectionId: (examSectionId: number) => {
        return axiosInstance.get<CustomApiResponse<IAccount[]>>(
            CONTROLLER +
            `/GetStudentsOfExamSectionByExamSectionId?examSectionId=${examSectionId}`
        )
    },
    AddStudentToExamSection: (body: any) => {
        return axiosInstance.post<CustomApiResponse<IAccount[]>>(
            CONTROLLER +
            `/AddStudentToExamSection`, body
        )
    },
    UpdateStudentExamSectionEnrollPasswords: (body: IUpdateEnrollPassword[]) => {
        return axiosInstance.post<CustomApiResponse<IAccount[]>>(
            CONTROLLER +
            `/UpdateStudentExamSectionEnrollPasswords`, body
        )
    },
    DeleteStudentsFromExamSection: (body: IDeleteStudentFromExamSection[]) => {
        return axiosInstance.post<CustomApiResponse<IAccount[]>>(
            CONTROLLER +
            `/DeleteStudentsFromExamSection`, body
        )
    },
}
interface IUpdateEnrollPassword {
    userId?: number,
    evaExamSectionId?: number,
    enrollPassword?: string,
}
interface IDeleteStudentFromExamSection {
    userId?: number,
    evaExamSectionId?: number,
    enrollPassword?: string,
}

export interface IExamSection extends IBaseEntity {
    group?: string,
    startDate?: string,
    endDate?: string,
    startTime?: string,
    duration?: number,
    roundRule?: number,
    note?: string,
    evaSubjectId?: number,
    evaExamId?: number,
    status?: number,
    isTemp?: boolean
    subjectCode?: string,
    subjectName?: string,
    studentIds?: number[],
    lecturers?: IAccount[]


}

export interface IAssignLecturerToExamSection {
    evaExamSectionId?: number,
    userId?: number,
}
export interface IUpdateAssignLecturerToExamSection {
    lecturerId: number,
    currentExamSectionId: number,
    updateExamSectionId: number
}
