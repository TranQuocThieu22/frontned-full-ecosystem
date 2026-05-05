// ─────────────────────────────────────────────
// Criteria helpers — moved from types.ts
// ─────────────────────────────────────────────

import type { Criterion } from "@/shared/interfaces/criterion";

/** Flat criterion shape required by the createNew API */
export interface inputCriterion {
  id: string;
  code: string;
  name: string;
  maxScore: number;
  orderIndex: number;
  parentId: string | null;
}

/** Body sent to POST /scoreframeworkversion/{tenantId}/ */
export interface CreateVersionBody {
  code: string;
  name: string;
  state: number;
  criterias: inputCriterion[];
}
export interface UpdateVersionBody {
  name: string;
  state: number;
  criterias: inputCriterion[];
}

/** Maps flat Criterion[] (from API) → recursive Criterion[] (for editor/tree) */
export function mapCriteriaToTree(dto: Criterion[]): Criterion[] {
  const roots = dto.filter((c) => c.parentId == null);
  const childrenMap: Record<string, Criterion[]> = {};

  for (const c of dto) {
    if (c.parentId != null) {
      if (!childrenMap[c.parentId]) childrenMap[c.parentId] = [];
      childrenMap[c.parentId]!.push(c);
    }
  }

  function build(node: Criterion): Criterion {
    return {
      id: node.id,
      code: node.code,
      name: node.name,
      maxScore: node.maxScore,
      children: (childrenMap[node.id!] ?? []).map(build),
    };
  }

  return roots.map(build);
}

/**
 * Converts the recursive Criterion[] tree → flat inputCriterion[] for the API.
 * orderIndex is 1-based per sibling group (same parent or root level).
 */
export function flattenCriteriaToInput(criteria: Criterion[]): inputCriterion[] {
  const result: inputCriterion[] = [];

  function walk(crits: Criterion[], parentId: string | null, startIndex = 0) {
    crits.forEach((c, i) => {
      result.push({
        id: c.id,
        code: c.code,
        name: c.name,
        maxScore: c.maxScore || 0,
        orderIndex: startIndex + i + 1,
        parentId,
      });
      if (c.children.length > 0) {
        walk(c.children, c.id, 0);
      }
    });
  }

  walk(criteria, null, 0);
  return result;
}
