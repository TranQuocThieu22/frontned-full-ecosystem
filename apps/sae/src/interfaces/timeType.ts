import { TimeTypeDetail } from "@/interfaces/timeTypeDetail";
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
interface TimeType extends BaseEntity {
    classPeriodMorning?: number,
    classPeriodAfternoon?: number,
    classPeriodEvening?: number,
    timeTypeDetails?: TimeTypeDetail[]
}
