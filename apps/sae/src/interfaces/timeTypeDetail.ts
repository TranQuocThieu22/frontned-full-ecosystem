import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface TimeTypeDetail extends BaseEntity {
    timeTypeId?: number,
    startHour?: Date,
    order?: number,
    minuteNumber?: number,
    isStartTest?: boolean
}
