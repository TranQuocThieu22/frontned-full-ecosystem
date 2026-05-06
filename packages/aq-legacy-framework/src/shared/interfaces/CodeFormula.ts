import { BaseEntity } from './BaseEntity';


export interface CodeFormula extends BaseEntity {
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
