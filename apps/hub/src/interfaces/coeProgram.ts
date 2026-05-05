import { ICOEUnit } from "./coeUnit";

export interface ICoeProgram extends IBaseEntity {
  note?: string;
  coeUnitId?: number;
  coeUnit?: ICOEUnit;
}
