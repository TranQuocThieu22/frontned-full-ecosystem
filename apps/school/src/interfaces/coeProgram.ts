import { IBaseEntity } from "aq-fe-framework/interfaces";
import { ICoeUnit } from "./coeUnit";

export interface ICoeProgram extends IBaseEntity {
  note?: string;
  coeUnitId?: number;
  coeUnit?: ICoeUnit;
}
