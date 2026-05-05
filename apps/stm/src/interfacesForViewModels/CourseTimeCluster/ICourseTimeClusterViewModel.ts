import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";
import { ITimeClusterViewModel } from "../TimeCluster/ITimeClusterViewModel";

export interface ICourseTimeClusterViewModel extends ISimpleViewModel {
    courseId?: number | null;
    timeClusterId?: number | null;
    maxStudent?: number | null;
    timeCluster?: ITimeClusterViewModel | null;
}