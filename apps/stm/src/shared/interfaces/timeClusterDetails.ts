import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface TimeClusterDetails extends BaseEntity {
    timeClusterId?: number;
    dayOfWeek?: number;
    startTime?: Date;
    endTime?: Date;
    classPeriodStart?: number;
    classPeriodEnd?: number;
}
