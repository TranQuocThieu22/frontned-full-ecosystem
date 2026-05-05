/**
 * Shared design tokens and config maps for Point Review.
 * Imported by all sub-components to ensure consistent values.
 */

import { IconAlertCircle, IconBan, IconCircleCheck } from "@tabler/icons-react";
import { ActivityType, ActivityState } from "@/shared/interfaces/ActivityStudent";
import {ParticipationState} from "@/shared/consts/enum/ParticipationsStateEnum";

// ─────────────────────────────────────────────
// Design tokens
// ─────────────────────────────────────────────

export const C = {
  navy: "#1A2744",
  navyLight: "#2D4270",
  navyPale: "#EEF1F8",
  orange: "#D4623B",
  orangeLight: "#FDF0EC",
  green: "#2D7D46",
  greenLight: "#EEF7F1",
  gold: "#F0A500",
  amberBg: "#FEF9EC",
  amberText: "#B8810A",
  neutralBg: "#f8f9fa",
  neutralCard: "#f8f9fa",
  neutralBorder: "#E8E2D9",
  neutralDivider: "#EDE9E3",
  neutralDark: "#E8E2D9",
  textMuted: "#9E9689",
  textMid: "#7A746B",
  textDark: "#4A453F",
  textNavy: "#1A2744",
  gray: "#6B7280",
  grayLight: "#F3F4F6",
  white: "#FFFFFF",
  appBg: "#f8f9fa",
} as const;

// ─────────────────────────────────────────────
// Activity type config
// ─────────────────────────────────────────────

export const TYPE_CONFIG: Record<ActivityType, { label: string; color: string; bg: string }> = {
  [ActivityType.Mandatory]: { label: "Bắt buộc", color: C.navy, bg: C.navyPale },
  [ActivityType.Optional]:   { label: "Tự chọn",  color: C.orange, bg: C.orangeLight },
} as const satisfies Record<ActivityType, { label: string; color: string; bg: string }>;

// ─────────────────────────────────────────────
// Participation state config
// ─────────────────────────────────────────────

export const STATE_CONFIG: Record<
  ParticipationState,
  { label: string; color: string; bg: string }
> = {
  Recording: { label: "Chờ duyệt", color: C.gold, bg: C.amberBg },
  Approved: { label: "Đã duyệt", color: C.green, bg: C.greenLight },
  Rejected: { label: "Từ chối", color: C.orange, bg: C.orangeLight },
};

// ─────────────────────────────────────────────
// Activity state config
// ─────────────────────────────────────────────

export const ACTIVITY_STATE_CONFIG: Record<ActivityState, { label: string; color: string; bg: string }> = {
  [ActivityState.Draft]:     { label: "Bản nháp",       color: C.gray,  bg: C.grayLight },
  [ActivityState.Open]:      { label: "Mở đăng ký",    color: C.orange, bg: C.orangeLight },
  [ActivityState.Ongoing]:  { label: "Đang diễn ra",  color: "#1D4ED8", bg: "#EFF6FF" },
  [ActivityState.Recording]:{ label: "Đang ghi nhận", color: C.gold,  bg: C.amberBg },
  [ActivityState.Locked]:   { label: "Đã khóa",       color: C.gray,  bg: C.grayLight },
  [ActivityState.Closed]:   { label: "Đã đóng",        color: C.gray,  bg: C.grayLight },
} as const satisfies Record<ActivityState, { label: string; color: string; bg: string }>;

// ─────────────────────────────────────────────
// Global CSS string
// ─────────────────────────────────────────────

export const POINT_REVIEW_GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800&display=swap');

  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-12px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(12px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes successPop {
    0% { opacity: 0; transform: scale(0.9); }
    60% { opacity: 1; transform: scale(1.05); }
    100% { opacity: 1; transform: scale(1); }
  }

  .activity-item:hover { background: ${C.neutralCard} !important; }
  .filter-pill:hover { opacity: 0.85; }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: #F3F0EA; }
  ::-webkit-scrollbar-thumb { background: #C5BEB4; border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: #9E9689; }
`;
