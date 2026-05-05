import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { COEUnit } from "./COEUnit";
import { Department } from "@aq-fe/core-ui/shared/interfaces/Department";
import { User } from "@aq-fe/core-ui/shared/interfaces/User";

export interface COEProgram extends BaseEntity {
  note?: string;
  coeUnitId?: number;
  coeUnit?: COEUnit;
  department?: Department;
  departmentId?: number;
  user?: User;
  userId?: number;
}