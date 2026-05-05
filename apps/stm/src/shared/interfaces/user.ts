import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { CourseSectionStudentPoints } from "./courseSectionStudentPoints";

export interface User extends BaseEntity {
    userName?: string;
    fullName?: string;
    email?: string;
    gender?: number;
    dateOfBirth?: Date;
    phoneNumber?: string;
    courseSectionStudentPoints?: CourseSectionStudentPoints[];
}
