import { IBaseEntity } from "aq-fe-framework/interfaces"
import { ICourseTimeClusters } from "./courseTimeClusters"
import { IExam } from "./exam"
import { IUser } from "./user"
export interface ICourseSection extends IBaseEntity {
    user?: IUser
    userId?: number
    courseSection?: ICourseSection
    courseSectionId?: number
    courseTimeCluster?: ICourseTimeClusters
    courseTimeClusterId?: number
    receiptType?: number
    receiptCode?: string
    receiptNote?: string
    receiptPrice?: string
    receiptLink?: string
    isCheck?: boolean
    totalPoint?: number
    isPass?: boolean
    note?: string
    exam?: IExam
}