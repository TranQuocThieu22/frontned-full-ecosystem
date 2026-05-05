import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { User } from "@/shared/interfaces/user";
import { Exam } from "@/shared/interfaces/exam";

export interface ExamRegistrationListItem extends BaseEntity {
  user?: User;
  exam?: Exam;
  doiTuong?: string;
  receiptType?: number;
  receiptCode?: string;
  receiptPrice?: string;
  receiptNote?: string;
  receiptLink?: string;
}

