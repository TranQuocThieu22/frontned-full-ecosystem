import { IBranch } from "@/interfaces/branch";
import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";

export interface IUserBranch extends ISimpleViewModel {
  userId?: number;
  branchId?: number;
  branch?: IBranch;
}
