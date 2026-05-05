import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";
import { ICourseBaseViewModel } from "../Course/ICourseBaseViewModel";
import { ITimeClusterViewModel } from "../TimeCluster/ITimeClusterViewModel";

export interface ICourseTimeClusterInfoViewModel extends ISimpleViewModel {
    courseId?: number | null;
    timeClusterId?: number | null;
    maxStudent?: number | null;
    courseSectionNumberTotal?: number | null;
    courseSectionNumber?: number | null;
    timeCluster?: ITimeClusterViewModel | null;
    course?: ICourseBaseViewModel | null;
}