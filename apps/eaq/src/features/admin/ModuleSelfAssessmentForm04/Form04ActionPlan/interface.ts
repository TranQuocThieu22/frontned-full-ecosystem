export interface IForm04ActionPlanRowHistory {
  id: string;
  name?: string;
  ngayCapNhat?: string;
  nguoiCapNhat?: string;
  status?: boolean;
}

export interface IForm04ActionPlanRowHistoryViewModel {
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
  // modifiedWhen?: Date;
  // modifiedBy?: number;
  target?: string;
  detail?: string;
  note?: string;
  unit?: string;
  action?: string;
  actionTime?: string;
  eaqSelfAssessmentId?: number;
  isAddRow?: boolean;
}
