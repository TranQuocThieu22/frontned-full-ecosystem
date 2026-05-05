import { COECourseSectionStudent } from "@/interfaces/shared-interfaces/COECourseSectionStudent";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/COECourseSectionStudent"

export const service_COECourseSectionStudent = {
    // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
    ...createBaseApi<COECourseSectionStudent>(CONTROLLER, baseAxios),
    getByStudent: ({ studentId }: { studentId?: number }) => {
        return baseAxios.get<CustomApiResponse<COECourseSectionStudent[]>>(CONTROLLER + "/GetByStudent", {
            params: {
                studentId
            }
        })
    },
    getStudentReport: (params: {
        studentId?: number,
        courseSectionId?: number,
        coeGradeSubjectId?: number
        formulaType?: number,
        classId?: number
        [key: string]: any
    }) => {
        return baseAxios.get<CustomApiResponse<IStudentReportRes[]>>(CONTROLLER + "/StudentReport", {
            params
        })
    },
    StudentReports: ({ param = "" }: { param?: string }) => {
        return baseAxios.get<CustomApiResponse<IStudentReportRes[]>>(CONTROLLER + `/StudentReport?${param}`)
    },
    StudentSplitPoint: ({ body }: { body?: number[] }) => {
        return baseAxios.post<CustomApiResponse<IStudentReportRes[]>>(CONTROLLER + `/StudentSplitPoint?`, body)
    },
}
export interface IStudentReportRes {
    studentId?: number;
    studentName?: string;
    subjectName?: string
    subjectCode?: string;
    semesterName?: string
    gradeSubjectPointResult?: number;
    studentPoints?: IStudentPoint[];
    studentCLOResults?: IStudentCLOResult[];
    studentPLOResults?: IStudentPLOResult[];
}

export interface IStudentPLOResult {
    ploId?: number;
    ploName?: string;
    ploCode?: string;
    ploDescription?: string;
    ploPassedDensity?: number;
    ploDensity?: number;
    ploResult?: number;
    isPassed?: boolean;
}
export interface IStudentPoint {
    cloId?: number;
    cloName?: string;
    cloCode?: string;
    cloDescription?: string;
    medthodMaxPoint?: number;
    formulaType?: number;
    densityMethodCLO?: number;
    point?: number;
    assessmentName?: string;
    assessmentId?: number;
    point10?: number;
}

export interface IStudentCLOResult {
    cloId?: number;
    cloName?: string;
    cloCode?: string;
    cloDescription?: string;
    point?: number;
    cloPassedDensity?: number
    isPassed?: boolean;
}
