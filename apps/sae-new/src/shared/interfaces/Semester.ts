import { BaseEntity } from "./BaseEntity";

export interface Semester extends BaseEntity {
    /** Ngày bắt đầu */
    startDate?: string;
    /** Ngày kết thúc */
    endDate?: string;
    /** Mở đăng ký hoạt động */
    activityRegistrationOpen?: string;
    /** Đóng đăng ký hoạt động */
    activityRegistrationClose?: string;
    /** Mở tự đánh giá */
    selfAssessmentOpen?: string;
    /** Đóng tự đánh giá */
    selfAssessmentClose?: string;
    /** Duyệt cấp lớp */
    classApprovalOpen?: string;
    /** Duyệt cấp khoa */
    facultyApprovalOpen?: string;
    /** Duyệt cấp trường */
    universityApprovalOpen?: string;
    order?: number | null;
}