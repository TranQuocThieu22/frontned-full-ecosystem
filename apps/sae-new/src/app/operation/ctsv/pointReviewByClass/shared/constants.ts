import { C } from "./colors";

// ─────────────────────────────────────────────
// Score helpers
// ─────────────────────────────────────────────

export function getScoreColor(score: number): string {
  if (score >= 80) return C.green;
  if (score >= 60) return C.orange;
  return C.red;
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const last = parts.at(-1) ?? "";
  const secondLast = parts.at(-2) ?? "";
  return `${secondLast[0] ?? ""}${last[0] ?? ""}`.toUpperCase();
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function scoreDeltaColor(self: number, teacher: number | null): string {
  if (teacher === null) return C.textMuted;
  if (teacher > self) return C.green;
  if (teacher < self) return C.red;
  return C.textMuted;
}

export function scoreDeltaSign(self: number, teacher: number | null): string {
  if (teacher === null) return "";
  const diff = teacher - self;
  if (diff === 0) return "±0";
  return diff > 0 ? `+${diff}` : `${diff}`;
}

// ─────────────────────────────────────────────
// Activity type config
// ─────────────────────────────────────────────

export const ACTIVITY_TYPE_CONFIG: Record<string, { color: string; bg: string }> = {
  mandatory: { color: C.navy, bg: C.navyPale },
  optional:  { color: C.orange, bg: C.orangeLight },
  club:      { color: C.green, bg: C.greenLight },
};

// ─────────────────────────────────────────────
// Audit action colors
// ─────────────────────────────────────────────

export const ACTION_COLORS: Record<string, string> = {
  CREATE:  C.gray,
  UPDATE:  C.amberText,
  SUBMIT:  C.navy,
  APPROVE: C.green,
  REJECT:  C.red,
};

// ─────────────────────────────────────────────
// Activity type label map
// ─────────────────────────────────────────────

export function activityTypeLabel(type: string): string {
  if (type === "mandatory") return "Bắt buộc";
  if (type === "optional") return "Tự chọn";
  if (type === "club") return "CLB";
  return type;
}
