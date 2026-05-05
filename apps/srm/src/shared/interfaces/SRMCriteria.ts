import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface SRMCriteria extends BaseEntity {
  order?: number;
  evaluationType?: number;
  gradingSystem?: number;
  maxScore?: number;
  isRequired?: boolean;
  srmEvaluationCriteriaSetId?: number;
}
