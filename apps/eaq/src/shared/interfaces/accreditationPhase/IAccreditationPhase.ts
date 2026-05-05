import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { IAssessmentCouncilDecision } from "../assessmentCouncilDecision/IAssessmentCouncilDecision";
import { IStandardSet } from "../standardSet/StandardSet";
import { ITrainingProgram } from "../trainingProgram/ITrainingProgram";

export interface IAccreditationPhase extends BaseEntity {
  note: string | null;
  startDate: string | null;
  endDate: string | null;
  accreditationPhaseStatus: number | null;
  eaqTrainingProgramId: number | null;
  eaqStandardSetId: number | null;
  eaqStandardSet: IStandardSet | null;
  eaqTrainingProgram: ITrainingProgram | null;
  eaqAccreditationRoadmaps: IAssessmentCouncilDecision[];
}
