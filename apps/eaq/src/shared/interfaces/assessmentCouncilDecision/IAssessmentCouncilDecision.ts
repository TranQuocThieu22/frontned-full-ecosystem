import { AQFileDetail } from '@aq-fe/core-ui/shared/interfaces/AQFileDetail';
import { BaseEntity } from '@aq-fe/core-ui/shared/interfaces/BaseEntity';
import { IPhase } from '../Phase/IPhase';
import { IStandardSet } from '../standardSet/StandardSet';
import { ITrainingProgram } from '../trainingProgram/ITrainingProgram';
import { ICouncilGroup } from './ICouncilGroup';
import { ICouncilMemberCreate } from './ICouncilMemberCreate';

export interface IAssessmentCouncilDecision extends BaseEntity {
  decisionDate?: string;
  eaqPhaseId?: number;
  eaqPhase?: IPhase;
  eaqTrainingProgramId?: number;
  eaqTrainingProgram?: ITrainingProgram;
  signerName?: string;
  imagePath?: string | null;
  imageDetail?: AQFileDetail;
  eaqStandardSetId?: number;
  eaqStandardSet?: IStandardSet;
  eaqCouncilMembers?: ICouncilMemberCreate[];
  eaqCouncilGroups?: ICouncilGroup[];
}
