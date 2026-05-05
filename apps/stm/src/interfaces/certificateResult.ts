import { IBaseEntity, IUser } from "aq-fe-framework/interfaces"
import { IExam } from "./exam"

export interface ICertificateResult extends IBaseEntity {
    userId?: string
    user?: IUser
    exam?: IExam
    examId?: string
    decisionNumber?: string
    decisionDate?: Date
    certificateDecisionId?: number
    certificateReviewBatchId?: number
    certificateNumber?: string
    receivedDate?: Date
    registrationNumber?: string
    handoverStatus?: number
    note?: string
    isPass?: boolean
    point?: number
}