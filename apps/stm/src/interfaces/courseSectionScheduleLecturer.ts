import { ISimpleViewModel } from "@/interfacesForViewModels/BaseModel/ISimpleViewModel";
import { IUser } from "./user";

export interface ICourseSectionScheduleLecturer extends ISimpleViewModel {
  userId?: number;
  courseSectionScheduleId?: number;
  user?: IUser;
}
