"use client";

import { C } from "./shared/colors";



import { Box, Flex, Group, Text } from "@mantine/core";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { IconAlertTriangle, IconCheck, IconSend } from "@tabler/icons-react";
import { Classification, CLASSIFICATION_CONFIG } from "./types";
import { StatusBadge } from "@/shared/components/dataDisplay/StatusBadge";

interface ActionFooterProps {
  totalDraftScore: number;
  draftClassification: Classification;
  selfScore: number;
  hasScoreChanges: boolean;
  canApprove: boolean;
  disciplineLevel: string | null;
  onSave: () => void;
  onApprove: () => void;
  onReject: () => void;
  saveSuccess: boolean;
}

export function ActionFooter({
  totalDraftScore,
  draftClassification,
  selfScore,
  hasScoreChanges,
  canApprove,
  disciplineLevel,
  onSave,
  onApprove,
  onReject,
  saveSuccess,
}: ActionFooterProps) {
  // BR-05: Cảnh cáo → cannot be ≥ Khá
  const blockedByDiscipline =
    disciplineLevel === "Cảnh cáo" &&
    (draftClassification === "Xuất sắc" ||
      draftClassification === "Tốt" ||
      draftClassification === "Khá");

  const clsCfg = CLASSIFICATION_CONFIG[draftClassification];

  return (
    <Box
      px="xl"
      py="md"
      style={{
        background: C.white,
        borderTop: "1px solid #E8E2D9",
        flexShrink: 0,
      }}
    >
      <Flex justify="space-between" align="center" gap="md" wrap="wrap">

        {/* ── Left: status message ── */}
        <Box style={{ flex: 1, minWidth: 0 }}>
          {blockedByDiscipline ? (
            <Flex align="center" gap={6} px={10} py={4}
              style={{ background: C.amberBg, border: "1px solid #F0D98A", borderRadius: 6 }}>
              <IconAlertTriangle size={13} color={C.amberText} />
              <Text size="xs" fw={600}
                style={{ color: C.amberText, fontFamily: "'Roboto', sans-serif" }}>
                SV bị kỷ luật Cảnh cáo → xếp loại tối đa{" "}
                <Text span fw={700}>Trung bình</Text>
              </Text>
            </Flex>
          ) : saveSuccess ? (
            <Flex align="center" gap={6} px={10} py={4}
              style={{ background: C.greenLight, border: "1px solid #2D7D46", borderRadius: 6, animation: "successPop 0.3s ease both" }}>
              <IconCheck size={13} color={C.green} />
              <Text size="xs" fw={700}
                style={{ color: C.green, fontFamily: "'Roboto', sans-serif" }}>
                Đã lưu thành công
              </Text>
            </Flex>
          ) : (
            <Group gap={8} align="center">
              <Text size="xs" style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}>
                Điểm GVCN:
              </Text>
              <StatusBadge
                label={`${totalDraftScore}đ · ${draftClassification}`}
                config={clsCfg}
                size="md"
                radius="md"
              />
              {hasScoreChanges && (
                <Text size="xs" style={{ color: C.amberText, fontFamily: "'Roboto', sans-serif" }}>
                  (đã chỉnh sửa)
                </Text>
              )}
            </Group>
          )}
        </Box>

        {/* ── Right: actions ── */}
        <Group gap="sm">
          {/* Save draft */}
          <CustomButton
            isCheckPermission={false}
            variant="default"
            size="sm"
            radius="md"
            onClick={onSave}
            disabled={!hasScoreChanges && !saveSuccess}
            styles={{
              root: {
                border: "1px solid #E8E2D9",
                color: C.textDark,
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 600,
              },
            }}
          >
            Lưu nháp
          </CustomButton>

          {/* Reject */}
          <CustomButton
            isCheckPermission={false}
            variant="outline"
            size="sm"
            radius="md"
            disabled={!canApprove}
            onClick={onReject}
            styles={{
              root: {
                border: "1px solid #F0C0B8",
                color: C.red,
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 700,
                background: "transparent",
              },
            }}
          >
            Trả lại
          </CustomButton>

          {/* Approve */}
          <CustomButton
            isCheckPermission={false}
            size="sm"
            radius="md"
            leftSection={<IconSend size={13} />}
            disabled={!canApprove || blockedByDiscipline}
            onClick={onApprove}
            styles={{
              root: {
                background:
                  canApprove && !blockedByDiscipline
                    ? C.green
                    : C.neutralDark,
                color:
                  canApprove && !blockedByDiscipline
                    ? "white"
                    : C.textMuted,
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 700,
                cursor:
                  canApprove && !blockedByDiscipline
                    ? "pointer"
                    : "not-allowed",
              },
            }}
          >
            Trình duyệt
          </CustomButton>
        </Group>
      </Flex>
    </Box>
  );
}
