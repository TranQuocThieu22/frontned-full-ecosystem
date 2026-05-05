import { ISimpleViewModel } from "@/interfacesForViewModels/BaseModel/ISimpleViewModel";
import { IAddress } from "./address";
import { ICourseSection } from "./courseSection";
import { ICourseSectionScheduleLecturer } from "./courseSectionScheduleLecturer";

export interface ICourseSectionSchedule extends ISimpleViewModel {
  subjectName?: string | null;
  courseSectionId?: number;
  addressId?: number;
  classPeriodStart?: number;
  classPeriodEnd?: number;
  startDate?: Date; // or Date
  endDate?: Date;   // or Date
  timeClusterCode?: string;
  timeClusterName?: string;
  status?: number | null;
  lecturerReview?: string | null;
  totalMinute?: number;
  attendenceNumber?: number;
  courseSection?: ICourseSection;
  address?: IAddress;
  courseSectionScheduleLecturer?: ICourseSectionScheduleLecturer[];
}
