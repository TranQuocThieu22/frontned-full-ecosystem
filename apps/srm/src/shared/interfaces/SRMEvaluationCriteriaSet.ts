import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMConclusionSet } from "./SRMConclusionSet";
import { SRMCriteria } from "./SRMCriteria";

export interface SRMEvaluationCriteriaSet extends BaseEntity {
  order?: number;
  note?: string;
  councilType?: number;
  srmConclusionSetId?: number;
  srmConclusionSet?: SRMConclusionSet;
  srmCriterias?: SRMCriteria[];
}
