"use client";

import { C } from "../shared/colors";



import {
  Box,
  Flex,
  Modal,
  Text,
} from "@mantine/core";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { IconCheck, IconAlertTriangle } from "@tabler/icons-react";
import { StudentAssessment, CLASSIFICATION_CONFIG, Classification } from "../types";

interface ConfirmApproveModalProps {
  opened: boolean;
  student: StudentAssessment | null;
  totalDraftScore: number;
  draftClassification: Classification;
  hasScoreChanges: boolean;
  disciplineLevel: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmApproveModal({
  opened,
  student,
  totalDraftScore,
  draftClassification,
  hasScoreChanges,
  disciplineLevel,
  onClose,
  onConfirm,
}: ConfirmApproveModalProps) {
  if (!student) return null;

  const clsCfg = CLASSIFICATION_CONFIG[draftClassification];
  const blockedByDiscipline =
    disciplineLevel === "Cảnh cáo" &&
    (draftClassification === "Xuất sắc" ||
      draftClassification === "Tốt" ||
      draftClassification === "Khá");

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="md"
      radius="lg"
      withCloseButton={false}
      styles={{
        content: { background: C.white, border: "1px solid #E8E2D9" },
        body: { padding: "28px 28px 24px" },
      }}
    >
      {/* Header icon */}
      <Flex justify="space-between" align="center" mb="lg">
        <Box
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: C.greenLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <IconCheck size={18} color={C.green} />
        </Box>
        <CustomButton
          isCheckPermission={false}
          variant="subtle"
          size="xs"
          color="gray"
          onClick={onClose}
          styles={{ root: { color: C.textMuted, fontFamily: "'Roboto', sans-serif" } }}
        >
          ✕
        </CustomButton>
      </Flex>

      <Text
        size="lg"
        fw={700}
        mb={4}
        style={{ color: C.navy, fontFamily: "'Roboto', sans-serif" }}
      >
        Xác nhận trình duyệt
      </Text>

      <Text size="sm" mb="lg"
        style={{ color: C.textLight, fontFamily: "'Roboto', sans-serif", lineHeight: 1.6 }}>
        Đánh giá sẽ được chuyển lên cấp Khoa để phê duyệt tiếp theo.
      </Text>

      {/* Summary card */}
      <Box
        mb="lg"
        p="md"
        style={{
          background: C.neutralCard,
          border: `1px solid ${clsCfg.border}`,
          borderRadius: 12,
        }}
      >
        {/* Student */}
        <Box mb="md" pb="md" style={{ borderBottom: "1px solid #E8E2D9" }}>
          <Text
            size="xs"
            fw={700}
            mb={2}
            style={{ color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Roboto', sans-serif" }}
          >
            Sinh viên
          </Text>
          <Text size="sm" fw={600}
            style={{ color: C.navy, fontFamily: "'Roboto', sans-serif" }}>
            {student.studentName ?? "—"}
          </Text>
          <Text size="xs" style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}>
            {student.studentCode ?? "—"}
          </Text>
        </Box>

        {/* Scores */}
        <Flex gap="lg" mb="md">
          <Box style={{ flex: 1 }}>
            <Text size="xs" fw={700} mb={2}
              style={{ color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Roboto', sans-serif" }}>
              SV tự chấm
            </Text>
            <Text size="lg" fw={800}
              style={{ color: C.textDark, fontFamily: "'Roboto', sans-serif" }}>
              {student.totalScore}
              <Text span size="sm" fw={400} style={{ color: C.textMuted }}>/100</Text>
            </Text>
          </Box>
          <Box
            style={{
              width: 1,
              background: C.neutralDark,
              alignSelf: "stretch",
            }}
          />
          <Box style={{ flex: 1 }}>
            <Text size="xs" fw={700} mb={2}
              style={{ color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Roboto', sans-serif" }}>
              GVCN điều chỉnh
            </Text>
            <Text size="lg" fw={800}
              style={{ color: clsCfg.color, fontFamily: "'Roboto', sans-serif" }}>
              {totalDraftScore}
              <Text span size="sm" fw={400} style={{ color: C.textMuted }}>/100</Text>
            </Text>
          </Box>
        </Flex>

        {/* Classification */}
        <Box
          p="sm"
          style={{
            background: clsCfg.bg,
            border: `1px solid ${clsCfg.border}`,
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <Text
            size="xs"
            fw={700}
            mb={2}
            style={{
              color: clsCfg.color,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Xếp loại mới
          </Text>
          <Text
            size="xl"
            fw={800}
            style={{ color: clsCfg.color, fontFamily: "'Roboto', sans-serif" }}
          >
            {draftClassification}
          </Text>
        </Box>
      </Box>

      {/* Warnings */}
      {blockedByDiscipline && (
        <Flex align="center" gap={8} mb="md" p="sm"
          style={{ background: C.amberBg, border: "1px solid #F0D98A", borderRadius: 8 }}>
          <IconAlertTriangle size={15} color={C.amberText} />
          <Text size="xs" style={{ color: C.amberDark, fontFamily: "'Roboto', sans-serif", lineHeight: 1.5 }}>
            SV bị kỷ luật <strong>Cảnh cáo</strong> → xếp loại không vượt quá{" "}
            <strong>Trung bình</strong>. Vui lòng điều chỉnh lại điểm.
          </Text>
        </Flex>
      )}

      {hasScoreChanges && !blockedByDiscipline && (
        <Box
          mb="md"
          p="sm"
          style={{ background: C.navyPale, border: "1px solid #C5CEE0", borderRadius: 8 }}
        >
          <Text size="xs" style={{ color: C.navyDark, fontFamily: "'Roboto', sans-serif", lineHeight: 1.5 }}>
            Bạn đã thay đổi điểm so với đề xuất của sinh viên.
            Nhấn xác nhận để chuyển đánh giá lên cấp Khoa.
          </Text>
        </Box>
      )}

      {/* Actions */}
      <Flex gap="sm" justify="flex-end">
        <CustomButton
          isCheckPermission={false}
          variant="default"
          size="sm"
          radius="md"
          onClick={onClose}
          styles={{
            root: {
              border: "1px solid #E8E2D9",
              color: C.textDark,
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 600,
            },
          }}
        >
          Hủy
        </CustomButton>
        <CustomButton
          isCheckPermission={false}
          size="sm"
          radius="md"
          leftSection={<IconCheck size={13} />}
          disabled={blockedByDiscipline}
          onClick={onConfirm}
          styles={{
            root: {
              background: blockedByDiscipline ? C.neutralDark : C.green,
              color: blockedByDiscipline ? C.textMuted : "white",
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 700,
              cursor: blockedByDiscipline ? "not-allowed" : "pointer",
            },
          }}
        >
          Xác nhận trình duyệt
        </CustomButton>
      </Flex>
    </Modal>
  );
}
