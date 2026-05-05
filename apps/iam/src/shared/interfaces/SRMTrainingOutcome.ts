import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail"
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"

export interface SRMTrainingOutcome extends BaseEntity {
    fullName?: string,
    startDate?: string
    endDate?: string
    degree?: string
    status?: string
    attachmentPath?: string
    attachmentDetail?: AQFileDetail
    srmContractReportHistoryId?: number
}