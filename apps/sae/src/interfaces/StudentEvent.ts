import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";import { Event } from "./event";

export interface StudentEvent extends BaseEntity {
    studentId?: number;
    eventId?: number;
    point?: number;
    event?: Event;
    studentName?: string;
    studentCode?: string;
    className?: string;
    facultyName?: string;
    isRegistration?: boolean,
    isParticipation?: boolean,
    activityPlanId?: number,
    dateOfBirth?: string,
    gender?: number,
}