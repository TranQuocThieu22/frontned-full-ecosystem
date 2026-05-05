import { AcademicYear } from '@aq-fe/core-ui/shared/interfaces/AcademicYear';
import { AQFileDetail } from '@aq-fe/core-ui/shared/interfaces/AQFileDetail';
import { BaseEntity } from '@aq-fe/core-ui/shared/interfaces/BaseEntity';
import { SRMEvaluationCriteriaSet } from './SRMEvaluationCriteriaSet';
import { SRMReviewMember } from './SRMReviewMember';
import { SRMReviewProposal } from './SRMReviewProposal';

/** Hội đồng tư vấn xác định danh mục */
export interface SRMReviewCommittee extends BaseEntity {
  /** Thứ tự */
  order?: number;

  /** Ngày họp (định dạng ISO string) */
  meetingDate?: string;

  /** Giờ họp */
  meetingTime?: string;

  /** Địa điểm tổ chức cuộc họp */
  meetingLocation?: string;

  /**
   @enum
    - WaitingForMeeting = 1,
    - Completed = 2,
    @name
    - WaitingForMeeting: "Chờ họp",
    - Completed: "Hoàn thành",
   };
   */
  status?: number;

  /** ID năm học */
  academicYearId?: number;

  /** Thông tin năm học liên kết */
  academicYear?: AcademicYear;

  /** Danh sách đề xuất cho hội đồng */
  srmReviewProposals?: SRMReviewProposal[];

  /** Danh sách thành viên hội đồng */
  srmReviewMembers?: SRMReviewMember[];

  /** Ghi chú */
  note?: string;

  /** Đường dẫn file đính kèm */
  attachmentPath?: string;

  /** Chi tiết file đính kèm */
  attachmentDetail?: AQFileDetail;

  /** ID bộ tiêu chí đánh giá */
  srmEvaluationCriteriaSetId?: number;

  /** Bộ tiêu chí đánh giá */
  srmEvaluationCriteriaSet?: SRMEvaluationCriteriaSet;

  /** Mã bộ tiêu chí đánh giá (dùng khi import dữ liệu)*/
  srmEvaluationCriteriaSetCodeImport?: string;
}
