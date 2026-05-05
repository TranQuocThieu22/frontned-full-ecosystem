
"use client";

import { Box, Button, Group, Text } from "@mantine/core";
import { C, CLASSIFICATION_CONFIG, DIEU_COLORS } from "../shared/constants";
import type { Classification } from "@/shared/consts/classification";
import type { CriterionWithSub, StudentSelfAssessmentState } from "@/shared/APIs/studentSelfAssessmentService";
import { STATE_CONFIG } from "../shared/constants";

interface Props {
  totalScore: number;
  classification: Classification;
  scores: Record<string, number>;
  criteria: CriterionWithSub[];
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

export default function SelfAssessmentSummaryPanel({
  totalScore,
  classification,
  scores,
  criteria,
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
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
        maxHeight: "calc(100vh - 120px)",
        overflowY: "auto",
      }}
    >
      {/* ── Summary heading ── */}
      <Box
        px={16}
        py={12}
        style={{
          background: C.surface2,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <Text
          size="xs"
          fw={600}
          style={{
            color: C.text2,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Tổng kết
        </Text>
      </Box>

      {/* ── Score ring + classification ── */}
      <Box
        px={16}
        py={20}
        style={{ borderBottom: `1px solid ${C.border}`, textAlign: "center" }}
      >
        {/* Score ring */}
        <Box
          mx="auto"
          mb={10}
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            border: `5px solid ${cfg.color}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.3s",
            animation: "ringPulse 3s ease infinite",
          }}
        >
          <Text
            fw={700}
            style={{
              color: cfg.color,
              lineHeight: 1,
              transition: "color 0.3s",
            }}
          >
            {totalScore}
          </Text>
          <Text size="11px" style={{ color: C.text3 }}>
            / 100
          </Text>
        </Box>

        {/* Classification */}
        <Text
          size="sm"
          fw={600}
          style={{ color: cfg.color, transition: "color 0.3s" }}
        >
          Loại {cfg.label}
        </Text>
      </Box>

      {/* ── Per-Điều breakdown ── */}
      <Box px={16} py={12} style={{ borderBottom: `1px solid ${C.border}` }}>
        {criteria.map((c, i) => {
          const colors = DIEU_COLORS[c.code] ?? { dot: C.teal };
          // Parent score = sum of sub scores if has subs, else direct score
          const val = c.subCriteria && c.subCriteria.length > 0
            ? c.subCriteria.reduce((s, sub) => s + (scores[sub.id] ?? 0), 0)
            : (scores[c.id] ?? 0);
          return (
            <Box
              key={c.id}
              py={7}
              style={{
                borderBottom: i < criteria.length - 1 ? `1px solid ${C.border}` : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Group gap={6}>
                <Box
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: colors.dot,
                    flexShrink: 0,
                  }}
                />
                <Text size="sm" fw={500} style={{ color: C.text2 }}>
                  {c.code}
                </Text>
              </Group>
              <Text
                size="sm"
                fw={600}
                style={{ color: val > c.maxScore ? C.danger : C.text1 }}
              >
                {val} / {c.maxScore}
              </Text>
            </Box>
          );
        })}
      </Box>

      {/* ── Status + Actions ── */}
      <Box px={16} py={14}>
        {/* State badge */}
        {assessmentState === 0 ? (
          <Box
            mb={8}
            px={12}
            py={8}
            style={{
              background: '#FFF8DE',
              color: "#92400e",
              border: `1px solid ${C.amberBorder}`,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <span>⚠️</span>
            Trạng thái: <strong>Bản nháp</strong>
          </Box>
        ) : (
          <Box
            mb={8}
            px={12}
            py={8}
            style={{
              background: C.tealLight,
              color: C.tealDark,
              border: `1px solid ${C.tealBorder}`,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            ✓ Trạng thái: <strong>{STATE_CONFIG[assessmentState]?.label ?? assessmentState}</strong>
          </Box>
        )}

        {/* Discipline warning */}
        {disciplineBlocked && (
          <Box
            mb={8}
            px={12}
            py={6}
            style={{
              background: C.amberBg,
              border: `1px solid ${C.amberBorder}`,
              borderRadius: 6,
              fontSize: 11,
              color: "#92400e",
            }}
          >
            ⚠️ Kỷ luật — xếp loại tối đa: <strong>Trung bình</strong> (BR-03)
          </Box>
        )}

        {/* Total > 100 warning */}
        {totalOver100 && (
          <Box
            mb={8}
            px={12}
            py={6}
            style={{
              background: C.dangerBg,
              border: `1px solid ${C.dangerBorder}`,
              borderRadius: 6,
              fontSize: 11,
              color: C.danger,
            }}
          >
            ⚠️ Tổng điểm vượt quá 100 — không thể nộp (BR-02)
          </Box>
        )}

        {/* Action buttons */}
        {!readOnly && (
          <Box style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Button
              fullWidth
              variant="light"
              radius="md"
              size="md"
              // fw={700}
              loading={savingDraft}
              disabled={submitting}
              onClick={onSaveDraft}
              styles={{
                root: {
                  border: `1px solid ${C.border2}`,
                  color: C.infoText,
                  background: C.infoBg,
                  fontFamily: "inherit",
                  "&:hover": { background: C.surface2 },
                },
              }}
            >
              Lưu nháp
            </Button>
            <Button
              fullWidth
              radius="md"
              size="md"
              // fw={700}
              loading={submitting}
              disabled={!canSubmit || savingDraft}
              onClick={onSubmit}
              style={{
                background: canSubmit && !disciplineBlocked ? C.teal : C.text3,
                color: C.white,
                fontFamily: "inherit",
                cursor: canSubmit && !disciplineBlocked ? "pointer" : "not-allowed",
              }}
            >
              {!hasSavedDraft ? "Chưa lưu nháp" : "Nộp tự đánh giá →"}
            </Button>
          </Box>
        )}

        {readOnly && (
          <Box
            ta="center"
            py={4}
            style={{ color: C.teal, fontSize: 12, fontWeight: 600 }}
          >
            ✓ Đã nộp — chờ GVCN duyệt
          </Box>
        )}
      </Box>
    </Box>
  );
}
