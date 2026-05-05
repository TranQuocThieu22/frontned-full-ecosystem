import {IReport} from "../report/IReport";

export default interface ILimitationDetail {
  eaqReports?: { [key: string]: IReport[] };
  // Nội dung báo cáo cải tiến hiện tại
  limitationReport?: string;
  /** Trạng thái kiểm tra */
  trackingStatus?: number;
}
