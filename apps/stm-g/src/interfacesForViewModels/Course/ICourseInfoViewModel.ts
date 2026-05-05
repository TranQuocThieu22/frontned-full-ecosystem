import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";
import { IBranchViewModel } from "../Branch/IBranchViewModel";
import { ICourseTimeClusterInfoViewModel } from "../CourseTimeCluster/ICourseTimeClusterInfoViewModel";
import { IProgramInfoViewModel } from "../Program/IProgramInfoViewModel";
import { ISkillCenterViewModel } from "../SkillCenter/ISkillCenterViewModel";

export interface ICourseInfoViewModel extends ISimpleViewModel {
    status?: number | null;
    programId?: number | null;
    startDateRegistration?: Date | null;
    endDateRegistration?: Date | null;
    testDate?: Date | null;
    studyDate?: Date | null;
    endDate?: Date | null;
    price?: number | null;
    branchId?: number | null;
    skillCenterId?: number | null;
    skillCenter?: ISkillCenterViewModel | null;
    branch?: IBranchViewModel | null;
    program?: IProgramInfoViewModel | null;
    image?: string | null;
    description?: string | null;
    courseTimeClusters?: ICourseTimeClusterInfoViewModel[] | null;
}