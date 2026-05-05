import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { COEMITScale } from "./COEMITScale";

export interface COESubjectGroup extends BaseEntity {
  note?: string;
  coemitScale?: COEMITScale;
}
