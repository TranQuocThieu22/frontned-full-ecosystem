import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";
import { ISkillCenterViewModel } from "../SkillCenter/ISkillCenterViewModel";
export interface IBranchViewModel extends ISimpleViewModel {
    location?: string | null;
    note?: string | null;
    skillCenterId?: number | null;
    skillCenter?: ISkillCenterViewModel | null;
}