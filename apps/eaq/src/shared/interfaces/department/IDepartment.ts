import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface IDepartment extends BaseEntity {
  type?: number | null;
  unitId?: number | null;
  note?: string;
  unit?: IDepartment | null;
}
