import { IconDots } from "@tabler/icons-react";
import { CATEGORY_ICONS, CATEGORY_NAMES } from "./constants";
import type { FilterStatus, MockBucket, Tile } from "./types";

export function aggregateByCategory(data: MockBucket[]): Tile[] {
  const map = new Map<number, {
    items: any[]; achieved: number; total: number;
    sum: number; cnt: number; hasIssues: boolean;
  }>();

  for (const bucket of data) {
    const code = bucket.categoryCode;
    if (!map.has(code)) {
      map.set(code, { items: [], achieved: 0, total: 0, sum: 0, cnt: 0, hasIssues: false });
    }
    const agg = map.get(code)!;

    for (const c of bucket.criteria ?? []) {
      agg.items.push(c);
      agg.total += 1;
      if (c.isPass) agg.achieved += 1;
      if (typeof c.criteriaProgress === "number") {
        agg.sum += c.criteriaProgress;
        agg.cnt += 1;
      }
      if (c.isPass === false) agg.hasIssues = true;
      if (Array.isArray(c.criteriaDetails) && c.criteriaDetails.some((d: any) => d.isPass === false)) {
        agg.hasIssues = true;
      }
    }
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a - b)
    .map(([code, a]) => {
      const passPct = Math.round((a.achieved / Math.max(1, a.total)) * 100);
      const avg = a.cnt ? Math.round(a.sum / a.cnt) : passPct;
      return {
        code,
        title: CATEGORY_NAMES[code] ?? `Nhóm ${code}`,
        achieved: a.achieved,
        total: a.total,
        percent: avg,
        Icon: CATEGORY_ICONS[code] || CATEGORY_ICONS[9] || IconDots,
        items: a.items,
        hasIssues: a.hasIssues,
      };
    });
}

export function matchSearch(tile: Tile, q: string) {
  if (!q) return true;
  const s = q.toLowerCase().trim();
  if (tile.title.toLowerCase().includes(s)) return true;
  return tile.items.some(
    (c: any) =>
      String(c.title ?? "").toLowerCase().includes(s) ||
      String(c.content ?? "").toLowerCase().includes(s)
  );
}

/** Hoàn thành = đạt hết tiêu chí trong nhóm */
export function matchStatus(tile: Tile, status: FilterStatus) {
  if (status === "all") return true;
  const isDone = tile.achieved === tile.total && tile.total > 0;
  return status === "done" ? isDone : !isDone;
}
