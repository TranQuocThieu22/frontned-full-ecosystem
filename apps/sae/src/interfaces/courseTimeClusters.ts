import { Course } from "@/interfaces/course";
import { TimeCluster } from "@/interfaces/timeCluster";
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface CourseTimeClusters extends BaseEntity {
    timeCluster?: TimeCluster,
    course?: Course
}
