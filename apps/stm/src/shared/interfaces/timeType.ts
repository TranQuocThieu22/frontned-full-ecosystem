import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { TimeTypeDetail } from "./timeTypeDetail";

export interface TimeType extends BaseEntity {
    classPeriodMorning?: number;
    classPeriodAfternoon?: number;
    classPeriodEvening?: number;
    timeTypeDetails?: TimeTypeDetail[];
}
