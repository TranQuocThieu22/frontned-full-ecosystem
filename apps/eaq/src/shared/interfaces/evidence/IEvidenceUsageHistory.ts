import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { ICriteria } from "../criteria/Criteria";
import { IEvaluationPlan } from "../evaluationPlan/IEvaluationPlan";
import { IGrade } from "../grade/IGrade";
import { IStandard } from "../standard/Standard";
import { ITrainingProgram } from "../trainingProgram/ITrainingProgram";
import { IEnvidenceVersion } from "./IEnvidenceVersion";
import { IEvidence } from "./IEvidence";

export interface IEvidenceUsageHistory extends BaseEntity {
  eaqEvidenceId: number;
  eaqEvidence: IEvidence;
  versionId: number;
  usedVersion: IEnvidenceVersion;
  selfAssessmentId: number;
  eaqCriteria: ICriteria;
  eaqStandard: IStandard;
  eaqGrade: IGrade;
  eaqTrainingProgram: ITrainingProgram;
  eaqEvaluationPlan: IEvaluationPlan;
  eaqEvidenceCurrentVersion?: IEnvidenceVersion;
}
