"use client";

import { C } from "../shared/colors";



import {
  Box,
  Flex,
  Modal,
  Text,
} from "@mantine/core";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { IconX } from "@tabler/icons-react";
import { StudentAssessment } from "../types";

interface RejectModalProps {
  opened: boolean;
  student: StudentAssessment | null;
  reason: string;
  onClose: () => void;
  onConfirm: () => void;
  onReason: (r: string) => void;
}

export function RejectModal({
  opened,
  student,
  reason,
  onClose,
  onConfirm,
  onReason,
}: RejectModalProps) {
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
      {/* Header */}
      <Flex justify="space-between" align="center" mb="lg">
        <Box
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: C.redLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <IconX size={18} color={C.red} />
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
        Trả lại đánh giá
      </Text>

      <Text size="sm" mb="lg" style={{ color: C.textLight, fontFamily: "'Roboto', sans-serif", lineHeight: 1.6 }}>
        Sinh viên sẽ nhận được thông báo và cần chỉnh sửa đánh giá theo lý do bạn cung cấp.
      </Text>

      {/* Student preview */}
      {student && (
        <Box
          mb="md"
          p="sm"
          style={{
            background: C.neutralCard,
            border: "1px solid #E8E2D9",
            borderRadius: 10,
          }}
        >
          <Text
            size="xs"
            fw={700}
            mb={2}
            style={{ color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Roboto', sans-serif" }}
          >
            Sinh viên
          </Text>
          <Text
            size="sm"
            fw={600}
            style={{ color: C.navy, fontFamily: "'Roboto', sans-serif" }}
          >
            {student.studentName ?? "—"}
          </Text>
          <Text size="xs" style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}>
            {student.studentCode ?? "—"}
          </Text>
        </Box>
      )}

      {/* Reason textarea */}
      <Box mb="lg">
        <CustomTextArea
          label="Lý do trả lại"
          placeholder="Mô tả lý do cụ thể để sinh viên chỉnh sửa..."
          value={reason}
          onChange={(e) => onReason(e.target.value)}
          minRows={4}
          maxRows={4}
          required
          mb={6}
          styles={{
            input: {
              background: C.neutralCard,
              border: `1px solid ${!reason.trim() && opened ? C.redBorder : C.neutralDark}`,
              color: C.textDark,
              fontFamily: "'Roboto', sans-serif",
              fontSize: "13px",
              "&::placeholder": { color: C.textPlaceholder },
            },
          }}
        />
        <Text size="xs" style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}>
          Tối thiểu 10 ký tự. Lý do sẽ được ghi nhận trong lịch sử đánh giá.
        </Text>
      </Box>

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
          disabled={!reason.trim() || reason.trim().length < 10}
          onClick={onConfirm}
          styles={{
            root: {
              background:
                reason.trim().length >= 10 ? C.red : C.neutralDark,
              color: reason.trim().length >= 10 ? "white" : C.textMuted,
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 700,
              cursor:
                reason.trim().length >= 10 ? "pointer" : "not-allowed",
            },
          }}
        >
          Xác nhận trả lại
        </CustomButton>
      </Flex>
    </Modal>
  );
}
