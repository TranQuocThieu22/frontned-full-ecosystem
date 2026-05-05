import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { COECourseSection } from "./COECourseSection";
import { COEUnit } from "./COEUnit";

export interface COESubject extends BaseEntity {
  order?: number;
  nameEg?: string;
  numberPeriod?: number;
  numberCredit?: number;
  note?: string;
  year?: Date;
  coeUnitId?: number;
  coeUnit?: COEUnit;
  coeCourseSection?: COECourseSection;

  content?: string;
  method?: string;
  quantity?: number;
  numberOfStudent?: number;
  quantityOfPoint?: number;
  pointsEntered?: number;
}
