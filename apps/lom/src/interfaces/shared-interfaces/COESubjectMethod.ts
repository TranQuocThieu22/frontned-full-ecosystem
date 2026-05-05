import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { COECLO } from "./COECLO";
import { COESubjectFormula } from "./COESubjectFormula";

export interface COESubjectMethod extends BaseEntity {
  coeSubjectAssessmentId?: number;
  coecloId?: number;
  questionQuantity?: number;
  maxPoint?: number;
  coeclo?: COECLO
  coeSubjectFormula?: COESubjectFormula
  density?: number
  evaluation?: string
}
