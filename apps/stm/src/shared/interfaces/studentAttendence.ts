import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { User } from "@/shared/interfaces/user";

export interface StudentAttendence extends BaseEntity {
  courseSectionScheduleId?: number;
  userId?: number;
  lecturerReview?: string;
  status?: number;
  user?: User;
}
