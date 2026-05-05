import { IBaseEntity } from "aq-fe-framework/interfaces";

export interface ICoeSubjectMethod extends IBaseEntity {
  coeSubjectAssessmentId?: number;
  coecloId?: number;
  questionQuantity?: number;
  maxPoint?: number;
}
