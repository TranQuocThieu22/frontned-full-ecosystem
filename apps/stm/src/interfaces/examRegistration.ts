import { IBaseEntity } from "aq-fe-framework/interfaces";
import { IExam } from "./exam";
import { IUser } from "./user";

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