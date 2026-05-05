import { IRequirement } from "@/shared/interfaces/requirement/Requirement";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import ILimitation from "../limitation/ILimitation";
import { ITaskDetail } from "../task/ITaskDetail";

export interface IAnalysis extends BaseEntity {
  description: string;
  question: string;
  eaqLimitationId: number;
  eaqLimitation?: ILimitation;
  eaqLimitations?: ILimitation[];
  eaqTaskDetails?: ITaskDetail[];
  eaqRequirements?: IRequirement[];
  eaqRequirement?: IRequirement;
  duration?: string;
  eaqRequirementId?: number;
}
