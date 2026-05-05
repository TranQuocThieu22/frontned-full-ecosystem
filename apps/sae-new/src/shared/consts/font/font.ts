/**
 * Shared font constants and config for SAE app.
 * Consumed by: all components using text/styling.
 */

// ─────────────────────────────────────────────
// Font families
// ─────────────────────────────────────────────

export const FONT_FAMILY = {
  /** Primary sans-serif — used for most UI text */
  PRIMARY: "'Roboto', 'Nunito Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  /** Display/headline font — used for page titles, section headers */
  DISPLAY: "'Be Vietnam Pro', 'Roboto', sans-serif",
  /** Monospace — used for code, IDs, numeric values */
  MONO: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
} as const;

export type FontFamily = (typeof FONT_FAMILY)[keyof typeof FONT_FAMILY];

// ─────────────────────────────────────────────
// Font sizes
// ─────────────────────────────────────────────

export const FONT_SIZE = {
  /** 10px — captions, footnotes */
  xs: "0.625rem",   // 10px
  /** 12px — labels, secondary text */
  sm: "0.75rem",    // 12px
  /** 14px — body text (default) */
  md: "0.875rem",   // 14px
  /** 16px — lead text, emphasized body */
  lg: "1rem",       // 16px
  /** 20px — card titles, small headings */
  xl: "1.25rem",    // 20px
  /** 24px — page section headings */
  "2xl": "1.5rem",  // 24px
  /** 30px — page titles */
  "3xl": "1.875rem", // 30px
  /** 36px — hero headings */
  "4xl": "2.25rem", // 36px
} as const;

export type FontSize = (typeof FONT_SIZE)[keyof typeof FONT_SIZE];

// ─────────────────────────────────────────────
// Font weights
// ─────────────────────────────────────────────

export const FONT_WEIGHT = {
  NORMAL: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
  EXTRABOLD: 800,
} as const;

export type FontWeight = (typeof FONT_WEIGHT)[keyof typeof FONT_WEIGHT];

// ─────────────────────────────────────────────
// Line heights
// ─────────────────────────────────────────────

export const LINE_HEIGHT = {
  TIGHT: 1.25,   // headings
  SNUG: 1.375,   // card titles
  NORMAL: 1.5,   // body text
  RELAXED: 1.625, // long-form content
  LOOSE: 2,      // captions
} as const;

export type LineHeight = (typeof LINE_HEIGHT)[keyof typeof LINE_HEIGHT];

// ─────────────────────────────────────────────
// Letter spacing
// ─────────────────────────────────────────────

export const LETTER_SPACING = {
  TIGHT: "-0.02em",  // large headings
  NORMAL: "0",       // body
  WIDE: "0.025em",   // labels, caps
  WIDER: "0.05em",   // overlines
} as const;

export type LetterSpacing = (typeof LETTER_SPACING)[keyof typeof LETTER_SPACING];

// ─────────────────────────────────────────────
// Utility helpers
// ─────────────────────────────────────────────

/** Build a CSS font string from parts */
export function buildFont(
  family: FontFamily,
  size: FontSize,
  weight: FontWeight = FONT_WEIGHT.NORMAL,
  lineHeight: LineHeight = LINE_HEIGHT.NORMAL,
): string {
  return `${weight} ${size}/${lineHeight} ${family}`;
}
