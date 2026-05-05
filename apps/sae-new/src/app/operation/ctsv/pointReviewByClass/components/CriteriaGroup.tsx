"use client";

import { C } from "../shared/colors";

import { useState } from "react";
import { Badge, Box, Collapse, Flex, Group, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { CriterionScore } from "../types";
import { CriterionChildRow } from "./CriterionChildRow";

interface CriteriaGroupProps {
  parent: CriterionScore;
  items: CriterionScore[];
  parentScore: number;
  effectiveScores: Record<string, number>;
  onDraftScore: (id: string, score: number) => void;
  isReadOnly: boolean;
  animIndex: number;
}

export function CriteriaGroup({
  parent,
  items,
  parentScore,
  effectiveScores,
  onDraftScore,
  isReadOnly,
  animIndex,
}: CriteriaGroupProps) {
  const hasChildren = items.length > 0;
  const [expanded, setExpanded] = useState(true);
  const hasChildChanges = items.some(
    (c) => effectiveScores[c.id] !== (c.classApprovalScore ?? c.score ?? 0)
  );
  const isOverParent = parentScore > parent.maxScore;

  return (
    <Box
      mb="xs"
      style={{
        background: C.neutralCard,
        border: `1px solid ${isOverParent ? C.red : hasChildChanges ? C.amberText : C.neutralDivider}`,
        borderRadius: 12,
        overflow: "hidden",
        animation: `cardFadeUp 0.3s ease both`,
        animationDelay: `${animIndex * 60}ms`,
      }}
    >
      {/* Parent header — clickable to expand/collapse */}
      <Box
        p="sm"
        style={{
          cursor: hasChildren && !isReadOnly ? "pointer" : "default",
          background: C.neutralMid,
        }}
        onClick={() => hasChildren && !isReadOnly && setExpanded((v) => !v)}
      >
        <Flex justify="space-between" align="center" gap="sm">
          <Group gap={8}>
            {hasChildren ? (
              <IconChevronDown
                size={14}
                color={C.textLight}
                style={{
                  transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
                  transition: "transform 0.2s ease",
                  flexShrink: 0,
                }}
              />
            ) : null}
            <Badge
              size="sm"
              radius="sm"
              style={{
                background: C.navy,
                color: "white",
                border: "1px solid #1A2744",
                fontWeight: 800,
                fontSize: "11px",
                fontFamily: "'Roboto', monospace",
              }}
            >
              {parent.criteriaCode}
            </Badge>
            <Text
              size="sm"
              fw={700}
              style={{ color: C.navy, fontFamily: "'Roboto', sans-serif", lineHeight: 1.3 }}
            >
              {parent.criteriaName}
            </Text>
          </Group>

          <Group gap={8}>
            <Box style={{ textAlign: "right" }}>
              <Text
                fw={800}
                style={{
                  fontSize: 20,
                  color: isOverParent ? C.red : C.navy,
                  fontFamily: "'Roboto', sans-serif",
                  lineHeight: 1,
                }}
              >
                {parentScore}
              </Text>
              <Text
                size="xs"
                style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}
              >
                / {parent.maxScore}đ
              </Text>
            </Box>
            {hasChildChanges && (
              <Badge
                size="xs"
                radius="sm"
                style={{
                  background: C.amberText,
                  color: "white",
                  fontWeight: 700,
                  fontSize: "10px",
                }}
              >
                Đã điều chỉnh
              </Badge>
            )}
          </Group>
        </Flex>
      </Box>

      {/* Child rows */}
      <Collapse in={expanded}>
        {items.map((child) => (
          <CriterionChildRow
            key={child.id}
            criterion={child}
            value={effectiveScores[child.id] ?? 0}
            onChange={isReadOnly ? undefined : (v) => onDraftScore(child.id, v)}
            readOnly={isReadOnly}
          />
        ))}
      </Collapse>
    </Box>
  );
}
