import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { IAction } from "../action/IAction";
import { IPhase } from "../Phase/IPhase";
import { ITaskDetail } from "../task/ITaskDetail";
import { IEvidenceUsageHistories } from "./IEvidenceUsageHistories";

export interface ISelfAssessment extends BaseEntity {
  id?: number;
  description?: string;
  selfAssessmentType?: number;
  note?: string;
  status?: number;
  eaqActions?: IAction[];
  createdWhen?: string;
  fullName?: string;
  eaqPhaseId?: number;
  eaqPhase?: IPhase;
  eaqTaskDetail?: ITaskDetail;
  eaqTaskDetailId?: number;
  // eaqEvidenceIds?: number[];
  eaqEvidenceUsageHistories?: IEvidenceUsageHistories[];

  eaqEvidenceIds?: number[]
  //Cho create or update
  eaqEvidenceUsages?: Pick<
    IEvidenceUsageHistories,
    "eaqEvidenceId" | "reportName"
  >[];
}
