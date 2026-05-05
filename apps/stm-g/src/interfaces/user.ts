import { IBaseEntity } from "aq-fe-framework/interfaces"
import { ICourseSectionStudentPoints } from "./courseSectionStudentPoints"
export interface IUser extends IBaseEntity {
    userName?: string
    fullName?: string
    email?: string
    gender?: number
    dateOfBirth?: Date,
    phoneNumber?: string,
    courseSectionStudentPoints?: ICourseSectionStudentPoints[]
}