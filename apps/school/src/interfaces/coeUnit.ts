import { IBaseEntity } from "aq-fe-framework/interfaces";

export interface ICoeUnit extends IBaseEntity {
  unitType?: number;
  unitId?: number;
  note?: string | null;
  unit?: string | null;
}