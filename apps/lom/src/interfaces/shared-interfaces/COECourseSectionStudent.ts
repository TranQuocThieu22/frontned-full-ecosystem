import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"
import { User } from "@aq-fe/core-ui/shared/interfaces/User"
import { COECourseSection } from "./COECourseSection"
export interface COECourseSectionStudent extends BaseEntity {
    user?: User
    userId?: number
    coeCourseSection?: COECourseSection
    coeCourseSectionId?: number
}