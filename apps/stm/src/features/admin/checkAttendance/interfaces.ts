/** Lịch buổi học - dùng cho Điểm danh buổi học và ArrangeSchedule */
export interface ICourseSectionSchedule {
  subjectName?: string | null;
  courseSectionId?: number;
  addressId?: number;
  classPeriodStart?: number;
  classPeriodEnd?: number;
  totalMinute?: number;
  startDate?: string;
  endDate?: string;
  timeClusterCode?: string;
  timeClusterName?: string;
  courseSection?: {
    courseId?: number;
    timeClusterId?: number;
    quantityStudent?: number;
    quantityStudentActual?: number;
    courseTimeClusterId?: number;
    isScheduled?: boolean;
    course?: {
      name?: string;
    } | null;
    timeCluster?: unknown;
    roomPriority?: unknown[] | null;
    courseSectionLecturer?: unknown;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
  };
  address?: {
    location?: unknown;
    isInsiteSchool?: boolean | null;
    capacity?: number;
    testCapacity?: number;
    block?: string;
    roomTypeId?: number;
    branchId?: number;
    roomType?: unknown;
    branch?: unknown;
    id?: number;
    code?: string;
    name?: string;
    concurrencyStamp?: string;
    isEnabled?: boolean;
  };
  courseSectionScheduleLecturer?: {
    userId?: number;
    courseSectionScheduleId?: number;
    id?: number;
    code?: string | null;
    name?: string | null;
    concurrencyStamp?: string | null;
    isEnabled?: boolean;
    user?: { code?: string | null; name?: string | null; fullName?: string | null };
  }[];
  id?: number;
  code?: string | null;
  name?: string | null;
  concurrencyStamp?: string;
  isEnabled?: boolean;
  /** Trạng thái lịch (dùng cho cột Trạng thái bảng điểm danh) */
  status?: number | null;
  /** Đánh giá giảng viên (buổi học) */
  lecturerReview?: string | null;
}

/** Model cập nhật buổi học (form điểm danh) */
export interface ICsScheduleUpdateModel {
  id?: number;
  code?: string | null;
  name?: string | null;
  concurrencyStamp?: string;
  isEnabled?: boolean;
  subjectName?: string | null;
  courseSectionId?: number;
  addressId?: number;
  classPeriodStart?: number;
  classPeriodEnd?: number;
  startDate?: string;
  endDate?: string;
  timeClusterCode?: string;
  timeClusterName?: string;
  lecturerReview?: string | null;
  courseSectionScheduleLecturer?: { userId?: number; id?: number; code?: string | null; name?: string | null }[];
}

/** Học viên theo buổi học (API ClassParticipantByScheduleId) */
export interface IStudentByCsScheduleId {
  id?: number;
  user?: {
    fullName?: string;
    gender?: number;
    dateOfBirth?: string;
    phoneNumber?: string;
    email?: string;
  };
  status?: number | null;
  lecturerReview?: string | null;
  modifiedFullName?: string | null;
  modifiedWhen?: string | null;
}

/** Model cập nhật điểm danh từng học viên */
export type IStudentAttendanceUpdateModel = Partial<IStudentByCsScheduleId>;
