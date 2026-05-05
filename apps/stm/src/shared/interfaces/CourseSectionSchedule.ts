import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Address } from "@/shared/interfaces/address";
import { CourseSection } from "@/shared/interfaces/courseSection";
import { CourseSectionScheduleLecturer } from "@/shared/interfaces/courseSectionScheduleLecturer";

export interface CourseSectionSchedule extends BaseEntity {
  subjectName?: string;
  courseSectionId?: number;
  addressId?: number;
  classPeriodStart?: number;
  classPeriodEnd?: number;
  startDate?: Date;
  endDate?: Date;
  timeClusterCode?: string;
  timeClusterName?: string;
  status?: number;
  lecturerReview?: string;
  totalMinute?: number;
  attendenceNumber?: number;
  courseSection?: CourseSection;
  address?: Address;
  courseSectionScheduleLecturer?: CourseSectionScheduleLecturer[];
}
