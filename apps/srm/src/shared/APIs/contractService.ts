
import { SRMCompletedProduct } from "@/shared/interfaces/SRMCompletedProduct";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { SRMContractReportHistory } from "@/shared/interfaces/SRMContractReportHistory";
import { SRMMainTask } from "@/shared/interfaces/SRMMainTask";
import { SRMTopicMember } from "@/shared/interfaces/SRMTopicMember";
import { SRMTrainingOutcome } from "@/shared/interfaces/SRMTrainingOutcome";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/srm/SRMContract"

export const contractService = {
    ...createBaseApi<SRMContract>(CONTROLLER, axiosInstance),
    GetAllByAcademicYear: (params: {
        AcademicYearId?: number,
    }) => {
        return axiosInstance.get<CustomApiResponse<SRMContract[]>>(CONTROLLER + '/GetAllByAcademicYear', { params })
    },
    getContractReportHistoryYear: (params: { AcademicYearId: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMContractReportHistory[]>>(CONTROLLER + "/GetContractReportHistoryYear", { params })
    },
    getSRMContractFinalReport: (params: {
        AcademicYearId: number,
    }) => {
        return axiosInstance.get<CustomApiResponse<SRMContract[]>>(CONTROLLER + '/GetSRMContractFinalReport', { params })
    },
    insertOrUpdateMainTaskContract: (body: SRMMainTask) => {
        return axiosInstance.post<CustomApiResponse<SRMMainTask>>(CONTROLLER + "/InsertOrUpdateMainTaskContract", body)
    },
    insertOrUpdateTrainingOutcome: (body: SRMTrainingOutcome) => {
        return axiosInstance.post<CustomApiResponse<SRMTrainingOutcome>>(CONTROLLER + "/InsertOrUpdateTrainingOutcome", body)
    },
    insertOrUpdateCompletedProduct: (body: SRMTrainingOutcome) => {
        return axiosInstance.post<CustomApiResponse<SRMCompletedProduct>>(CONTROLLER + "/InsertOrUpdateCompletedProduct", body)
    },
    updateReportContract: (body: IBodyUpdateReportContract) => {
        return axiosInstance.post<CustomApiResponse<SRMContract>>(CONTROLLER + "/UpdateReportContract", body)
    },
    updateContractFinalReport: (body: IBodyUpdateContractFinalReport) => {
        return axiosInstance.post<CustomApiResponse<SRMContract>>(CONTROLLER + "/UpdateSRMContractFinalReport", body)
    },
    getContractFilter: (data: IGetContractFilterBody) => {
        return axiosInstance.post<CustomApiResponse<SRMContract[]>>(CONTROLLER + "/GetSRMContractFilter", data)
    },
    updateTopicMemberAllocation: (body: IBodyUpdateSRMTopicMemberAllocation[]) => {
        return axiosInstance.post<CustomApiResponse<SRMContract>>(CONTROLLER + "/UpdateSRMTopicMemberAllocation", body)
    },
    contractSubmitFinalReport: (params: { SRMContractId: number }) => {
        return axiosInstance.post<CustomApiResponse<SRMContract>>(CONTROLLER + "/SRMContractSubmitFinalReport", {}, { params });
    },
    getMemberFilter: (body: IGetMemberFilterBody) => {
        return axiosInstance.post<CustomApiResponse<SRMTopicMember[]>>(CONTROLLER + "/GetMemberFilter", body)
    },
    reportSubmitted: (params: { SRMContractReportHistoryId: number }) => {
        return axiosInstance.post<CustomApiResponse<SRMContract>>(CONTROLLER + "/ReportSubmitted", {}, { params })
    },
    recurringReminder: (body: SRMContractReportHistory) => {
        return axiosInstance.post<CustomApiResponse<SRMContract>>(CONTROLLER + "/recurringReminder", body)
    },
    reviewSRMContractPeriodic: (body: IReviewSRMContractPeriodicBody) => {
        return axiosInstance.post<CustomApiResponse<SRMContract>>(CONTROLLER + "/ReviewSRMContractPeriodic", body)
    },
    /*Gán ngày báo cáo*/
    assignReportDate: (body: IAssignReportDateBody[]) => {
        return axiosInstance.post<CustomApiResponse<SRMContract>>(CONTROLLER + "/AssignReportDate", body)
    },
    deleteSRMContractReportHistorys: (body: number[]) => {
        return axiosInstance.post<CustomApiResponse<SRMContract>>(CONTROLLER + "/DeleteSRMContractReportHistorys", body)
    }
}

export interface IAssignReportDateBody {
    /*id đề tài*/
    SRMContractId: number,
    /*Chu kỳ báo cáo*/
    ReportingCycle?: number,
    /*Ngày nhắc trong tháng*/
    ReminderDate?: number,
}

export interface IGetMemberFilterBody extends BaseEntity {
    academicYearId?: number;
    startDate?: string;
    endDate?: string;
}

export interface IGetContractFilterBody {
    academicYearId?: number;
    startDate?: string;
    endDate?: string;
}

export interface IReviewSRMContractPeriodicBody extends BaseEntity {
    review?: string,
    isSentMail?: boolean,
    reviewStatus?: number
}

export interface IBodyUpdateReportContract extends BaseEntity {
    /** Tổng kinh phí được phê duyệt cho dự án/hoạt động */
    reportedAllocatedBudget?: number
    /** Kinh phí đã được cấp trong kỳ báo cáo */
    allocatedBudget?: number
    /** Kinh phí đã được cấp lũy kế đến hết kỳ báo cáo */
    reportedUsedBudget?: number
    /** Kinh phí đã sử dụng trong kỳ báo cáo */
    usedBudget?: number
    /** Kinh phí chưa sử dụng, chuyển sang kỳ tiếp theo */
    remainingBudget?: number
    /** Số kinh phí đề nghị cấp cho đợt tiếp theo */
    nextRequestedBudget?: number
    /** Tiến độ thực hiện (theo % hoặc thang đo quy định) */
    implementationProgress?: number
    /** Các nhiệm vụ/chỉ tiêu chưa hoàn thành trong kỳ báo cáo */
    incompleteTask?: string
    /** Tự đánh giá của đơn vị thực hiện (nhận xét, đánh giá khách quan) */
    selfAssessment?: string
    /** Kế hoạch, giải pháp triển khai trong kỳ tiếp theo */
    nextStep?: string
    /** Kết luận và kiến nghị gửi cơ quan quản lý/đơn vị cấp trên */
    conclusionRecommendation?: string
}

export interface IBodyUpdateContractFinalReport extends BaseEntity {
    /** Tổng kinh phí thanh toán */
    usedTotalCost?: number
    /** Kinh phí TW thanh toán */
    usedCentralBudget?: number
    /** Kinh phí tỉnh thanh toán */
    usedProvincialBudget?: number
    /** Kinh phí trường thanh toán */
    usedUniversityBudget?: number
    /** Kinh phí khác thanh toán */
    usedOtherBudget?: number
    /** Yêu cầu nghiệm thu */
    acceptanceRequest?: string
    /** Đường dẫn tệp đính kèm nghiệm thu */
    acceptanceAttachmentPath?: string
    /** File báo cáo tổng kết đề tài */
    acceptanceAttachmentDetail?: AQFileDetail
}

export interface IGetMemberFilterBody {
    /** ID năm học */
    academicYearId?: number;
    /** Ngày bắt đầu */
    startDate?: string;
    /** Ngày kết thúc */
    endDate?: string;
}

export interface IBodyUpdateSRMTopicMemberAllocation extends BaseEntity {
    order?: number;
    /** ID của đề tài SRM */
    srmTopicId?: number;
    /** ID của người dùng */
    userId?: number;
    /** ID của chức danh SRM */
    srmTitleId?: number;
    /** Phân bổ thời gian */
    timeAllocation?: number;
}

