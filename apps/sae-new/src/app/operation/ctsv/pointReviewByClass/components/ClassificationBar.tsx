"use client";

import { C } from "../shared/colors";

import { Badge, Box, Flex, Group, Text } from "@mantine/core";
import { IconAward } from "@tabler/icons-react";
import { CLASSIFICATION_CONFIG, Classification } from "../types";

const MAX_TOTAL = 100;

interface ClassificationBarProps {
  selfScore: number;
  selfClassification: Classification;
  teacherClassification: Classification | null;
  totalDraftScore: number;
  draftClassification: Classification;
  totalSelfScore: number;
  isReadOnly: boolean;
}

export function ClassificationBar({
  selfScore,
  selfClassification,
  teacherClassification,
  totalDraftScore,
  draftClassification,
  totalSelfScore,
  isReadOnly,
}: ClassificationBarProps) {
  const draftCfg = CLASSIFICATION_CONFIG[draftClassification];
  const pct = Math.min((totalDraftScore / MAX_TOTAL) * 100, 100);
  const diff = totalDraftScore - totalSelfScore;

  return (
    <Box
      p="lg"
      style={{
        background: C.neutralCard,
        border: "1px solid #E8E2D9",
        borderRadius: 14,
      }}
    >
      <Group justify="space-between" align="flex-start" mb="md">
        <Box>
          <Text
            size="xs"
            fw={700}
            mb={4}
            style={{
              color: C.textMuted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Xếp loại đề xuất (SV)
          </Text>
          <Badge
            size="md"
            radius="md"
            style={{
              background: CLASSIFICATION_CONFIG[selfClassification].bg,
              color: CLASSIFICATION_CONFIG[selfClassification].color,
              border: `1px solid ${CLASSIFICATION_CONFIG[selfClassification].border}`,
              fontWeight: 800,
              fontSize: "13px",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            {selfClassification}
          </Badge>
        </Box>
        {!isReadOnly && (
          <Group gap={4}>
            <Badge
              size="sm"
              radius="sm"
              style={{
                background: C.greenLight,
                color: C.green,
                border: "1px solid #2D7D46",
                fontWeight: 700,
                fontSize: "11px",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Đã duyệt
            </Badge>
          </Group>
        )}
      </Group>

      <Box
        p="md"
        style={{
          background: isReadOnly ? C.neutralCard : C.white,
          border: `1px solid ${isReadOnly ? C.neutralDark : C.amberText}`,
          borderRadius: 10,
        }}
      >
        <Group justify="space-between" mb={4}>
          <Group gap={6}>
            <IconAward size={13} color={draftCfg.color} />
            <Text
              size="xs"
              fw={700}
              style={{
                color: draftCfg.color,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              GVCN điều chỉnh
            </Text>
          </Group>
          <Badge
            size="md"
            radius="md"
            style={{
              background: draftCfg.bg,
              color: draftCfg.color,
              border: `1px solid ${draftCfg.border}`,
              fontWeight: 800,
              fontSize: "13px",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            {draftClassification}
          </Badge>
        </Group>

        <Flex align="baseline" gap={4} mb={6}>
          <Text
            fw={800}
            style={{
              fontSize: 44,
              color: draftCfg.color,
              fontFamily: "'Roboto', sans-serif",
              lineHeight: 1,
            }}
          >
            {totalDraftScore}
          </Text>
          <Text
            size="sm"
            fw={500}
            style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}
          >
            / {MAX_TOTAL}
          </Text>
          {diff !== 0 && (
            <Badge
              size="xs"
              radius="sm"
              style={{
                background: diff > 0 ? C.greenLight : C.redLight,
                color: diff > 0 ? C.green : C.red,
                fontWeight: 700,
                fontSize: "10px",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              {diff > 0 ? "+" : ""}{diff}
            </Badge>
          )}
        </Flex>

        <Box style={{ height: 6, borderRadius: 99, background: C.neutralDark, overflow: "hidden" }}>
          <Box
            style={{
              height: "100%",
              width: `${pct}%`,
              background: draftCfg.color,
              borderRadius: 99,
              transition: "width 0.3s ease",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
