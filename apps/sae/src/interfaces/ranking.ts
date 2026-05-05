import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface Evidence {
  eventName: string;
  eventCode: string;
  point: number;
  teacherPoint: number | null;
  schoolPoint: number | null;
  maxPoint: number;
  isApply: boolean;
  isVerify: boolean;
  isRequired: boolean;
}

export interface ActivityStandardInfo {
  standardId: number;
  standardName: string;
  standardMinPoint: number;
  standardMaxpoint: number;
  maxPoint: number;
  evidences: Evidence[];
}

export interface StudentRankingInit {
  totalPoint: number;
  rateName: string;
  activityStudentInfoViewModels: ActivityStandardInfo[];
}

export interface StudentRankingInitParams {
  studentId?: number;
  /** hiển thị điểm khi hoạt động chưa được duyệt */
  isPreview?: boolean;
}
export interface StudentRankingInitByStudentsParam {
  activityPlanId: number,
  activityType: number,
  studentIds?: number[],
  /** hiển thị điểm khi hoạt động chưa được duyệt */
  isPreview?: boolean,
  facultyId?: number
}

export interface StandardPoint {
  standardOrder: number;
  standardPoint: number;
}

export interface StudentRankingHistoryByStudentParams {
  studentId: number;
  activityPlanId?: number;
}

export interface StudentRankingHistoryByStudent {
  activityPlanId: number;
  activityPlanName: string;
  studentRankingPoint: number;
  teacherRankingPoint: number | null;
  schoolRankingPoint: number | null;
  studentId: number;
  rateName: string;
  studentName: string | null;
  facultyName: string | null;
  standardPoints: StandardPoint[];
}

export interface Ranking {
  activityPlanId?: number;
  activityPlanName?: string;
  studentRankingPoint?: number;
  teacherRankingPoint?: number;
  schoolRankingPoint?: number;
  studentId?: number;
  rateName?: string;
  studentName?: string;
  facultyName?: string;
  standardPoints?: StandardPoint[];
}

export interface StudentRankingDetailParams {
  studentId?: number;
  activityPlanId?: number;
}

export interface RankingSchoolReport {
  overFiftyPointCount?: number;
  totalCount?: number;
  activityPlanName?: string;
  facultyReports?: FacultyReport[];
  rateInfo?: RateInfo[];
}

export interface FacultyReport {
  facultyId?: number;
  facultyName?: string;
  facultyOverFiftyPointCount?: number;
  facultTotalCount?: number;
}
export interface RateInfo {
  rateName?: string;
  from?: number;
  to?: number;
  count?: number;
  completedCount?: number;
  recordCount?: number;
  registrationCount?: number;
}

export interface ReportCurrentPlan extends BaseEntity {
  activityPlanId?: number;
  rateName?: string;
  facultyName?: string
  studentRankingPoint?: number;
  standardPoints?: StandardPoint[];
  studentCode?: number;
  studentId?: number;
  studentName?: string;
  schoolRankingPoint?: number;
  teacherRankingPoint?: number;
}

export interface ReportCurrentPlanDetailParams {
  facultyId?: number;
  name?: string;
  activityPlanId?: number;
  pageSize?: number;
  pageNumber?: number;
}

export interface StudentTracking {
  overFiftyPointCount?: number;
  totalCount?: number;
  facultyName?: string;
  activityPlanName?: string;
  facultyReportDetails?: FacultyReportDetail[];
  rateInfo?: RateInfo[];
}
export interface FacultyReportDetail {
  activityPlanId?: number;
  studentRankingPoint?: number;
  teacherRankingPoint?: number;
  schoolRankingPoint?: number;
  studentId?: number;
  studentCode?: string;
  studentName?: string;
  registrationPoint?: number;
  reviewedPoint?: number;
  completedPoint?: number;
  rateName?: string;
  standardPoints?: StandardPoint[];
}

export interface ReportByFaculty {
  overFiftyPointCount?: number,
  totalCount?: number,
  facultyName?: string,
  activityPlanName?: string,
  facultyReportDetails?: ReportCurrentPlan[]
  rateInfo?: RateInfo[];
}
