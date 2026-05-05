import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface EventComplaint extends BaseEntity {
    eventCode?: string;
    eventName?: string;
    description?: string;
    note?: string;
    point?: number;
    complaintPoint?: number;
    newPoint?: number;
    status?: number;
    path?: string;
    studentId: number;
    studentName?: string;
    studentCode?: string;
    facultyName?: string;
    standardName?: string;
    standardCode?: string;
}