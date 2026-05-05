import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Class } from "./Class";

export interface ClassActivityPlan extends BaseEntity {
    classId?: number;
    activityPlanId?: number;
    startRegistration?: Date;
    endRegistration?: Date;
    lecturerId?: number;
    userId?: number;
    subLecturerId?: number,
    class?: Class
    studentCount?: number
}

export interface ClassSubjectLecturer extends BaseEntity {
    aqClassId: number;
    majorsId: number;
    majors: null;
    concurrencyStamp: string;
    isEnabled: boolean;
}