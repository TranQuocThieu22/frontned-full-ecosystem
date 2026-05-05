import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Course } from "./course";
import { TimeCluster } from "./timeCluster";

export interface CourseTimeClusters extends BaseEntity {
    courseId?: number;
    timeClusterId?: number;
    maxStudent?: number;
    timeCluster?: TimeCluster;
    course?: Course;
    courseSectionNumberTotal?: number;
    courseSectionNumber?: number;
}
