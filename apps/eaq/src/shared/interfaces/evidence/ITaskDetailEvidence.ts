import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { ITaskDetail } from "../task/ITaskDetail";
import { IEvidence } from "./IEvidence";

export interface ITaskDetailEvidence extends BaseEntity {
  verificationStatus?: number;
  review?: string;
  isSendMail?: boolean;
  eaqTaskDetailId?: number | null;
  eaqEvidenceId?: number | null;

  /** Mã Minh chứng */
  eaqExpectedEvidenceCode?: string;
  /** Tên Minh chứng */
  eaqExpectedEvidenceName?: string;

  eaqExpectedEvidenceDate?: string;
  eaqExpectedEvidenceNote?: string;
  eaqExpectedEvidenceUnitRelease?: string;

  mailSentCount?: number | null;
  eaqTaskDetailEvidenceId?: number | null;
  taskDetailEvidence?: ITaskDetailEvidence;

  eaqEvidence?: IEvidence;
  eaqTaskDetail?: ITaskDetail;

  //Prototype

  /** Mã tiêu chí */
  criteriaCode?: string;
  /** Mã tiêu chuẩn */
  standardCode?: string;
  /** Mã yêu cầu */
  requirementCode?: string;
  /** Tên yêu cầu */
  requirementName?: string;
  /** Mã công việc */
  taskCode?: string;
  /** Tên công việc */
  taskName?: string;

  // For import
  eaqTaskDetailEvidenceCode?: string;
}
