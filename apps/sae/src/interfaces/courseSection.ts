import { Course } from "@/interfaces/course"
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface CourseSection extends BaseEntity {
    courseId?: number
    course?: Course
}
