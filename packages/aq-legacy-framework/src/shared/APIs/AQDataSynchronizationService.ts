import { CustomApiResponse } from "@aq-fe/aq-legacy-framework/shared/libs/core/createBaseApi"
import axiosInstance from "@aq-fe/aq-legacy-framework/shared/configs/axiosInstance"
import { SyncBatchHistory } from "@aq-fe/aq-legacy-framework/shared/interfaces/SyncBatchHistory"
import { SyncBatchLog } from "@aq-fe/aq-legacy-framework/shared/interfaces/SyncBatchLog"

const CONTROLLER = "/AQDataSynchronization"

//Đồng bộ
export const AQDataSynchronizationService = {
    // Kiểm tra trạng thái đồng bộ
    checkSyncStatus: (syncBatchLogId?: number) => {
        return axiosInstance.get<CustomApiResponse<SyncBatchLog>>(CONTROLLER + `/CheckSyncStatus?syncBatchLogId=${syncBatchLogId}`)
    },
    getSyncBatchLogHistory: () => {
        return axiosInstance.get<CustomApiResponse<SyncBatchHistory[]>>(CONTROLLER + "/GetSyncBatchLogHistory")
    },
    // Danh mục đơn vị
    AQDataAQDataUnit: () => {
        return axiosInstance.post<CustomApiResponse<null>>(CONTROLLER + "/AQDataAQDataUnit")
    },
    // Danh mục bậc hệ đào tạo
    AQDataDegreeLevel: () => {
        return axiosInstance.post<CustomApiResponse<null>>(CONTROLLER + "/AQDataDegreeLevel")
    },
    // Danh mục bậc đào tạo
    AQDataEducationLevel: () => {
        return axiosInstance.post<CustomApiResponse<null>>(CONTROLLER + "/AQDataEducationLevel")
    },
    // Danh mục hệ đào tạo
    AQDataSystem: () => {
        return axiosInstance.post<CustomApiResponse<null>>(CONTROLLER + "/AQDataSystem")
    },
    // Danh mục Quy chế / Thông tư
    AQDataRegulation: () => {
        return axiosInstance.post<CustomApiResponse<null>>(CONTROLLER + "/AQDataRegulation")
    },
    // Danh mục chương trình (ngành)
    AQDataMajor: () => {
        return axiosInstance.post<CustomApiResponse<null>>(CONTROLLER + "/AQDataMajor")
    },
    // Danh mục khóa / khối đào tạo
    AQDataFieldOfStudy: () => {
        return axiosInstance.post<CustomApiResponse<null>>(CONTROLLER + "/AQDataFieldOfStudy")
    },
    // Danh mục môn học
    AQDataSubject: () => {
        return axiosInstance.post<CustomApiResponse<null>>(CONTROLLER + "/AQDataSubject")
    },
    // Chương trình đào tạo
    AQDataTrainingProgram: () => {
        return axiosInstance.post<CustomApiResponse<null>>(CONTROLLER + "/AQDataTrainingProgram", {})
    },
    // Danh mcuj năm học học kỳ
    AQDataActivityPlan: () => {
        return axiosInstance.post<CustomApiResponse<null>>(CONTROLLER + "/AQDataActivityPlan")
    },
    // Danh sách sinh viên học kỳ
    AQDataStudent: ({ params }: { params: { semester?: number } }) => {
        return axiosInstance.post<CustomApiResponse<null>>(CONTROLLER + "/AQDataStudent", null, { params: params })
    },
    // Danh mục lớp
    AQDataClass: () => {
        return axiosInstance.post<CustomApiResponse<null>>(CONTROLLER + "/AQDataClass")
    },
    // Danh mục lớp học kỳ
    AQDataClassSemester: ({ params }: { params: { semester?: number } }) => {
        return axiosInstance.post<CustomApiResponse<null>>(CONTROLLER + "/AQDataClassSemester", null, { params: params })
    },
    // Danh mục nhóm học
    AQDataCourseSection: ({ params }: { params: { semester?: number } }) => {
        return axiosInstance.post<CustomApiResponse<SyncBatchLog>>(CONTROLLER + "/AQDataCourseSection", null, { params: params })
    },
    // Quản lí tài khoản
    AQDataManager: () => {
        return axiosInstance.post<CustomApiResponse<null>>(CONTROLLER + "/AQDataManager")
    },
    // Danh mục sinh viên
    AQDataStudentFull: () => {
        return axiosInstance.post<CustomApiResponse<null>>(CONTROLLER + "/AQDataStudentFull")
    },
    // Danh mục nhân sự/ viên chức
    AQDataLecturer: () => {
        return axiosInstance.post<CustomApiResponse<string>>(CONTROLLER + "/AQDataLecturer")
    },
    AQCourseSectionEnrollment: ({ params }: { params: { semester?: number } }) => {
        return axiosInstance.post<CustomApiResponse<SyncBatchLog>>(CONTROLLER + "/AQCourseSectionEnrollment", null, { params: params })
    },
    GetInfoById: (syncBatchLogId?: number) => {
        return axiosInstance.get<CustomApiResponse<SyncBatchLog>>(CONTROLLER + `/GetInfoById?logId=${syncBatchLogId}`)
    },
    EdusoftCourseSectionStudentPointSync: (body: { semester?: number, filter?: EdusoftCourseSectionStudentPointSyncFilter[] }) => {
        return axiosInstance.post<CustomApiResponse<SyncBatchLog>>(CONTROLLER + "/edusoft-course-section-student-point-sync", body)
    },
}

export interface EdusoftCourseSectionStudentPointSyncFilter {
    subjectCode?: string;
    courseSectionName?: string
}