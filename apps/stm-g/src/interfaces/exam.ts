import { IBaseEntity } from "aq-fe-framework/interfaces"
import { ICertificateReviewBatch } from "./certificateReviewBatch"

export interface IExam extends IBaseEntity {
    examDate?: string
    officialExamDate?: Date
    certificateReviewBatch?: ICertificateReviewBatch
    startRegistrationDate?: string
}