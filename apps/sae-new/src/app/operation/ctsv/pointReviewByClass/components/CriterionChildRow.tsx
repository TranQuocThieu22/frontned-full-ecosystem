"use client";

import { C } from "../shared/colors";

import { Box, Flex, Group, NumberInput, Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { CriterionScore } from "../types";

interface CriterionChildRowProps {
  criterion: CriterionScore;
  value: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
}

export function CriterionChildRow({
  criterion,
  value,
  onChange,
  readOnly,
}: CriterionChildRowProps) {
  const selfScore = criterion.score ?? 0;
  const teacherScore = criterion.classApprovalScore;
  const isModified = teacherScore !== null && teacherScore !== selfScore;
  const isOverMax = value > criterion.maxScore;

  return (
    <Box
      pl="xl"
      py="xs"
      style={{
        background: C.white,
        borderBottom: "1px solid #EDE9E3",
        borderLeft: `3px solid ${isOverMax ? C.red : isModified ? C.amberText : C.dividerLight}`,
      }}
    >
      <Flex justify="space-between" align="center" gap="sm">
        <Box style={{ flex: 1 }}>
          <Group gap={6} mb={1}>
            <Text
              size="xs"
              fw={700}
              style={{
                color: C.navy,
                fontFamily: "'Roboto', sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              {criterion.code}
            </Text>
            <Text
              size="xs"
              style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}
            >
              {criterion.name}
            </Text>
            <Text size="xs" style={{ color: C.dividerLight }}>·</Text>
            <Text
              size="xs"
              fw={600}
              style={{ color: C.textLight, fontFamily: "'Roboto', sans-serif" }}
            >
              SV: {selfScore}/{criterion.maxScore}
            </Text>
            {isModified && teacherScore !== null && (
              <Text
                size="xs"
                fw={700}
                style={{ color: C.green, fontFamily: "'Roboto', sans-serif" }}
              >
                → GVCN: {teacherScore}
              </Text>
            )}
          </Group>
        </Box>

        <Box style={{ flexShrink: 0, minWidth: 90 }}>
          {readOnly ? (
            <Text
              fw={700}
              style={{
                fontSize: 15,
                color: C.navy,
                fontFamily: "'Roboto', sans-serif",
                textAlign: "center",
              }}
            >
              {teacherScore ?? selfScore}/{criterion.maxScore}
            </Text>
          ) : (
            <NumberInput
              value={value}
              onChange={(v) => onChange?.(Number(v) || 0)}
              min={0}
              max={criterion.maxScore}
              size="xs"
              radius="sm"
              suffix=" đ"
              styles={{
                input: {
                  background: C.neutralCard,
                  border: `1px solid ${isOverMax ? C.red : isModified ? C.amberText : C.neutralDark}`,
                  color: isOverMax ? C.red : C.navy,
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  textAlign: "center",
                  borderRadius: 6,
                },
                controls: {
                  background: C.inputBg,
                  border: "1px solid #E8E2D9",
                  borderRadius: "0 6px 6px 0",
                },
              }}
              style={{ maxWidth: 90 }}
            />
          )}
        </Box>
      </Flex>
      {isOverMax && !readOnly && (
        <Group gap={4} mt={2} pl="xs">
          <IconAlertTriangle size={10} color={C.red} />
          <Text size="xs" style={{ color: C.red, fontFamily: "'Roboto', sans-serif" }}>
            Vượt tối đa {criterion.maxScore}đ
          </Text>
        </Group>
      )}
    </Box>
  );
}
