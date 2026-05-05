// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

import {ParticipationState} from "@/shared/consts/enum/ParticipationsStateEnum";

/** Quyết định duyệt */
export type ApprovalDecision = "APPROVE" | "REJECT";

/** Một sinh viên tham gia */
export interface ActivityParticipation {
  id: string;
  activityId: string;
  studentId: string;
  /** Display name — falls back to studentCode when name is null */
  studentName: string;
  /** Student code (used as fallback display and ID) */
  studentCode: string;
  className: string;
  proposedScore: number;
  finalScore: number | null;
  /** Numeric state from API — compare against ParticipationStateEnum values */
  state: ParticipationState;
  rejectReason: string | null;
  /** Not returned by current API; kept for future compatibility */
  role?: string;
  /** Not returned by current API; kept for future compatibility */
  evidence?: string | null;
  approvedBy: string | null;
  approvedAt: string | null;
  /** Not returned by current API; kept for future compatibility */
  version?: number;
}

