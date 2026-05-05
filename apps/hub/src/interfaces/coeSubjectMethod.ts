import { ICoeCLO } from "./coeCLO";
import { ICoeSubjectFormula } from "./coeSubjectFormula";

export interface ICoeSubjectMethod extends IBaseEntity {
  coeSubjectAssessmentId?: number;
  coecloId?: number;
  questionQuantity?: number;
  maxPoint?: number;
  coeclo?: ICoeCLO
  coeSubjectFormula?: ICoeSubjectFormula
  density?: number
  evaluation?: string
}
