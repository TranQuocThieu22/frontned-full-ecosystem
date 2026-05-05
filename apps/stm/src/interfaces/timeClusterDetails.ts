import { IBaseEntity } from "aq-fe-framework/interfaces";

export interface ITimeClusterDetails extends IBaseEntity {
    timeClusterId?: number,
    dayOfWeek?: number,
    startTime?: Date,
    endTime?: Date,
    classPeriodStart?: number,
    classPeriodEnd?: number,
}