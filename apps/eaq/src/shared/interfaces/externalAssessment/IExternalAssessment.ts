import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { IPhase } from "../Phase/IPhase";
import { ITrainingProgram } from "../trainingProgram/ITrainingProgram";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface IExternalAssessment extends BaseEntity {
    documentDate?: string;
    documentType?: number;
    documentFilePath?: string;
    note?: string;
    documentFileDetail?: AQFileDetail;
    eaqPhaseId?: number;
    eaqPhase?: IPhase;
    eaqTrainingProgramId?: number;
    eaqTrainingProgram?: ITrainingProgram;
}
