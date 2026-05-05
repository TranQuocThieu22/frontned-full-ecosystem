import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMCompletedProduct } from "./SRMCompletedProduct";
import { SRMContract } from "./SRMContract";
import { SRMMainTask } from "./SRMMainTask";
import { SRMTrainingOutcome } from "./SRMTrainingOutcome";

export interface SRMContractReportHistory extends BaseEntity {
    /** Thứ tự */
    order?: number
    /** Ngày báo cáo */
    reportDate?: string
    /** Ghi chú */
    note?: string
    /** id đề tài */
    srmContractId?: number,
    /** Trạng thái báo cáo */
    submittedType?: number
    srmContract?: SRMContract
    isSubmitted?: boolean
    srmMainTasks?: SRMMainTask[]
    reviewStatus?: number
    srmCompletedProducts?: SRMCompletedProduct[]
    srmTrainingOutcomes?: SRMTrainingOutcome[]
    totalCost?: number
    /** Trạng thái thực hiện */
    implementationProgress?: number
    isSendMail?: boolean
    review?: string

    leaderName?: string
}