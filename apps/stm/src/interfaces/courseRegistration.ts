import { IBaseEntity, IUser } from "aq-fe-framework/interfaces";
import { ICourseSection } from "./courseSection";
import { IExam } from "./exam";

export interface ICourseRegistration extends IBaseEntity {
    userId?: number;
    user?: IUser
    courseTimeClusterId?: number;
    courseSectionId?: number;
    courseSection?: ICourseSection
    receiptType?: number;
    receiptCode?: string;
    receiptPrice?: string;
    receiptLink?: string;
    receiptNote?: string;
    note?: string;
    isCheck?: boolean;
    priceConfigId?: number;
    type?: number;
    name?: string;
    timeCluster?: string;
    studyDate?: string;
    examDate?: string;
    price?: number;
    exam?: IExam
    totalPoint?: number,
    isPass?: boolean
}
