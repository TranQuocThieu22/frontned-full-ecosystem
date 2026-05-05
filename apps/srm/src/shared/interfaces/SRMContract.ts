
import { AcademicYear } from "@aq-fe/core-ui/shared/interfaces/AcademicYear";
import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMCompletedProduct } from "./SRMCompletedProduct";
import { SRMContractReportHistory } from "./SRMContractReportHistory";
import { SRMMainTask } from "./SRMMainTask";
import { SRMTopic } from "./SRMTopic";
import { SRMTrainingOutcome } from "./SRMTrainingOutcome";
import { SRMType } from "./SRMType";

export interface SRMContract extends BaseEntity {
    order?: number,

    /** Tên hợp đồng */
    contractName?: string,

    /** Mã hợp đồng */
    contractCode?: string,

    /** Số hợp đồng */
    contractNumber?: string,

    /** Ngày ký */
    signingDate?: string,

    /** Từ ngày */
    fromDate?: string,

    /** Đến ngày */
    toDate?: string,

    /** Thời gian thực hiện */
    duration?: string,

    /** Đường dẫn file hợp đồng */
    attachmentPath?: string,

    /** File hợp đồng */
    attachmentDetail?: AQFileDetail,

    /** id đề tài*/
    srmTopicId?: number,

    /** Chi tiết đề tài */
    srmTopic?: SRMTopic,

    /** id loại đề tài */
    srmTypeId?: number,

    /** Chi tiết loại đề tài */
    srmType?: SRMType,

    /** id năm học */
    academicYearId?: number,

    /** chi tiết năm học */
    academicYear?: AcademicYear,

    /** Tổng kinh phí dự toán */
    totalCost?: number,

    /** Kinh phí TW dự toán */
    centralBudget?: number,

    /** Kinh phí tỉnh dự toán */
    provincialBudget?: number,

    /** Kinh phí trường dự toán */
    universityBudget?: number,

    /** Kinh phí khác dự toán */
    otherBudget?: number

    /** Tổng kinh phí thanh toán */
    usedTotalCost?: number,

    /** Kinh phí TW thanh toán */
    usedCentralBudget?: number,

    /** Kinh phí tỉnh thanh toán */
    usedProvincialBudget?: number,

    /** Kinh phí trường thanh toán */
    usedUniversityBudget?: number,

    /** Kinh phí khác thanh toán */
    usedOtherBudget?: number,

    /** Yêu cầu nghiệm thu */
    acceptanceRequest?: string

    /** Path file báo cáo tổng kết đề tài */
    acceptanceAttachmentPath?: string

    /** File báo cáo tổng kết đề tài */
    acceptanceAttachmentDetail?: AQFileDetail

    /** Trạng thái thực hiện */
    executionStatus?: number

    /** Danh sách ngày báo cáo */
    srmContractReportHistories?: SRMContractReportHistory[]

    /** Đã nộp báo cáo tổng kết */
    isAcceptanceSubmitted?: boolean
    acceptanceSubmittedDate?: string

    srmMainTasks?: SRMMainTask[]
    srmCompletedProducts?: SRMCompletedProduct[]
    srmTrainingOutcomes?: SRMTrainingOutcome[]
    reportedAllocatedBudget?: number
    allocatedBudget?: number
    reportedUsedBudget?: number
    usedBudget?: number
    remainingBudget?: number
    nextRequestedBudget?: number
    implementationProgress?: number,
    incompleteTask?: string
    selfAssessment?: string
    nextStep?: string
    conclusionRecommendation?: string
}

export interface ISigningContractImport extends SRMContract {
    srmTypeName?: string
}