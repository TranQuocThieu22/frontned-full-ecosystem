import { IBaseEntity } from "aq-fe-framework/interfaces";

export interface I_TuitionFee extends IBaseEntity {
  programCode?: string; // Mã chương trình
  programName?: string; // Tên chương trình
  campusCode?: string;
  campusName?: string;
  courseSectionCode?: string;
  courseSectionName?: string;
  levelCode?: string;
  levelName?: string;
  price?: number;
  note?: string;
}
