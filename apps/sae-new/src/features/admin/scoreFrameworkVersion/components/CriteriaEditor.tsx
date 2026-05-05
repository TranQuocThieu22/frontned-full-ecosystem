"use client";

import { Box, Button, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import type { Criterion } from "@/shared/interfaces/criterion";
import { MAX_TOTAL } from "../shared/constants";
import { CriteriaHint } from "./CriteriaHint";
import { CriterionRow } from "./CriterionRow";
import { UseScoreFrameworkVersion } from "../shared/useScoreFrameworkVersion";
import { useScoreFrameworkVersionStore } from "@/shared/stores/scoreFrameworkVersionStore";
import { calcRootTotal, validateParentChildren, generateGUID } from "../shared/helper";

export function CriteriaEditor() {
  const hook = UseScoreFrameworkVersion();
  const expandedIds = useScoreFrameworkVersionStore((s) => s.expandedIds);
  const setExpandedIds = useScoreFrameworkVersionStore((s) => s.setExpandedIds);

  const criteria = hook.criteria;
  const totalScore = calcRootTotal(criteria);
  const childValidation = validateParentChildren(criteria);
  const overTotal = totalScore > MAX_TOTAL;

  return (
    <Stack gap={0}>
      {criteria.map((criterion) => (
        <CriterionRow
          key={criterion.id}
          criterion={criterion}
          readonly={false}
          isOverBudget={
            (overTotal && criterion.maxScore > 0) || !!childValidation.byId[criterion.id]
          }
          expanded={expandedIds.has(criterion.id)}
          onToggleExpand={() =>
            setExpandedIds((prev) => {
              const next = new Set(prev);
              next.has(criterion.id) ? next.delete(criterion.id) : next.add(criterion.id);
              return next;
            })
          }
          onUpdate={(updated) =>
            hook.updateCriteria(criteria.map((c) => (c.id === updated.id ? updated : c)))
          }
          onAddChild={() => {
            const newChild: Criterion = {
              id: generateGUID(),
              code: `${criterion.code}.${criterion.children.length + 1}`,
              name: "",
              maxScore: 0,
              children: [],
            };
            hook.updateCriteria(
              criteria.map((c) =>
                c.id === criterion.id ? { ...c, children: [...c.children, newChild] } : c
              )
            );
            setExpandedIds((prev) => new Set([...prev, criterion.id]));
          }}
          onDelete={() => {
            const remaining = criteria.filter((c) => c.id !== criterion.id);
            const renumbered = remaining.map((c, i) => ({ ...c, code: `C${i + 1}` }));
            hook.updateCriteria(renumbered);
          }}
          serverErrors={hook.serverErrors[criterion.id]}
          allServerErrors={hook.serverErrors}
          clearErrorForId={hook.clearErrorForId}
        />
      ))}

      {/* Add new root criterion */}
      <Box
        mt="sm"
        style={{ border: "1.5px dashed #C5BEB4", borderRadius: 10, background: "#FAFAF8" }}
        className="add-criterion-btn"
      >
        <Button
          variant="subtle"
          size="sm"
          leftSection={<IconPlus size={14} />}
          color="gray"
          radius="md"
          fullWidth
          onClick={() =>
            hook.updateCriteria([
              ...criteria,
              { id: generateGUID(), code: `C${criteria.length + 1}`, name: "", maxScore: 0, children: [] },
            ])
          }
          styles={{ root: { color: "#7A746B", fontFamily: "'Roboto', sans-serif", fontSize: "12px", fontWeight: 600, padding: "10px 16px" } }}
        >
          Thêm tiêu chí mới
        </Button>
      </Box>

      <CriteriaHint />
    </Stack>
  );
}
