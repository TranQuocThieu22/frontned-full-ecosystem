import { ISkillCenter } from "@/modules-features/admin/ModuleExam/CRUDExam/Interfaces/MutateExam";
import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";

export interface IUserSkillCenter extends ISimpleViewModel {
  userId?: number;
  skillCenterId?: number;
  skillCenter?: ISkillCenter;
}
