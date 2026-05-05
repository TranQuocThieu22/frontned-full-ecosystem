import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Event } from './event';

export interface ActivityPlan extends BaseEntity {
  hierarchyId?: number;
  hierarchy?: string;
  facultyId?: number;
  faculty?: string;
  academicYearId?: number;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  events?: Event[];
  approvalStatus?: number;
  host?: number | null;
}
