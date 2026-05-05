import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface CodeFormula extends BaseEntity {
    operationType?: number;
    frequency?: number;
    objectType?: number;
    prefix?: string;
    suffix?: string;

    length?: number;
    isNumberZeroUsed?: boolean;
    concurrencyStamp?: string;
}
