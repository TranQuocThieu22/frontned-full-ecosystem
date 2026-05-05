import { IProgram } from "@/modules-features/admin/ModuleExam/CRUDExam/Interfaces/MutateExam";
import { ISimpleViewModel } from "../BaseModel/ISimpleViewModel";

export interface IUserProgram extends ISimpleViewModel {
  userId?: number;
  programId?: number;
  program?: IProgram;
}
