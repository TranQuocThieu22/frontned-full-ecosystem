import {IReport} from "../report/IReport";

export default interface IRequirementDetail {
  /**
  @key : số lần
  eaqReoprt trả về được group theo số lần báo cáo
  @example
  {
    "1":[],
    "2":[]
  }
  */
  eaqReports?: { [key: string]: IReport[] };
  // Nội dung báo cáo cải tiến hiện tại
  requirementReport?: string;
  /** Trạng thái kiểm tra */
  trackingStatus?: number;
}
