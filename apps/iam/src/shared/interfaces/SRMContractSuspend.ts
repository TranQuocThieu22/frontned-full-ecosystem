import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMContract } from "./SRMContract";

export interface SRMContractSuspend extends BaseEntity {
  order?: number;

  /** Lý do tạm dừng/đình chỉ */
  reason?: string;

  /** Loại tạm dừng/đình chỉ */
  type?: number;

  /** Đường dẫn file đính kèm */
  attachmentPath?: string;

  /** Chi tiết file đính kèm */
  attachmentDetail?: AQFileDetail;

  /** ID hợp đồng */
  srmContractId?: number;

  /** Chi tiết hợp đồng */
  srmContract?: SRMContract;

  /** ID năm học */
  academicYearId?: number;

  /** Đường dẫn file xử lý */
  processingAttachmentPath?: string;

  /** Chi tiết file xử lý */
  processingAttachmentDetail?: AQFileDetail;

  /** Trạng thái xử lý */
  processingStatus?: number;

  /** Tóm tắt xử lý */
  processingSummary?: string;
}