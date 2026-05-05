import { IBaseEntity, IUser } from "aq-fe-framework/interfaces"
import { IExam } from "./exam";
export interface IExamRegistration extends IBaseEntity {
    userId?: number;
    user?: IUser
    exam?: IExam
    courseTimeClusterId?: number;
    courseSectionId?: number;
    receiptType?: number;
    receiptCode?: string;
    receiptPrice?: string;
    receiptLink?: string;
    receiptNote?: string;
    note?: string;
    isCheck?: boolean;
    totalPoint?: number
    isPass?: boolean
}