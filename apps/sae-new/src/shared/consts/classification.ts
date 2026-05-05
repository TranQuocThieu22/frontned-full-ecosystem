/**
 * Shared classification types + config for Điểm Rèn Luyện.
 * Consumed by: RLVersion, pointReview, pointReviewByClass, self-assessment.
 */

// ─────────────────────────────────────────────
// Classification type
// ─────────────────────────────────────────────

export type Classification =
  | "Xuất sắc"
  | "Tốt"
  | "Khá"
  | "Trung bình"
  | "Yếu"
  | "Kém";

export const CLASSIFICATION_THRESHOLDS: Record<Classification, number> = {
  "Xuất sắc": 90,
  "Tốt": 80,
  "Khá": 65,
  "Trung bình": 50,
  "Yếu": 30,
  "Kém": 0,
};

/**
 * Classify a numeric score into a Classification.
 * Uses the >= 90/80/65/50/30 thresholds from the ĐRL Quy chế.
 */
export function classifyScore(score: number): Classification {
  if (score >= 90) return "Xuất sắc";
  if (score >= 80) return "Tốt";
  if (score >= 65) return "Khá";
  if (score >= 50) return "Trung bình";
  if (score >= 30) return "Yếu";
  return "Kém";
}

// ─────────────────────────────────────────────
// Classification display config
// ─────────────────────────────────────────────

export const CLASSIFICATION_CONFIG: Record<
  Classification,
  { color: string; bg: string; border: string }
> = {
  "Xuất sắc": { color: "#7C3AED", bg: "#F3EEFF", border: "#7C3AED" },
  "Tốt":      { color: "#2D7D46", bg: "#EEF7F1", border: "#2D7D46" },
  "Khá":      { color: "#D4623B", bg: "#FDF0EC", border: "#D4623B" },
  "Trung bình": { color: "#B8810A", bg: "#FEF9EC", border: "#B8810A" },
  "Yếu":      { color: "#C0392B", bg: "#FEF0EE", border: "#C0392B" },
  "Kém":      { color: "#6B7280", bg: "#F3F4F6", border: "#6B7280" },
};
