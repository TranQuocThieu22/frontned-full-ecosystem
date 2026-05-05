import { IBaseEntity, IUser } from "aq-fe-framework/interfaces"
import { ICOECourseSection } from "./coeCourseSection"

export interface ICoeCourseSectionStudent extends IBaseEntity {
    user?: IUser
    coeCourseSection?: ICOECourseSection
}