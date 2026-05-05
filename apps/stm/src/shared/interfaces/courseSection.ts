import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { User } from "./user";
import { CourseTimeClusters } from "./courseTimeClusters";
import { Exam } from "./exam";

export interface CourseSection extends BaseEntity {
    user?: User;
    userId?: number;
    courseSection?: CourseSection;
    courseSectionId?: number;
    courseTimeCluster?: CourseTimeClusters;
    courseTimeClusterId?: number;
    receiptType?: number;
    receiptCode?: string;
    receiptNote?: string;
    receiptPrice?: string;
    receiptLink?: string;
    isCheck?: boolean;
    totalPoint?: number;
    isPass?: boolean;
    note?: string;
    exam?: Exam;
}
