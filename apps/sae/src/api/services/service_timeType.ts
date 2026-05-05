import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import {createBaseApi} from "@aq-fe/core-ui/shared/libs/createBaseApi";
const CONTROLLER = 'TimeType';

interface timeTypeDetails extends BaseEntity {
    order?: number,
    startHour?: Date,
    minuteNumber?: number
}

interface I extends BaseEntity {
    classPeriodAfternoon?: number,
    classPeriodEvening?: number,
    classPeriodMorning?: number,
    timeTypeDetails?: timeTypeDetails[]
}
export const service_timeType = {
    ...createBaseApi<I>(`${CONTROLLER}`, axiosInstance),
}
