import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Branch } from "./branch";

export interface UserBranch extends BaseEntity {
  userId?: number;
  branchId?: number;
  branch?: Branch;
}
