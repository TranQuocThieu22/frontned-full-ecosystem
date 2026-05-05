import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { COESubjectFormula } from "./COESubjectFormula";
import { COESubjectMethod } from "./COESubjectMethod";

export interface COESubjectAssessment extends BaseEntity {
    coeSubjectFormulaId?: number;
    coeSubjectFormula?: COESubjectFormula
    content?: string;
    assessmentWhen?: any;
    assessmentDuration?: any;
    assessmentTool?: any;
    questionType?: number;
    COEGradeSubjectId?: number;
    totalQuestion?: number;
    coeSubjectMethods?: COESubjectMethod[]
    formulaType?: number
    evaluation?: string

}