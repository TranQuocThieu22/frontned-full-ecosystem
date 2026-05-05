import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Exam } from "@/shared/interfaces/exam";
import { User } from "@/shared/interfaces/user";

export interface CertificateResult extends BaseEntity {
  userId?: string;
  user?: User;
  exam?: Exam;
  examId?: string;
  decisionNumber?: string;
  decisionDate?: Date;
  certificateDecisionId?: number;
  certificateReviewBatchId?: number;
  certificateNumber?: string;
  receivedDate?: Date;
  registrationNumber?: string;
  handoverStatus?: number;
  note?: string;
  isPass?: boolean;
  point?: number;
}
