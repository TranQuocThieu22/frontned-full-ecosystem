/**
 * Shared criterion types for Điểm Rèn Luyện (Conduct Score).
 * Two data models co-exist because each feature has different UX needs.
 */

// ─────────────────────────────────────────────
// CriterionBase — shared by both features
// ─────────────────────────────────────────────

export interface CriterionBase {
  id: string;
  code: string;     // e.g. "C1", "C2" (Điều) or "C1.1", "1.1" (tiêu chí)
  name: string;     // e.g. "Điều I – Ý thức chấp hành"
  maxScore: number;
}

// ─────────────────────────────────────────────
// Criterion — recursive tree (RLVersion / admin)
// Used by: apps/sae/src/app/admin/RLVersion
// ─────────────────────────────────────────────

export interface Criterion extends CriterionBase {
  children: Criterion[];
 level?: number;
  parentId?: string | null;
  orderIndex?: number | null;
  order?: number | null;
  /** Transient UI flag — marks a criterion added in the current editing session */
  _isNew?: boolean;
}

// ─────────────────────────────────────────────
// CriterionScore — flat parent/child (pointReviewByClass / GVCN review)
// Used by: apps/sae/src/app/operation/ctsv/pointReviewByClass
// ─────────────────────────────────────────────

export interface CriterionScore extends CriterionBase {
  selfScore: number;        // điểm SV tự chấm
  teacherScore: number | null; // điểm GVCN điều chỉnh (null = chưa duyệt)
  parentId: string | null;  // null = Điều (parent row); string = tiêu chí con
}
