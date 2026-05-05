// ─────────────────────────────────────────────
// Design tokens — shared color palette
// ─────────────────────────────────────────────

export const C = {
  // Brand navy
  navy: "#1A2744",
  navyLight: "#2D4270",
  navyPale: "#EEF1F8",

  // Orange / warm accent
  orange: "#D4623B",
  orangeLight: "#FDF0EC",

  // Green / success
  green: "#2D7D46",
  greenLight: "#EEF7F1",

  // Amber / warning
  gold: "#F0A500",
  amberBg: "#FEF9EC",
  amberText: "#B8810A",
  amberBorder: "#F0D98A",

  // Red / error / reject
  red: "#C0392B",
  redLight: "#FEF0EE",
  redBorder: "#F0C0B8",

  // Background surfaces
  neutralBg: "#f8f9fa",
  neutralCard: "#ffffff",
  neutralDivider: "#EDE9E3",
  neutralDark: "#E8E2D9",
  neutralMid: "#f8f9fa",

  // Text
  textMuted: "#9E9689",
  textMid: "#7A746B",
  textDark: "#3A3834",
  textPlaceholder: "#C5BEB4",
  textLight: "#7A746B",

  // Gray
  gray: "#6B7280",
  grayLight: "#F3F4F6",

  // Pure
  white: "#FFFFFF",
  black: "#000000",

  // App shell
  appBg: "#F3F0EA",

  // Additional tokens used by components
  dividerLight: "#d1d0d0",
  inputBg: "#F7F5F2",
  amberDark: "#7A6010",
  navyDeep: "#3D5A8A",
  navyDark: "#3A4A6B",
  navyBorder: "#C5CEE0",
  purple: "#7C3AED",
  purpleLight: "#F3EEFF",
  redDark: "#7A1A0A",
} as const;

export type ColorKey = keyof typeof C;
