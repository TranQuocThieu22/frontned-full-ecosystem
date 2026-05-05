import { ITimeType } from "@/interfaces/timeType";
import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";
import { ITimeClusterDetailViewModel } from "./ITimeClusterDetailViewModel";

export interface ITimeClusterInfoViewModel extends ISimpleViewModel {
    timeTypeId?: number | null;
    timeType?: ITimeType
    timeClusterDetails?: ITimeClusterDetailViewModel[];
}