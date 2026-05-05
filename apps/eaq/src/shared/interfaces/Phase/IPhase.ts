import { StandardSetTrainingProgram } from '@/shared/interfaces/standardSetTrainingProgram/TrainingProgramStandardSet';
import { BaseEntity } from '@aq-fe/core-ui/shared/interfaces/BaseEntity';
import { IAssessmentCouncilDecision } from '../assessmentCouncilDecision/IAssessmentCouncilDecision';
import { IStandardSet } from '../standardSet/StandardSet';
import { ITrainingProgram } from '../trainingProgram/ITrainingProgram';

export interface IPhase extends BaseEntity {
    note?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    phaseStatus?: number | null;
    eaqTrainingProgramId?: number | null;
    eaqStandardSetId?: number | null;
    eaqStandardSet?: IStandardSet | null;
    eaqTrainingProgram?: ITrainingProgram | null;
    eaqRoadmaps?: IAssessmentCouncilDecision[];
    isCurrent?: boolean | null;

    // For Excel import file
    startDateValue?: string | null;
    endDateValue?: string | null;
    trainingProgramCode?: string
    isCurrentValue?: number
    eaqStandardSetTrainingProgramId?: number
    eaqStandardSetTrainingProgram?: StandardSetTrainingProgram
}
