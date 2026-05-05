import { ActivityPlan } from './activityPlan';
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface AcademicYear extends BaseEntity {
  numberOfSemester: number;
  isCurrent: boolean;
  administrativeYearStart: string | null;
  administrativeYearEnd: string | null;
  academicYearStart: string | null;
  academicYearEnd: string | null;
  activityPlans: ActivityPlan[];
}
