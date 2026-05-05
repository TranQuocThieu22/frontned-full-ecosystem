import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { COESchoolYear } from "./COESchoolYear";

export interface COESemester extends BaseEntity {
  startDate?: string;
  endDate?: string;
  coeSchoolYearId?: number;
  numberWeek?: number;
  isCurrent?: boolean;
  note?: string;
  coeSchoolYear?: COESchoolYear;
}
