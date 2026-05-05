/**
 * Quota helper utilities — used across ActivityCard and ActivityDetailDrawer.
 * Color/theme configs are now directly from ActivityStudent.ts enums.
 */

export function getQuotaColor(registered: number, quota: number): string {
  if (quota <= 0) return "#6B7280";
  const pct = (registered / quota) * 100;
  if (pct >= 100) return "#6B7280";
  if (pct >= 80) return "#D4623B";
  if (pct >= 50) return "#B8810A";
  return "#2D7D46";
}

export function getQuotaLabel(registered: number, quota: number): string {
  if (registered >= quota) return "Hết chỗ";
  const left = quota - registered;
  return `${left} chỗ trống`;
}
