import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";
import { ITimeClusterDetailViewModel } from "./ITimeClusterDetailViewModel";

export interface ITimeClusterViewModel extends ISimpleViewModel {
    timeTypeId?: number | null;
    timeClusterDetails?: ITimeClusterDetailViewModel[] | null;
}