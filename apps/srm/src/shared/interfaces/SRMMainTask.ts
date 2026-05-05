import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail"
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"

export interface SRMMainTask extends BaseEntity {
    order?: number
    content?: string
    plannedOutcome?: string
    actualOutcome?: string
    startDate?: string
    endDate?: string
    estimatedBudget?: number
    actualBudget?: number
    attachmentPath?: string
    attachmentDetail?: AQFileDetail
    note?: string
    srmContractReportHistoryId?: number
}