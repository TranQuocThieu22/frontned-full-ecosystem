import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Exam } from "@/shared/interfaces/exam";
import { User } from "@/shared/interfaces/user";

export interface ExamRegistration extends BaseEntity {
  userId?: number;
  user?: User;
  exam?: Exam;
  courseTimeClusterId?: number;
  courseSectionId?: number;
  receiptType?: number;
  receiptCode?: string;
  receiptPrice?: string;
  receiptLink?: string;
  receiptNote?: string;
  note?: string;
  isCheck?: boolean;
  totalPoint?: number;
  isPass?: boolean;
}
