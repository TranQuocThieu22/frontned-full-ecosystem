import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import ILimitation from "../limitation/ILimitation";
import { IRequirement } from "../requirement/Requirement";
import { IStandard } from "../standard/Standard";

export interface ICriteria extends BaseEntity {
  englishName?: string;
  evidence?: string | null;
  note?: string | null;
  eaqStandardId?: number;
  eaqStandard?: IStandard;
  eaqStandardCode?: string;
  nameEg?: string | null;
  eaqLimitations?: ILimitation[];
  eaqRequirements?: IRequirement[];
}
