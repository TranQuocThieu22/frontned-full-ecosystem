import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface COEDegreeLevel extends BaseEntity {
    nameEg?: string;
    coeRegulationId?: number;
    coeTrainingSystemId?: number;
    coeTrainingLevelId: number;
    numSemestersMax?: number;
    numSemestersProgram?: number;
    numSemestersYear?: number;
    coeRegulation?: BaseEntity;
    coeTrainingSystem?: BaseEntity;
    coeTrainingLevel?: BaseEntity;
}