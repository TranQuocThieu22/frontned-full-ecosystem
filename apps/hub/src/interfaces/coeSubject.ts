import { IBaseEntity } from "aq-fe-framework/interfaces";
import { ICOECourseSection } from "./coeCourseSection";
import { ICOEUnit } from "./coeUnit";

export interface ICoeSubject extends IBaseEntity {
  order?: number;
  nameEg?: string;
  numberPeriod?: number;
  numberCredit?: number;
  note?: string;
  year?: Date;
  coeUnitId?: number;
  coeUnit?: ICOEUnit;
  coeCourseSection?: ICOECourseSection;

  content?: string;
  method?: string;
  quantity?: number;
  numberOfStudent?: number;
  quantityOfPoint?: number;
  pointsEntered?: number;
}
