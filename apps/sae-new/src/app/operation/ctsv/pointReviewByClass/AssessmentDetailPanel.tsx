"use client";



import {
  Avatar,
  Badge,
  Box,
  Flex,
  Group,
  ScrollArea,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import {
  IconAward,
  IconClock,
  IconEdit,
  IconHistory,
  IconX,
} from "@tabler/icons-react";
import {
  StudentAssessment,
  CriterionScore,
  STATE_CONFIG,
  CLASSIFICATION_CONFIG,
  Classification,
  AssessmentState,
  StudentSelfAssessmentStateNum,
  STATE_LABEL,
} from "./types";
import { getInitials, formatShortDate } from "./shared/constants";
import { DisciplineBanner } from "./components/DisciplineBanner";
import { AuditLogTab } from "./components/AuditLogTab";
import { ActivitiesTab } from "./components/ActivitiesTab";
import { CriteriaGroup } from "./components/CriteriaGroup";
import { C } from "@/app/operation/ctsv/pointReviewByClass/shared/colors";
import InDevelopmentPage from "@/shared/components/dataDisplay/InDevelopment";

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const MAX_TOTAL = 100;

// ─────────────────────────────────────────────
// Classification Score Bar (inline – used only here)
// ─────────────────────────────────────────────

function ClassificationBar({
  score,
  classification,
  teacherClassification,
}: {
  score: number;
  classification: Classification;
  teacherClassification?: Classification | null;
}) {
  const clsCfg = CLASSIFICATION_CONFIG[classification];
  const pct = Math.min((score / MAX_TOTAL) * 100, 100);

  return (
    <Box>
      <Group justify="space-between" mb={6}>
        <Group gap="xs">
          <Text
            size="xs"
            fw={700}
            style={{
              color: C.textMuted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Tổng điểm
          </Text>
          {teacherClassification && (
            <Badge
              size="xs"
              radius="sm"
              style={{
                background: CLASSIFICATION_CONFIG[teacherClassification].bg,
                color: CLASSIFICATION_CONFIG[teacherClassification].color,
                border: `1px solid ${CLASSIFICATION_CONFIG[teacherClassification].border}`,
                fontWeight: 700,
                fontSize: "10px",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              GVCN: {teacherClassification}
            </Badge>
          )}
        </Group>
        <Badge
          size="md"
          radius="md"
          style={{
            background: clsCfg.bg,
            color: clsCfg.color,
            border: `1px solid ${clsCfg.border}`,
            fontWeight: 800,
            fontSize: "12px",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          {classification}
        </Badge>
      </Group>

      <Flex align="baseline" gap={4} mb={6}>
        <Text
          fw={800}
          style={{
            fontSize: 44,
            color: clsCfg.color,
            fontFamily: "'Roboto', sans-serif",
            lineHeight: 1,
          }}
        >
          {score}
        </Text>
        <Text
          size="sm"
          fw={500}
          style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}
        >
          / {MAX_TOTAL}
        </Text>
      </Flex>

      <Box style={{ height: 8, borderRadius: 99, background: C.neutralDark, overflow: "hidden" }}>
        <Box
          style={{
            height: "100%",
            width: `${pct}%`,
            background: clsCfg.color,
            borderRadius: 99,
            transition: "width 0.35s ease",
          }}
        />
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

interface AssessmentDetailPanelProps {
  student: StudentAssessment;
  draftScores: Record<string, number>;
  draftComment: string;
  onDraftScore: (id: string, score: number) => void;
  onDraftComment: (c: string) => void;
  totalDraftScore: number;
  draftClassification: Classification;
  isReadOnly?: boolean;
}

export function AssessmentDetailPanel({
  student,
  draftScores,
  draftComment,
  onDraftScore,
  onDraftComment,
  totalDraftScore,
  draftClassification,
  isReadOnly = false,
}: AssessmentDetailPanelProps) {
  // Map numeric state to string label for STATE_CONFIG (string keys)
  const stateLabel: AssessmentState = (STATE_LABEL[student.state as StudentSelfAssessmentStateNum] ?? "Draft") as AssessmentState;
  const stateCfg = STATE_CONFIG[stateLabel];
  const selfScore = student.totalScore;
  const selfClassification: Classification = student.classification as Classification;
  const isRejected = student.state === StudentSelfAssessmentStateNum.Draft;
  const isApproved = student.state !== StudentSelfAssessmentStateNum.PendingClassApproval;

  // Effective scores for display — prefer draft, then classApprovalScore, then score
  const effectiveScores: Record<string, number> = {};
  student.criteria.forEach((c) => {
    effectiveScores[c.id] = draftScores[c.id] ?? c.classApprovalScore ?? c.score ?? 0;
  });

  return (
    <Box style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* ── Hero Header ── */}
      <Box
        style={{
          background: "linear-gradient(160deg, #1A2744 0%, #2D4270 60%, #3D5A8A 100%)",
          padding: "24px 28px",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Box
          style={{
            position: "absolute", right: -50, top: -50,
            width: 220, height: 220,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.10)",
            pointerEvents: "none",
          }}
        />
        <Box
          style={{
            position: "absolute", right: -10, bottom: -80,
            width: 160, height: 160,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.07)",
            pointerEvents: "none",
          }}
        />
        <Box
          style={{
            position: "absolute", left: 20, bottom: 16,
            width: 100, height: 100,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.10) 1.5px, transparent 1.5px)",
            backgroundSize: "12px 12px",
            pointerEvents: "none",
          }}
        />

        <Flex justify="space-between" align="flex-start" gap="md" wrap="wrap">
          <Box>
            <Group gap={8} mb={6}>
              <Avatar
                size={44}
                radius="md"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  fontWeight: 800,
                  fontSize: "15px",
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                {getInitials(student.studentName ?? "")}
              </Avatar>
              <Box>
                <Text
                  fw={800}
                  style={{ color: "white", fontFamily: "'Roboto', sans-serif", fontSize: "20px", lineHeight: 1.2 }}
                >
                  {student.studentName ?? "—"}
                </Text>
                <Text size="xs" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Roboto', sans-serif" }}>
                  {student.studentCode ?? "—"}
                </Text>
              </Box>
            </Group>
            <Group gap={8}>
              <Badge
                size="sm"
                radius="sm"
                style={{
                  background: stateCfg.bg,
                  color: stateCfg.color,
                  border: `1px solid ${stateCfg.border}`,
                  fontWeight: 700,
                  fontSize: "11px",
                }}
              >
                {stateCfg.label}
              </Badge>
              <Group gap={4}>
                <IconClock size={12} color="rgba(255,255,255,0.45)" />
                <Text size="xs" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Roboto', sans-serif" }}>
                  Nộp: {formatShortDate(student.submittedAt ?? "")}
                </Text>
              </Group>
            </Group>
          </Box>

          <Box
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 12,
              padding: "12px 18px",
              textAlign: "center",
              minWidth: 100,
              backdropFilter: "blur(4px)",
            }}
          >
            <Text
              size="xs"
              fw={700}
              style={{
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "'Roboto', sans-serif",
                marginBottom: 2,
              }}
            >
              SV tự chấm
            </Text>
            <Text
              fw={800}
              style={{ fontSize: 28, color: "white", fontFamily: "'Roboto', sans-serif", lineHeight: 1 }}
            >
              {selfScore}
              <Text span size="sm" fw={400} style={{ color: "rgba(255,255,255,0.45)" }}>
                /{MAX_TOTAL}
              </Text>
            </Text>
            <Badge
              size="xs"
              radius="sm"
              mt={4}
              style={{
                background: CLASSIFICATION_CONFIG[selfClassification].bg,
                color: CLASSIFICATION_CONFIG[selfClassification].color,
                fontWeight: 700,
                fontSize: "10px",
              }}
            >
              {selfClassification}
            </Badge>
          </Box>
        </Flex>
      </Box>

      {/* ── Tabs ── */}
      <Tabs
        defaultValue="criteria"
        style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
        styles={{
          root: { height: "100%", display: "flex", flexDirection: "column" },
          panel: { flex: 1, overflow: "hidden", padding: "20px 24px" },
          list: {
            flexShrink: 0,
            background: C.white,
            borderBottom: "1px solid #E8E2D9",
            padding: "0 24px",
            gap: 0,
          },
        }}
      >
        <Tabs.List>
          <Tabs.Tab
            value="criteria"
            leftSection={<IconEdit size={13} />}
            style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600, fontSize: "12px", color: C.textLight }}
          >
            Điểm &amp; Tiêu chí
          </Tabs.Tab>
          <Tabs.Tab
            value="history"
            leftSection={<IconHistory size={13} />}
            style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600, fontSize: "12px", color: C.textLight }}
          >
            Lịch sử
          </Tabs.Tab>
          <Tabs.Tab
            value="activities"
            leftSection={<IconAward size={13} />}
            style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600, fontSize: "12px", color: C.textLight }}
          >
            Hoạt động
          </Tabs.Tab>
        </Tabs.List>

        {/* ── Criteria Tab ── */}
        <Tabs.Panel value="criteria" style={{ height: "100%", overflow: "hidden" }}>
          <ScrollArea h="calc(100% - 0px)" offsetScrollbars>
            <Stack gap="md">
              <DisciplineBanner student={student} />

              {/* Classification Summary */}
              <Box
                p="lg"
                style={{ background: C.neutralCard, border: "1px solid #E8E2D9", borderRadius: 14 }}
              >
                <Group justify="space-between" align="flex-start" mb="md">
                  <Box>
                    <Text
                      size="xs"
                      fw={700}
                      mb={4}
                      style={{ color: C.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Roboto', sans-serif" }}
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
                      {isApproved && (
                        <Badge size="sm" radius="sm"
                          style={{ background: C.greenLight, color: C.green, border: "1px solid #2D7D46", fontWeight: 700, fontSize: "11px", fontFamily: "'Roboto', sans-serif" }}>
                          Đã duyệt
                        </Badge>
                      )}
                      {isRejected && (
                        <Badge size="sm" radius="sm"
                          style={{ background: C.redLight, color: C.red, border: "1px solid #C0392B", fontWeight: 700, fontSize: "11px", fontFamily: "'Roboto', sans-serif" }}>
                          Đã trả lại
                        </Badge>
                      )}
                    </Group>
                  )}
                </Group>

                <Box
                  p="md"
                  style={{
                    background: isReadOnly ? C.neutralCard : C.white,
                    border: `1px solid ${isReadOnly ? C.neutralDark : C.textPlaceholder}`,
                    borderRadius: 10,
                  }}
                >
                  <Group justify="space-between" mb={4}>
                    <Group gap={6}>
                      <IconAward size={13} color={CLASSIFICATION_CONFIG[draftClassification].color} />
                      <Text
                        size="xs"
                        fw={700}
                        style={{ color: CLASSIFICATION_CONFIG[draftClassification].color, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Roboto', sans-serif" }}
                      >
                        GVCN điều chỉnh
                      </Text>
                    </Group>
                    <Badge
                      size="md"
                      radius="md"
                      style={{
                        background: CLASSIFICATION_CONFIG[draftClassification].bg,
                        color: CLASSIFICATION_CONFIG[draftClassification].color,
                        border: `1px solid ${CLASSIFICATION_CONFIG[draftClassification].border}`,
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
                      style={{ fontSize: 44, color: CLASSIFICATION_CONFIG[draftClassification].color, fontFamily: "'Roboto', sans-serif", lineHeight: 1 }}
                    >
                      {totalDraftScore}
                    </Text>
                    <Text size="sm" fw={500} style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}>
                      / {MAX_TOTAL}
                    </Text>
                    {totalDraftScore !== selfScore && (
                      <Badge
                        size="xs"
                        radius="sm"
                        style={{
                          background: totalDraftScore > selfScore ? C.greenLight : C.redLight,
                          color: totalDraftScore > selfScore ? C.green : C.red,
                          fontWeight: 700,
                          fontSize: "10px",
                          fontFamily: "'Roboto', sans-serif",
                        }}
                      >
                        {totalDraftScore > selfScore ? "+" : ""}{totalDraftScore - selfScore}
                      </Badge>
                    )}
                  </Flex>

                  <Box style={{ height: 6, borderRadius: 99, background: C.neutralDark, overflow: "hidden" }}>
                    <Box
                      style={{
                        height: "100%",
                        width: `${Math.min((totalDraftScore / MAX_TOTAL) * 100, 100)}%`,
                        background: CLASSIFICATION_CONFIG[draftClassification].color,
                        borderRadius: 99,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Reject reason */}
              {isRejected && student.classRejectComment && (
                <Box p="md" style={{ background: C.redLight, border: "1px solid #F0C0B8", borderRadius: 10 }}>
                  <Group gap={6} mb={4}>
                    <IconX size={13} color={C.red} />
                    <Text
                      size="xs"
                      fw={700}
                      style={{ color: C.red, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Roboto', sans-serif" }}
                    >
                      Lý do trả lại
                    </Text>
                  </Group>
                  <Text size="sm" style={{ color: C.redDark, fontFamily: "'Roboto', sans-serif", lineHeight: 1.6 }}>
                    {student.classRejectComment}
                  </Text>
                </Box>
              )}

              {/* Criteria groups */}
              <Box>
                <Text
                  size="xs"
                  fw={700}
                  mb="sm"
                  style={{ color: C.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Roboto', sans-serif" }}
                >
                  Chi tiết từng tiêu chí
                </Text>
                <Stack gap="xs">
                  {(() => {
                    const parents = student.criteria.filter((c) => c.parentId === null);
                    const childMap: Record<string, CriterionScore[]> = {};
                    student.criteria
                      .filter((c) => c.parentId !== null)
                      .forEach((c) => {
                        if (!childMap[c.parentId!]) childMap[c.parentId!] = [];
                        childMap[c.parentId!]!.push(c);
                      });
                    return parents.map((parent, i) => {
                      const children = childMap[parent.id] ?? [];
                      const hasChildren = children.length > 0;
                      // Orphan parent (no children): fall back to its own score
                      // Normal parent: sum of children's effective scores
                      const parentScore = hasChildren
                        ? children.reduce((sum, child) => sum + (effectiveScores[child.id] ?? 0), 0)
                        : (effectiveScores[parent.id] ?? parent.score ?? 0);
                      return (
                        <CriteriaGroup
                          key={parent.id}
                          parent={parent}
                          items={children}
                          parentScore={parentScore}
                          effectiveScores={effectiveScores}
                          onDraftScore={onDraftScore}
                          isReadOnly={isReadOnly}
                          animIndex={i}
                        />
                      );
                    });
                  })()}
                </Stack>
              </Box>

              {/* Comment */}
              {!isReadOnly && (
                <Box>
                  <CustomTextArea
                    label="Nhận xét (tùy chọn)"
                    placeholder="Nhập nhận xét cho sinh viên..."
                    value={draftComment}
                    onChange={(e) => onDraftComment(e.target.value)}
                    minRows={3}
                    maxRows={3}
                    styles={{
                      input: {
                        background: C.neutralCard,
                        border: "1px solid #E8E2D9",
                        color: C.textDark,
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "13px",
                        "&::placeholder": { color: C.textPlaceholder },
                      },
                    }}
                  />
                </Box>
              )}
            </Stack>
          </ScrollArea>
        </Tabs.Panel>

        {/* ── History Tab ── */}
        <Tabs.Panel value="history">
          <ScrollArea h="100%" offsetScrollbars>
            <InDevelopmentPage/>
            {/* <AuditLogTab student={student} /> */}
          </ScrollArea>
        </Tabs.Panel>

        {/* ── Activities Tab ── */}
        <Tabs.Panel value="activities">
          <ScrollArea h="100%" offsetScrollbars>
            <InDevelopmentPage/>
            {/* <ActivitiesTab student={student} /> */}
          </ScrollArea>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
