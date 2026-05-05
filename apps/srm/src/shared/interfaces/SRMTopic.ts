import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { AcademicYear } from "@aq-fe/core-ui/shared/interfaces/AcademicYear";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMArea } from "./SRMArea";
import { SRMContract } from "./SRMContract";
import { SRMEvaluationTopic } from "./SRMEvaluationTopic";
import { SRMTopicMember } from "./SRMTopicMember";
import { SRMType } from "./SRMType";

export interface SRMTopic extends BaseEntity {
  /** Tên đề tài */
  registerName?: string
  /** Thời gian thực hiện */
  duration?: string
  /** Từ tháng/ Năm */
  fromDate?: string
  /** Đến tháng/ năm */
  toDate?: string
  /** Tổng kinh phí thực hiện (VNĐ) */
  totalCost?: number
  /** Mã Lĩnh vực */
  srmAreaId?: number
  srmAreaCode?: string
  /** Lĩnh vực */
  srmArea?: SRMArea
  /** Loại đề tài */
  srmType?: SRMType
  srmTypeCode?: string
  /** Danh sách thành viên */
  srmTopicMembers?: SRMTopicMember[] //
  /** File thuyết minh */
  attachmentPath?: string
  /** File detail */
  attachmentDetail?: AQFileDetail
  /** id loại đề tài */
  srmTypeId?: number,
  /** id năm học*/
  academicYearId?: number,
  /** Chi tiết năm học */
  academicYear?: AcademicYear,
  /** Trạng thái sơ bộ */
  preliminaryStatus?: number,
  /** Nhận xét sơ bộ */
  preliminaryReview?: string,
  /** Gửi mail sơ bộ */
  preliminaryIsSentMail?: boolean,
  /** Đơn vị chủ trì */
  hostOrganization?: string
  /** Đơn vị quản lý */
  managingOrganization?: string
  /** Tình trạng đề tài */
  status?: number;
  /** Đã gửi mail Kiểm tra hoàn thiện thuyết minh */
  completeIsSentMail?: boolean
  /** Nhận xét Kiểm tra hoàn thiện thuyết minh */
  completeReview?: string
  /** Trạng thái Kiểm tra hoàn thiện thuyết minh */
  completeStatus?: number
  /** Đã gửi mail Phê duyệt thuyết minh */
  proposalIsSentMail?: boolean
  /** Nhận xét Phê duyệt thuyết minh */
  proposalReview?: string
  /** Trạng thái Phê duyệt thuyết minh */
  proposalStatus?: number
  /** Danh sách đề tài đăng ký tuyển chọn */
  srmEvaluationTopics?: SRMEvaluationTopic[]
  /** Đề tài đăng ký tuyển chọn */
  srmEvaluationTopic?: SRMEvaluationTopic
  /** id hợp đồng */
  srmContractId?: number
  /** hợp đồng */
  srmContract?: SRMContract
}

/** Interface update status for topic */
export interface ITopicReviewPreliminary extends BaseEntity {
  status?: number
  review?: string
  isSentMail?: boolean
  type?: number
}