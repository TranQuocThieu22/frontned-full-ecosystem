import { Class } from "./class";
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface ClassActivityPlan extends BaseEntity {
    classId?: number;
    activityPlanId?: number;
    startRegistration?: Date;
    endRegistration?: Date;
    lecturerId?: number;
    class?: Class;
    userId?: number;
    subLecturerId?: number
}

export interface ClassSubjectLecturer extends BaseEntity {
    aqClassId: number;
    majorsId: number;
    majors: null;
    concurrencyStamp: string;
    isEnabled: boolean;
}