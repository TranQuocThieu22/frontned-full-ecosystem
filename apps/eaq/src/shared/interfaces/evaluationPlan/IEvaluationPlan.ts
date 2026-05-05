import { AQFileDetail } from '@aq-fe/core-ui/shared/interfaces/AQFileDetail';
import { BaseEntity } from '@aq-fe/core-ui/shared/interfaces/BaseEntity';
import { IAssessmentCouncilDecision } from '../assessmentCouncilDecision/IAssessmentCouncilDecision';
import { IPhase } from '../Phase/IPhase';
import { IResource } from '../resource/IResource';
import { IStandardSet } from '../standardSet/StandardSet';
import { ITask } from '../task/ITask';
import { ITrainingProgram } from '../trainingProgram/ITrainingProgram';

export interface IEvaluationPlan extends BaseEntity {
  order?: number;
  assessmentObjective?: string;
  evaluationScope?: string;
  startDate?: string;
  endDate?: string;
  signer?: string;
  attachmentPath?: string;
  eaqTrainingProgramId?: number;
  eaqPhaseId?: number;
  eaqStandardSetId?: number;
  eaqAssessmentCouncilDecisionId?: number;
  attachment?: File;
  attachmentDetail?: AQFileDetail;
  eaqAssessmentCouncilDecision?: IAssessmentCouncilDecision;
  eaqTrainingProgram?: ITrainingProgram;
  eaqPhase?: IPhase;
  eaqStandardSet?: IStandardSet;
  eaqTasks?: ITask[]; // bổ sung trong main
  eaqResources?: IResource[]; // bổ sung trong main
}
