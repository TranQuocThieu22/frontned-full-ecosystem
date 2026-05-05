import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { ISelfAssessment } from "../selfAssessment/ISelfAssessment";

export interface IComment extends BaseEntity {
  /** Nhận xét và yêu cầu hiệu chỉnh */
  commentDetail?: string;
  /** Nội dung đề cập */
  content?: string;
  eaqSelfAssessmentId?: number;
  /** Tự đánh giá */
  eaqSelfAssessment?: ISelfAssessment;
  selfAssessmentType?: number;
  /** Đánh giá từ bên ngoài */
  isExternal?: boolean
}
