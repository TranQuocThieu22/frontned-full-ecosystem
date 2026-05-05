import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface COESubjectFormula extends BaseEntity {
    coeTrainingProgramDetail: any;
    formulaType?: number;
    rate?: number;

}