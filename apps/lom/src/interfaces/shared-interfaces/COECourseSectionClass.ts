import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Class } from "./Class";
import { COECourseSection } from "./COECourseSection";

export interface COECourseSectionClass extends BaseEntity {
    coeCourseSectionId?: number;
    coeCourseSection?: COECourseSection

    classId?: number;
    class?: Class
}