import { C } from "@/app/operation/ctsv/pointReview/shared/pointReview.constants";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { Box, Group, Modal, Stack, Text } from "@mantine/core";
import { useState } from "react";

const PRESET_REASONS = [
  "Không đáp ứng yêu cầu tham dự tối thiểu.",
  "Bài thu hoạch / minh chứng không đạt yêu cầu.",
  "Vắng mặt không có lý do chính đáng.",
  "Không nộp báo cáo theo deadline.",
  "Tham gia không đủ thời lượng quy định.",
];

export default function PointReviewRejectModal({
  opened,
  onClose,
  onConfirm,
  studentName,
  loading,
}: {
  opened: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  studentName: string;
  loading?: boolean;
}) {
  const [reason, setReason] = useState("");

  function handleConfirm() {
    onConfirm(reason.trim());
    setReason("");
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={700} style={{ color: C.navy, fontFamily: "'Roboto', sans-serif", fontSize: 16 }}>
          Từ chối — {studentName}
        </Text>
      }
      radius="md"
      centered
      styles={{
        content: { background: C.white },
        header: {
          background: C.white,
          borderBottom: `1px solid ${C.neutralBorder}`,
          paddingBottom: 12,
        },
        body: { padding: 20 },
      }}
    >
      <Stack gap="md">
        <Box>
          <Text
            size="sm"
            fw={700}
            mb={6}
            style={{
              color: C.textMid,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontSize: 11,
            }}
          >
            Lý do từ chối
          </Text>
          <Stack gap={6}>
            {PRESET_REASONS.map((r) => (
              <Box
                key={r}
                onClick={() => setReason(r)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: `1px solid ${reason === r ? C.orange : C.neutralBorder}`,
                  background: reason === r ? C.orangeLight : C.neutralBg,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <Text size="sm" style={{ color: reason === r ? C.orange : C.textMid }}>
                  {r}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>

        <CustomTextArea
          label="Hoặc nhập lý do khác"
          placeholder="Nhập lý do từ chối..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          maxRows={3}
          radius="sm"
          styles={{
            input: {
              border: `1px solid ${C.neutralBorder}`,
              background: C.white,
              color: C.navy,
              fontFamily: "'Roboto', sans-serif",
            },
            label: {
              marginBottom: 4,
              fontSize: 11,
              fontWeight: 700,
              color: C.textMid,
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
            },
          }}
        />

        <Group justify="flex-end" gap="sm">
          <CustomButton
            variant="light"
            radius="sm"
            onClick={onClose}
            styles={{
              root: {
                border: `1px solid ${C.neutralBorder}`,
                color: C.textMid,
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 600,
              },
            }}
          >
            Hủy
          </CustomButton>
          <CustomButton
            radius="sm"
            disabled={!reason.trim()}
            loading={loading}
            onClick={handleConfirm}
            styles={{
              root: {
                background: C.orange,
                color: C.white,
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 700,
                "&:disabled": { background: C.neutralDark, color: C.textMuted },
              },
            }}
          >
            Xác nhận từ chối
          </CustomButton>
        </Group>
      </Stack>
    </Modal>
  );
}
