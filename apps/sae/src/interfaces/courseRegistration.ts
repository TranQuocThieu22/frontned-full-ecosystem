import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
interface CourseRegistration extends BaseEntity {
    userId?: number;
    courseTimeClusterId?: number;
    courseSectionId?: number;
    receiptType?: number;
    receiptCode?: string;
    receiptPrice?: string;
    receiptLink?: string;
    receiptNote?: string;
    note?: string;
    isCheck?: boolean;
}
