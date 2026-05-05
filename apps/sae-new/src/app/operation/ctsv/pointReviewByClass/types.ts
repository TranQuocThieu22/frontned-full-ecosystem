import { C } from "./shared/colors";

// ─────────────────────────────────────────────
// Shared types — imported then re-exported so all
// consumers can import from a single path ("./types")
// ─────────────────────────────────────────────

import { classifyScore, CLASSIFICATION_CONFIG } from "@/shared/consts/classification";
export { classifyScore, CLASSIFICATION_CONFIG };

import type { Classification } from "@/shared/consts/classification";
export type { Classification };

// ─────────────────────────────────────────────
// Numeric state enum (mirrors backend integer values)
// ─────────────────────────────────────────────

/**
 * Mirrors the backend integer values for StudentSelfAssessment.state.
 * API returns: 0=New, 1=Draft, 2=PendingClassApproval, 3=PendingFacultyApproval, ...
 */
export enum StudentSelfAssessmentStateNum {
  New = 0,
  Draft = 1,                    // Bị trả lại — SV can re-edit
  PendingClassApproval = 2,     // Chờ GVCN duyệt
  PendingFacultyApproval = 3,   // Chờ Khoa duyệt
  PendingUniversityApproval = 4,
  Approved = 5,
}

/** Map numeric state → display label (used by STATE_CONFIG keys) */
export const STATE_LABEL: Record<StudentSelfAssessmentStateNum, string> = {
  [StudentSelfAssessmentStateNum.New]: "Draft",
  [StudentSelfAssessmentStateNum.Draft]: "Draft",
  [StudentSelfAssessmentStateNum.PendingClassApproval]: "Pending Class Approval",
  [StudentSelfAssessmentStateNum.PendingFacultyApproval]: "Pending Faculty Approval",
  [StudentSelfAssessmentStateNum.PendingUniversityApproval]: "Pending University Approval",
  [StudentSelfAssessmentStateNum.Approved]: "Approved",
};

/**
 * Filter pill options — derived from enum so stays in sync automatically.
 * Single source of truth for filter UI.
 *
 * GVCN class approval only handles:
 *   - PendingClassApproval(2): awaiting GVCN review
 *   - Draft(1): returned to student for revision
 *   - Approved(5): approved by GVCN / Faculty
 * Faculty/University states (3, 4) are out of scope for this view.
 */
export const FILTER_STATE_OPTIONS: { value: number | "all"; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: StudentSelfAssessmentStateNum.PendingClassApproval, label: "Chờ duyệt" },
  { value: StudentSelfAssessmentStateNum.Draft, label: "Trả lại" },
  { value: StudentSelfAssessmentStateNum.PendingFacultyApproval, label: "Đã duyệt" },
];

// ─────────────────────────────────────────────
// Legacy type alias — components use this string type;
// hook maps numeric → string at the boundary
// ─────────────────────────────────────────────

export type AssessmentState =
  | "Draft"
  | "Pending Class Approval"
  | "Pending Faculty Approval"
  | "Pending University Approval"
  | "Approved"
  | "Rejected";

// ─────────────────────────────────────────────
// Semester info (from detail API)
// ─────────────────────────────────────────────

export interface SemesterInfo {
  id: string;
  name: string;                    // e.g. "Học kỳ 2"
  selfAssessmentOpen: string;
  selfAssessmentClose: string;
  classApprovalOpen: string;
}

// ─────────────────────────────────────────────
// CriterionScore — flat parent/child (GVCN review)
// Field names match real API: score / classApprovalScore
// ─────────────────────────────────────────────

import type { CriterionBase } from "@/shared/interfaces/criterion";

export interface CriterionScore extends CriterionBase {
  /** Student's self-assessment score (API: score) */
  score: number | null;
  /** GVCN-adjusted score (API: classApprovalScore) */
  classApprovalScore: number | null;
  parentId: string | null;   // null = Điều (parent); string = tiêu chí (child)
  level: number;             // 1 = Điều (parent), 2 = tiêu chí (child)
  orderIndex: number;
  /** Real unique ID from API (some parent rows have placeholder id="0000...") */
  criteriaId: string;
  criteriaCode?:string;
  criteriaName?:string
}

// ─────────────────────────────────────────────
// StudentListItem — lightweight row from list API
// GET /studentselfassessment/{tenantId}/current-semester-class-approval
// ─────────────────────────────────────────────

export interface StudentListItem {
  /** Assessment record id (used as path param for detail/action APIs) */
  id: string;
  studentId: string;
  studentCode: string | null;
  studentName: string | null;
  studentAvatar: string | null;
  /** Student's self-score total */
  totalScore: number;
  /** GVCN-adjusted total (null = not yet reviewed) */
  classApprovalTotalScore: number | null;
  classification: string;
  /** Numeric state — use StudentSelfAssessmentStateNum */
  state: number;
  submittedAt: string;
}

// ─────────────────────────────────────────────
// Audit Log Entry
// ─────────────────────────────────────────────

export interface AuditEntry {
  id: string;
  action: "CREATE" | "UPDATE" | "SUBMIT" | "APPROVE" | "REJECT";
  oldScore: number | null;
  newScore: number | null;
  note: string;
  actorName: string;
  timestamp: string;
}

// ─────────────────────────────────────────────
// Discipline Record
// ─────────────────────────────────────────────

export interface DisciplineRecord {
  id: string;
  level: "Cảnh cáo" | "Khiển trách" | "Cảnh cáo học phần";
  reason: string;
  date: string;
}

// ─────────────────────────────────────────────
// Recognised Activity
// ─────────────────────────────────────────────

export interface RecognisedActivity {
  id: string;
  title: string;
  date: string;
  points: number;
  type: "mandatory" | "optional" | "club";
}

// ─────────────────────────────────────────────
// StudentAssessment — full detail from GET /{id}
// Field names match real API response shape
// ─────────────────────────────────────────────

export interface StudentAssessment {
  assessmentId: string;
  studentId: string;
  studentName: string | null;
  studentCode: string | null;
  /** Numeric state — compare against StudentSelfAssessmentStateNum values */
  state: number;
  /** Student's self-score total */
  totalScore: number;
  /** GVCN-adjusted total (null = not yet reviewed) */
  classApprovalTotalScore: number | null;
  classification: string;
  classApprovalComment: string | null;
  classRejectComment: string | null;
  classApprovedAt: string | null;
  submittedAt: string | null;
  semester: SemesterInfo | null;
  criteria: CriterionScore[];
  /** Raw API field — map to criteria in hook */
  selfAssessmentDetails?: CriterionScore[];
  auditLog: AuditEntry[];
  disciplineRecord: DisciplineRecord | null;
  recognisedActivities: RecognisedActivity[];
}

// ─────────────────────────────────────────────
// Assessment State Config (display only — keys are string labels)
// ─────────────────────────────────────────────

export const STATE_CONFIG: Record<AssessmentState, { color: string; bg: string; border: string; label: string }> = {
  "Draft":                     { color: C.gray,       bg: C.grayLight,   border: C.gray,        label: "Trả lại" },
  "Pending Class Approval":   { color: C.navy,       bg: C.navyPale,    border: C.navy,        label: "Chờ GVCN" },
  "Pending Faculty Approval": { color: C.amberText,  bg: C.amberBg,     border: C.amberText,   label: "Chờ Khoa" },
  "Pending University Approval": { color: C.orange, bg: C.orangeLight, border: C.orange,      label: "Chờ Trường" },
  "Approved":                 { color: C.green,       bg: C.greenLight,  border: C.green,       label: "Đã duyệt" },
  "Rejected":                 { color: C.red,        bg: C.redLight,    border: C.red,         label: "Trả lại" },
};
