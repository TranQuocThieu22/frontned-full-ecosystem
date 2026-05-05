import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { User } from "@aq-fe/core-ui/shared/interfaces/User";
import { SRMArea } from "./SRMArea";
import { SRMConclusion } from "./SRMConclusion";
import { SRMType } from "./SRMType";
import { SRMUnit } from "./SRMUnit";

export interface SRMTaskProposal extends BaseEntity {
  objective?: string;
  registrant?: string;
  expected?: string;
  expectedOutput?: string;
  content?: string;
  estimatedBudget?: number;
  duration?: string;
  attachmentPath?: string;
  proposalStatus?: number;
  srmAreaId?: number;
  srmUnitId?: number;
  attachmentDetail?: AQFileDetail;
  image?: File;
  srmArea?: SRMArea;
  srmUnit?: SRMUnit;
  srmConclusionId?: number;
  srmConclusion?: SRMConclusion;
  userId?: number;
  user?: User;
  profileVerificationStatus?: number;
  preliminaryReview?: string;
  preliminaryIsSentMail?: boolean;
  startDate?: string;
  endDate?: string;
  requirement?: string;
  result?: string;
  proposalType?: number;
  academicYearId?: number;
  academicYear?: any;
  srmTypeId?: number;
  srmType?: SRMType;
  necessity?: string;
  type?: number;
  preliminaryStatus?: number;

  //Cho import 
  srmTypeCode?: string;
  srmAreaCode?: string;
  userCode?: string;
}
