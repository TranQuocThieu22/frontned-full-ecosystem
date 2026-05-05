"use client";

import { Box, Group, NumberInput, Text } from "@mantine/core";
import { C, DIEU_COLORS } from "../shared/constants";
import type { CriterionWithSub } from "@/shared/APIs/studentSelfAssessmentService";

interface Props {
  criterion: CriterionWithSub;
  score: number;                          // direct Điều score (used for II–V)
  subScores: Record<string, number>;    // all subScores keyed by sub.id (for I)
  readOnly: boolean;
  onChange: (id: string, value: number) => void;
}

function ScoreBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <Box style={{ flex: 1 }}>
      <Box
        style={{
          height: 8,
          borderRadius: 4,
          background: "#e5e7eb",
          overflow: "hidden",
          marginBottom: 3,
        }}
      >
        <Box
          style={{
            height: "100%",
            width: `${pct}%`,
            background: value > max ? C.danger : color,
            borderRadius: 4,
            transition: "width 0.25s, background 0.25s",
          }}
        />
      </Box>
      <Text size="10px" style={{ color: C.text3, textAlign: "right" }}>
        {Math.round(pct)}% / tối đa
      </Text>
    </Box>
  );
}

export default function SelfAssessmentScoreCard({
  criterion,
  score,
  subScores,
  readOnly,
  onChange,
}: Props) {
  const colors = DIEU_COLORS[criterion.id] ?? { dot: C.teal, bg: C.tealLight, border: C.tealBorder };
  const hasSubs = criterion.subCriteria && criterion.subCriteria.length > 0;

  // Điều I score = sum of subs; Điều II–V score = direct input
  const displayScore = hasSubs
    ? (criterion.subCriteria ?? []).reduce((sum, sub) => sum + (subScores[sub.id] ?? 0), 0)
    : score;

  const over = displayScore > criterion.maxScore;

  return (
    <Box
      className="sae-crit-card"
      mb={12}
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        overflow: "hidden",
        transition: "box-shadow 0.2s",
      }}
    >
      {/* ── Card Header ── */}
      <Box
        px={16}
        py={12}
        style={{
          background: colors.bg,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <Group justify="space-between" align="flex-start" wrap="wrap" gap={8}>
          <Group gap={8} align="center">
            <Box
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: colors.dot,
                flexShrink: 0,
              }}
            />
            <Text size="sm" fw={600} style={{ color: C.text1, lineHeight: 1.3 }}>
              Điều {criterion.code} — {criterion.name}
            </Text>
          </Group>
          <Text size="xs" style={{ color: C.text3, whiteSpace: "nowrap" }}>
            Tối đa {criterion.maxScore} điểm
          </Text>
        </Group>
      </Box>

      {/* ── Card Body ── */}
      <Box px={16} py={14}>
        {criterion.description && (
          <Text size="xs" mb={12} style={{ color: C.text3, lineHeight: 1.5 }}>
            {criterion.description}
          </Text>
        )}

        {/* ── Main score row ── */}
        <Group align="flex-start" gap={12}>
          {/* Score input / display */}
          <Box>
            {hasSubs ? (
              // Điều I: read-only display
              <Box
                w={72}
                h={40}
                style={{
                  border: `1.5px solid ${over ? C.danger : C.border2}`,
                  borderRadius: 6,
                  background: C.surface2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: over ? C.danger : C.text1,
                }}
              >
                <Text fw={700} style={{ fontSize: 18, color: over ? C.danger : C.text1, fontFamily: "inherit" }}>
                  {displayScore}
                </Text>
              </Box>
            ) : (
              // Điều II–V: editable input
              <NumberInput
                value={score}
                onChange={(v) => onChange(criterion.id, Number(v) || 0)}
                min={0}
                max={criterion.maxScore}
                readOnly={readOnly}
                hideControls
                w={72}
                h={40}
                styles={{
                  input: {
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: 18,
                    borderRadius: 6,
                    border: over ? `1.5px solid ${C.danger}` : `1.5px solid ${C.border2}`,
                    background: C.surface,
                    color: over ? C.danger : C.text1,
                    transition: "border-color 0.12s",
                    fontFamily: "inherit",
                    outline: "none",
                  },
                }}
                className={over ? "" : "sae-score-input"}
              />
            )}
            <Text size="xs" ta="center" mt={4} style={{ color: C.text3 }}>
              / {criterion.maxScore}
            </Text>
          </Box>

          {/* Progress bar */}
          <ScoreBar value={displayScore} max={criterion.maxScore} color={colors.dot} />
        </Group>

        {/* ── Sub-criteria rows (Điều I only) ── */}
        {hasSubs && (
          <Box
            mt={12}
            pt={12}
            style={{ borderTop: `1px solid ${C.border}` }}
          >
            {(criterion.subCriteria ?? []).map((sub) => {
              const subVal = subScores[sub.id] ?? 0;
              const subOver = subVal > sub.maxScore;
              return (
                <Group key={sub.id} justify="space-between" mb={8}>
                  <Text size="xs" style={{ color: C.text2 }}>
                    {sub.code} {sub.name}
                  </Text>
                  <Group gap={4}>
                    <NumberInput
                      value={subVal}
                      onChange={(v) => onChange(sub.id, Number(v) || 0)}
                      min={0}
                      max={sub.maxScore}
                      readOnly={readOnly}
                      hideControls
                      w={56}
                      h={28}
                      styles={{
                        input: {
                          textAlign: "center",
                          fontWeight: 500,
                          fontSize: 12,
                          borderRadius: 5,
                          border: subOver ? `1px solid ${C.danger}` : `1px solid ${C.border2}`,
                          background: C.surface,
                          color: subOver ? C.danger : C.text1,
                          outline: "none",
                          fontFamily: "inherit",
                        },
                      }}
                      className="sae-sub-input"
                    />
                    <Text size="xs" style={{ color: C.text3 }}>
                      / {sub.maxScore}
                    </Text>
                  </Group>
                </Group>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}
