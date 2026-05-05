import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";

export interface ITimeTypeDetailViewModel extends ISimpleViewModel {
    timeTypeId?: number | null;
    order?: number | null;
    startHour?: Date | null;
    minuteNumber?: number | null;
    isStartTest?: boolean | null;
}