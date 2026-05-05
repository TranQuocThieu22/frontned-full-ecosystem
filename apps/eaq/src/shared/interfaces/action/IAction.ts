import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface IAction extends BaseEntity {
  // id?: number;
  // code?: string;
  // name?: string;
  // concurrencyStamp?: string;
  // isEnabled?: boolean;
  // modifiedWhen?: Date;
  // modifiedBy?: number;
  target?: string;
  detail?: string;
  note?: string;
  unit?: string;
  action?: string;
  actionTime?: string;
  eaqSelfAssessmentId?: number;
}
