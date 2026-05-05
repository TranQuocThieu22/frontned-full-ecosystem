import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Department } from "@aq-fe/core-ui/shared/interfaces/Department";
import { IAnalysis } from "../analysis/IAnalysis";
import { ICriteria } from "../criteria/Criteria";
import { IEvidence } from "../evidence/IEvidence";
import { ITaskDetailEvidence } from "../evidence/ITaskDetailEvidence";
import { ITaskDetailRequirement } from "../requirement/ITaskDetailRequirement";
import { IUser } from "../user/IUser";
import { ITask } from "./ITask";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";

export interface ITaskDetail extends BaseEntity {
  startDate?: string;
  endDate?: string;
  note?: string;
  eaqCriteriaId?: number;
  userId?: number | null;
  eaqTaskId?: number;
  eaqTask?: ITask;
  /** Nhân sự phụ trách */
  user?: Account;
  eaqCriteria?: ICriteria;
  /// Trạng thái phân tích
  analysisStatus?: number;
  eaqTaskDetailRequirements?: ITaskDetailRequirement[];
  eaqTaskDetailEvidences?: ITaskDetailEvidence[];
  isSendMail?: boolean; // theo dõi tự đánh giá
  mailSentCount?: number; // theo dõi tự đánh giá
  /** Trạng thái kiểm tra */
  analysisTrackingStatus?: number; // theo dõi tự đánh giá
  analysisReview?: string;
  eaqEvidence?: IEvidence;
  selfAssessmentReview?: string;
  selfAssessmentTrackingStatus?: number;
  selfAssessmentStatus?: number;
  // ĐGN đã nhận xét
  isExternalCheck?: boolean;
  eaqAnalysisId?: number;
  eaqAnalysis?: IAnalysis;
  hostUnit?: Department;
  hostUnitId?: number;
  supportUnit?: string;
  /** Kết quả dự kiến */
  expectedResult?: string;
  /** Thời hạn */
  duration?: string;
  /** Lần báo cáo */
  reportCount?: number;

  /** Dùng trên UI */
  taskDetailEvidenceCodes?: string;
  /** Dùng trên UI */
  taskDetailEvidenceNames?: string;
  reviewer?: IUser
  reviewerId?: number
}
