import {
    ActivityStandardInfo,
    Evidence,
    Ranking, RankingSchoolReport, ReportByFaculty, ReportCurrentPlan, ReportCurrentPlanDetailParams,
    StudentRankingDetailParams,
    StudentRankingHistoryByStudent,
    StudentRankingHistoryByStudentParams, StudentRankingInit,
    StudentRankingInitByStudentsParam,
    StudentRankingInitParams, StudentTracking
} from "@/interfaces/ranking";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = 'Ranking';

export interface StudentTrackingParams extends BaseEntity {
    facultyId?: number;
    classid?: number;
    majorsId?: number;
    pageNumber?: number,
    pageSize?: number
    activityPlanId?: number
}

export interface ReportByFacultyParams extends BaseEntity {
    activityPlanId?: number
    facultyId?: number
    pageSize?: number,
    pageNumber?: number,
}

export const service_ranking = {
    ...createBaseApi<Ranking>(`${CONTROLLER}`, axiosInstance),

    // GetHistoryByStudent
    getHistoryByStudent: (params?: StudentRankingHistoryByStudentParams) => {
        return axiosInstance.get<CustomApiResponse<StudentRankingHistoryByStudent[]>>(`${CONTROLLER}/HistoryByStudent`, {
            params
        });
    },

    // GetStudentRankingInit
    getStudentRankingInit: (params?: StudentRankingInitParams) => {
        return axiosInstance.get<CustomApiResponse<StudentRankingInit>>(`${CONTROLLER}/StudentRankingInit`, {
            params
        });
    },
    StudentRankingInitByStudents: (body?: StudentRankingInitByStudentsParam) => {
        return axiosInstance.post<CustomApiResponse<StudentRankingInit[]>>(`${CONTROLLER}/StudentRankingInitByStudents`, body);
    },

    // GetReportByFaculty
    getReportByFaculty: (params?: ReportByFacultyParams) => {
        return axiosInstance.get<CustomApiResponse<ReportByFaculty>>(`${CONTROLLER}/ReportByFaculty`, {
            params
        });
    },

    // GetReportCurrentPlan
    getReportCurrentPlan: (params?: ReportCurrentPlanDetailParams) => {
        return axiosInstance.get<CustomApiResponse<ReportCurrentPlan[]>>(`${CONTROLLER}/ReportCurrentPlan`, {
            params
        });
    },

    // GetSchoolReport
    getSchoolReport: (activityPlanId: number) => {
        return axiosInstance.get<CustomApiResponse<RankingSchoolReport>>(`${CONTROLLER}/SchoolReport?activityPlanId=${activityPlanId}`);
    },

    // StudentTracking
    getStudentTracking: (params?: StudentTrackingParams) => {
        return axiosInstance.get<CustomApiResponse<StudentTracking>>(`${CONTROLLER}/StudentTracking`, {
            params
        });
    },

    // StudentTrackingBySubLecturer
    getStudentTrackingBySubLecturer: (params?: StudentTrackingParams) => {
        return axiosInstance.get<CustomApiResponse<StudentTracking>>(`${CONTROLLER}/StudentTrackingBySubLecturer`, {
            params
        });
    },

    getStudentTrackingByLecturer: (params?: StudentTrackingParams) => {
        return axiosInstance.get<CustomApiResponse<StudentTracking>>(`${CONTROLLER}/StudentTrackingByLecturer`, {
            params
        });
    },

    // GetStudentRankingDetail
    getStudentRankingDetail: (params: StudentRankingDetailParams) => {
        return axiosInstance.get<CustomApiResponse<ActivityStandardInfo[]>>(`${CONTROLLER}/StudentRankingDetail`, {
            params
        });
    },

    getRankingDetail: (params: StudentRankingDetailParams) => {
        return axiosInstance.get<CustomApiResponse<ActivityStandardInfo[]>>(`${CONTROLLER}/RankingDetail`, {
            params
        });
    },

    studentRankingInitByStudents: (body: StudentRankingInitByStudentsBody) => {
        return axiosInstance.post<CustomApiResponse<StudentRankingInitByStudentsResponse[]>>(`${CONTROLLER}/StudentRankingInitByStudents`, body)
    },
    StudentPointComplete: (body: StudentPointCompleteViewModal) => {
        return axiosInstance.post<CustomApiResponse<any>>(`${CONTROLLER}/StudentPointComplete`, body)
    },
    DeleteTemporaryStudentPoints: (body: DeleteTemporaryStudentPointsViewModel) => {
        return axiosInstance.post<CustomApiResponse<any>>(`${CONTROLLER}/DeleteTemporaryStudentPoints`, body)
    },

}
interface DeleteTemporaryStudentPointsViewModel {
    id: number,
    code?: string,
    name?: string,
    concurrencyStamp?: string,
    isEnabled?: true
}

interface ActivityStudentInfoViewModels {
    evidences?: Evidence[]
    maxPoint?: number,
    standardMaxpoint?: number,
    standardMinPoint?: number,
    standardName?: number
}

interface StudentRankingInitByStudentsBody {
    studentIds?: number[],
    activityPlanId?: number,
    activityType?: number,
    isPreview?: boolean,
    facultyIds?: number[],
    pageSize?: number,
    pageNumber?: number
}
interface StudentPointCompleteViewModal {
    activityPlanId?: number,
    facultyId?: number,
    studentIds?: number[]
    limit?: number
}

export interface StudentRankingInitByStudentsResponse {
    activityStudentInfoViewModels?: ActivityStudentInfoViewModels[]
    classId?: number,
    classCode?: string
    className?: string,
    facultyId?: number,
    facultyCode?: string
    facultyName?: string,
    rateName?: string,
    studentCode?: string,
    studentId?: number,
    studentName?: string,
    totalPointChuaXacNhan?: number
    totalPoint?: number
}
