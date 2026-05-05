import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface Department extends BaseEntity {
  type?: number | null;
  isWorkingUnit?: boolean;
}
