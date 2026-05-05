import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";
import { ITimeTypeDetailViewModel } from "./ITimeTypeDetailViewModel";

export interface ITimeTypeViewModel extends ISimpleViewModel {
    classPeriodMorning?: number;
    classPeriodAfternoon?: number;
    classPeriodEvening?: number;
    timeTypeDetails?: ITimeTypeDetailViewModel[];
}