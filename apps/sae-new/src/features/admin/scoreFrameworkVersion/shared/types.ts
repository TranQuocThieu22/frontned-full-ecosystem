// ─────────────────────────────────────────────
// Re-exports — canonical types live in shared/interfaces/
// ─────────────────────────────────────────────

export type { Criterion } from "@/shared/interfaces/criterion";
export { mapCriteriaToTree, flattenCriteriaToInput } from "./criteriaUtils";
export type { inputCriterion, CreateVersionBody, UpdateVersionBody } from "./criteriaUtils";
export type { ScoreFrameworkVersion, ScoreFrameworkVersionDetail } from "@/shared/interfaces/ScoreFrameworkVersion";
