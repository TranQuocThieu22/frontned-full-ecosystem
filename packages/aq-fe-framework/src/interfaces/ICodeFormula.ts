import { IBaseEntity } from './IBaseEntity';


export interface ICodeFormula extends IBaseEntity {
  operationType?: number;
  frequency?: number;
  objectType?: number;
  prefix?: string;
  suffix?: string;
  length?: number;
  repeatCycle?: number;
  isNumberZeroUsed?: boolean;
  concurrencyStamp?: string;
}
