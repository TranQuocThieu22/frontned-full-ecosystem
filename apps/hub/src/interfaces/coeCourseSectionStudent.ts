import { IBaseEntity } from "aq-fe-framework/interfaces"
import { ICOECourseSection } from "./coeCourseSection"
export interface ICoeCourseSectionStudent extends IBaseEntity {
    user?: IUser
    userId?: number
    coeCourseSection?: ICOECourseSection
    coeCourseSectionId?: number
}