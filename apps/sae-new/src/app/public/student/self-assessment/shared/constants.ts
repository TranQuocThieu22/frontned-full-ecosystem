import type { Classification } from "@/shared/consts/classification";
import { StudentSelfAssessmentState } from "@/shared/APIs/studentSelfAssessmentService";

// ─────────────────────────────────────────────
// CSS Custom Properties (from HTML prototype)
// ─────────────────────────────────────────────

export const CSS = {
  navy: "#1A2744",
  navyMid: "#2D4270",
  navyPale: "#EEF1F8",

  teal: "#1d9e75",
  tealDark: "#0f6e56",
  tealLight: "#e8f5f1",
  tealBorder: "#a7d9c6",

  amber: "#d97706",
  amberBg: "#fef3c7",
  amberBorder: "#fde68a",

  orange: "#d4623b",

  purple: "#7c3aed",
  purpleBg: "#ede9fe",

  danger: "#dc2626",
  dangerBg: "#fef2f2",
  dangerBorder: "#fecaca",

  surface: "#ffffff",
  surface2: "#f8f9fa",
  surface3: "#f3f4f6",

  border: "#e5e7eb",
  border2: "#d1d5db",

  text1: "#111827",
  text2: "#374151",
  text3: "#9ca3af",

  infoBg: "#eff6ff",
  infoText: "#1d4ed8",
  infoBorder: "#bfdbfe",

  green: "#1d9e75",
  greenBg: "#e8f5f1",
  gold: "#d97706",
  goldBg: "#fef3c7",
  white: "#ffffff",
} as const;

export const C = CSS;

// ─────────────────────────────────────────────
// Điều colors (5 criteria, exact from HTML)
// ─────────────────────────────────────────────

export const DIEU_COLORS: Record<string, { dot: string; bg: string; border: string }> = {
  C1: { dot: "#1d9e75", bg: "#e8f5f1", border: "#a7d9c6" },
  C2: { dot: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
  C3: { dot: "#d97706", bg: "#feedc7", border: "#fde68a" },
  C4: { dot: "#7c3aed", bg: "#ede9fe", border: "#c4b5fd" },
  C5: { dot: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
};

// Re-export classifyScore so consumers import from one path.
export { classifyScore } from "@/shared/consts/classification";

// ─────────────────────────────────────────────
// Classification config (doc.md §11)
// ─────────────────────────────────────────────

export const CLASSIFICATION_CONFIG: Record<
  Classification,
  { min: number; color: string; bg: string; label: string }
> = {
  "Xuất sắc": { min: 90, color: "#6d28d9", bg: "#ede9fe", label: "Xuất sắc" },
  "Tốt": { min: 80, color: "#0f6e56", bg: "#e8f5f1", label: "Tốt" },
  "Khá": { min: 65, color: "#2563eb", bg: "#fef3c7", label: "Khá" },
  "Trung bình": { min: 50, color: "#d97706", bg: "#f3f4f6", label: "Trung bình" },
  "Yếu": { min: 0, color: "#dc2626", bg: "#fef2f2", label: "Yếu" },
  "Kém": { min: 0, color: "#6b7280", bg: "#f3f4f6", label: "Kém" },
};

// ─────────────────────────────────────────────
// Assessment state config
// ─────────────────────────────────────────────

export const STATE_CONFIG: Record<StudentSelfAssessmentState, { label: string; color: string; bg: string }> = {
  [StudentSelfAssessmentState.New]: { label: "Mới tạo", color: "#6b7280", bg: "#f3f4f6" },
  [StudentSelfAssessmentState.Draft]: { label: "Bản nháp", color: "#2563eb", bg: "#eff6ff" },
  [StudentSelfAssessmentState.PendingClassApproval]: { label: "Chờ duyệt cấp lớp", color: "#d97706", bg: "#fef3c7" },
  [StudentSelfAssessmentState.PendingFacultyApproval]: { label: "Chờ duyệt cấp khoa", color: "#2563eb", bg: "#eff6ff" },
  [StudentSelfAssessmentState.PendingUniversityApproval]: { label: "Chờ duyệt cấp trường", color: "#6d28d9", bg: "#ede9fe" },
  [StudentSelfAssessmentState.Approved]: { label: "Đã duyệt", color: "#0f6e56", bg: "#e8f5f1" },
};

// ─────────────────────────────────────────────
// Total max score (100)
// ─────────────────────────────────────────────

export const TOTAL_MAX_SCORE = 100;

// ─────────────────────────────────────────────
// Global CSS (keyframe animations)
// ─────────────────────────────────────────────

export const GLOBAL_CSS = `
  .sae-root {
    font-family: 'Roboto', sans-serif;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(12px); }
    to   { opacity: 1; transform: translateX(0);      }
  }

  @keyframes successPop {
    0%   { opacity: 0; transform: scale(0.88); }
    60%  { opacity: 1; transform: scale(1.04); }
    100% { opacity: 1; transform: scale(1);    }
  }

  @keyframes ringPulse {
    0%, 100% { box-shadow: 0 0 0 0px rgba(29,158,117,0.3); }
    50%       { box-shadow: 0 0 0 8px rgba(29,158,117,0); }
  }

  .sae-crit-card:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }

  .sae-score-input:focus {
    outline: none;
    border-color: var(--mantine-color-teal-5, #1d9e75) !important;
    box-shadow: 0 0 0 3px rgba(29,158,117,0.12) !important;
  }

  .sae-sub-input:focus {
    outline: none;
    border-color: var(--mantine-color-teal-5, #1d9e75) !important;
  }

  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: #f3f4f6; }
  ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 99px; }
`;
