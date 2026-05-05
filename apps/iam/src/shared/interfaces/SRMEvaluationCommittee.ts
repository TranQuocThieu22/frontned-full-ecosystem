import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMEvaluationCommitteeStatusEnum } from "../consts/enum/SRMEvaluationCommitteeStatus";
import { SRMEvaluationCriteriaSet } from "./SRMEvaluationCriteriaSet";
import { SRMEvaluationMember } from "./SRMEvaluationMember";
import { SRMEvaluationTopic } from "./SRMEvaluationTopic";

export interface SRMEvaluationCommittee extends BaseEntity {
  /** Ngày họp */
  meetingDate?: string;
  /** Địa điểm họp */
  meetingLocation?: string;
  /** Thời gian họp */
  meetingTime?: string;
  /** Trạng thái của hội đồng */
  status?: SRMEvaluationCommitteeStatusEnum;
  /** Ghi chú */
  note?: string;
  /** Thứ tự */
  order?: number;
  /** Đường dẫn File quyết định thành lập tổ thâm định */
  attachmentPath?: string;
  /** File quyết định thành lập tổ */
  attachmentDetail?: AQFileDetail | null;
  /** Loại hội đồng */
  type?: number;
  /** Id tiêu chí đánh giá hội đồng */
  srmEvaluationCriteriaSetId?: number;
  /** Bộ tiêu chí đánh giá hội đồng */
  srmEvaluationCriteriaSet?: SRMEvaluationCriteriaSet;
  /** Id năm học */
  academicYearId?: number;
  /** Năm học */
  academicYear?: string;
  /** Danh sách thành viên */
  srmEvaluationMembers?: SRMEvaluationMember[];
  /** Danh sách Id thành viên */
  srmEvaluationMembersId?: number[];
  /** Danh sách đề tài */
  srmEvaluationTopics?: SRMEvaluationTopic[];
  /** Danh sách Id đề tài */
  srmEvaluationTopicsIds?: number[];
  /** Giá trị Ngày họp nhập từ excel **/
  meetingDateValue?: string; // For import
  /** dùng để hiện danh sách member trên table */
  memberCodes?: string;
  /** dùng để hiện danh sách topic trên table */
  topicCodes?: string;

}

