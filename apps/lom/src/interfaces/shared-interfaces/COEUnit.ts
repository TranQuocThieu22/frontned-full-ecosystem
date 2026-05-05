import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface COEUnit extends BaseEntity {
  unitType?: number;
  unitId?: number;
  note?: string | null;
  unit?: string | null;
}