"use client";

import { Box, Button, Group, Text } from "@mantine/core";
import { C, CLASSIFICATION_CONFIG, STATE_CONFIG } from "../shared/constants";
import type { Classification } from "@/shared/consts/classification";
import type { StudentSelfAssessmentState } from "@/shared/APIs/studentSelfAssessmentService";

interface Props {
  totalScore: number;
  classification: Classification;
  canSubmit: boolean;
  disciplineBlocked: boolean;
  savingDraft: boolean;
  submitting: boolean;
  readOnly: boolean;
  totalOver100: boolean;
  hasSavedDraft: boolean;
  assessmentState: StudentSelfAssessmentState;
  onSaveDraft: () => void;
  onSubmit: () => void;
}

export default function SelfAssessmentMobileBar({
  totalScore,
  classification,
  canSubmit,
  disciplineBlocked,
  savingDraft,
  submitting,
  readOnly,
  totalOver100,
  hasSavedDraft,
  assessmentState,
  onSaveDraft,
  onSubmit,
}: Props) {
  const cfg = CLASSIFICATION_CONFIG[classification] ?? { color: "#6b7280", bg: "#f3f4f6", label: classification };

  return (
    <Box
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: C.surface,
        borderTop: `1px solid ${C.border}`,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.10)",
        padding: "10px 16px env(safe-area-inset-bottom, 12px)",
      }}
    >
      {/* ── Top row: score ring + state badge + warnings ── */}
      <Group justify="space-between" mb={8} wrap="nowrap">
        {/* Score + classification */}
        <Group gap={8} wrap="nowrap">
          <Box
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: `3px solid ${cfg.color}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Text fw={700} style={{ color: cfg.color, lineHeight: 1, fontSize: 13 }}>
              {totalScore}
            </Text>
          </Box>
          <Box>
            <Text size="xs" fw={600} style={{ color: cfg.color }}>
              Loại {cfg.label}
            </Text>
            <Text size="10px" style={{ color: C.text3 }}>
              / 100 điểm
            </Text>
          </Box>
        </Group>

        {/* State + warnings */}
        <Box style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
          {assessmentState === 0 ? (
            <Box
              px={8}
              py={3}
              style={{
                background: C.amberBg,
                border: `1px solid ${C.amberBorder}`,
                borderRadius: 4,
                fontSize: 10,
                fontWeight: 600,
                color: "#92400e",
              }}
            >
              Bản nháp
            </Box>
          ) : (
            <Box
              px={8}
              py={3}
              style={{
                background: C.tealLight,
                border: `1px solid ${C.tealBorder}`,
                borderRadius: 4,
                fontSize: 10,
                fontWeight: 600,
                color: C.tealDark,
              }}
            >
              {STATE_CONFIG[assessmentState]?.label ?? assessmentState}
            </Box>
          )}
          {disciplineBlocked && (
            <Text size="10px" style={{ color: "#92400e", fontWeight: 600 }}>
              ⚠️ Kỷ luật — max TB
            </Text>
          )}
          {totalOver100 && (
            <Text size="10px" style={{ color: C.danger, fontWeight: 600 }}>
              ⚠️ Vượt 100
            </Text>
          )}
        </Box>
      </Group>

      {/* ── Action buttons ── */}
      {!readOnly && (
        <Box style={{ display: "flex", gap: 8 }}>
          <Button
            flex={1}
            variant="light"
            radius="md"
            size="sm"
            fw={600}
            loading={savingDraft}
            disabled={submitting}
            onClick={onSaveDraft}
            styles={{
              root: {
                border: `1px solid ${C.border2}`,
                color: C.infoText,
                background: C.infoBg,
                fontFamily: "inherit",
                fontSize: 13,
              },
            }}
          >
            Lưu nháp
          </Button>
          <Button
            flex={2}
            radius="md"
            size="sm"
            fw={600}
            loading={submitting}
            disabled={!canSubmit || savingDraft}
            onClick={onSubmit}
            style={{
              background: canSubmit && !disciplineBlocked ? C.teal : C.text3,
              color: C.white,
              fontFamily: "inherit",
              fontSize: 13,
              cursor: canSubmit && !disciplineBlocked ? "pointer" : "not-allowed",
            }}
          >
            {!hasSavedDraft ? "Chưa lưu nháp" : "Nộp tự đánh giá →"}
          </Button>
          {!hasSavedDraft && !readOnly && (
            <Text size="10px" style={{ color: C.danger, textAlign: "center", marginTop: 2 }}>
              Vui lòng Lưu nháp trước khi Nộp
            </Text>
          )}
        </Box>
      )}

      {readOnly && (
        <Box ta="center" style={{ color: C.teal, fontSize: 12, fontWeight: 600 }}>
          ✓ Đã nộp — chờ GVCN duyệt
        </Box>
      )}
    </Box>
  );
}
