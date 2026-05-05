import { IBaseEntity } from "aq-fe-framework/interfaces";
import { ICoeSchoolYear } from "./coeSchoolYear";

export interface ICoeSemester extends IBaseEntity {
  startDate?: Date;
  endDate?: Date ;
  coeSchoolYearId?: number ;
  numberWeek?: number;
  isCurrent?: boolean;
  note?: string;
  coeSchoolYear?: ICoeSchoolYear;
}
