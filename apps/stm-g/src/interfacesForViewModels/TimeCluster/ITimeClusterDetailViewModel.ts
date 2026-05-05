import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";

export interface ITimeClusterDetailViewModel extends ISimpleViewModel {
    timeClusterId?: number | null;
    dayOfWeek?: number | null;
    startTime?: Date | null;
    endTime?: Date | null;
    classPeriodStart?: number | null;
    classPeriodEnd?: number | null;
}