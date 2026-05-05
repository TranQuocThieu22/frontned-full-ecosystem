import { IBaseEntity } from "aq-fe-framework/interfaces";

export interface ITimeTypeDetail extends IBaseEntity {
    timeTypeId?: number,
    startHour?: string,
    order?: number,
    minuteNumber?: number,
    isStartTest?: boolean
}