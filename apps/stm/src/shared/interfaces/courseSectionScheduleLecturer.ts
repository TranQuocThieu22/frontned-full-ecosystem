import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { User } from "@/shared/interfaces/user";

export interface CourseSectionScheduleLecturer extends BaseEntity {
  userId?: number;
  courseSectionScheduleId?: number;
  user?: User;
}
