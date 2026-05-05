import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";
import { IBranchViewModel } from "../Branch/IBranchViewModel";
import { IProgramInfoViewModel } from "../Program/IProgramInfoViewModel";

export interface ISkillCenterInfoViewModel extends ISimpleViewModel {
    note?: string | null;
    branch?: IBranchViewModel[];
    program?: IProgramInfoViewModel[];
}