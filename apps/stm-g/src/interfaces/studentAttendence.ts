import { ISimpleViewModel } from "@/interfacesForViewModels/BaseModel/ISimpleViewModel";
import { IUser } from "./user";

export interface IstudentAttendence extends ISimpleViewModel {
  courseSectionScheduleId?: number;
  userId?: number;
  lecturerReview?: string | null;
  status?: number;
  user?: IUser;
}
