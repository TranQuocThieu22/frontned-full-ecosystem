import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { COEMITScale } from "./COEMITScale";
import { COESubjectGroup } from "./COESubjectGroup";

export interface COESubjectGroupMITScale extends BaseEntity {
  id: number;
  coemitScaleId?: number;
  coeSubjectGroupId?: number;
  coeSubjectGroup?: COESubjectGroup;
  coemitScale?: COEMITScale;
  note?: string;
}
