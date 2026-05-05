import { Branch } from "@/interfaces/branch"
import { CourseTimeClusters } from "@/interfaces/courseTimeClusters"
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface Course extends BaseEntity {
    courseTimeClusters: CourseTimeClusters
    branch?: Branch
}
