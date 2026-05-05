import { IBaseEntity } from "aq-fe-framework/interfaces"
import { ITimeTypeDetail } from "./timeTypeDetail"
export interface ITimeType extends IBaseEntity {
    classPeriodMorning?: number,
    classPeriodAfternoon?: number,
    classPeriodEvening?: number,
    timeTypeDetails?: ITimeTypeDetail[]
}