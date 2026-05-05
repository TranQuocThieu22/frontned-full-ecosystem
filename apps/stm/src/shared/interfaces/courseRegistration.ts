import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { CourseSection } from "@/shared/interfaces/courseSection";
import { Exam } from "@/shared/interfaces/exam";
import { User } from "@/shared/interfaces/user";

export interface CourseRegistration extends BaseEntity {
  userId?: number;
  user?: User;
  courseTimeClusterId?: number;
  courseSectionId?: number;
  courseSection?: CourseSection;
  receiptType?: number;
  receiptCode?: string;
  receiptPrice?: string;
  receiptLink?: string;
  receiptNote?: string;
  note?: string;
  isCheck?: boolean;
  priceConfigId?: number;
  type?: number;
  name?: string;
  timeCluster?: string;
  studyDate?: string;
  examDate?: string;
  price?: number;
  exam?: Exam;
  totalPoint?: number;
  isPass?: boolean;
}
