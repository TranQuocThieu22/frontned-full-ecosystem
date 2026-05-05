import { C } from "@/app/operation/ctsv/pointReview/shared/pointReview.constants";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { Box, Group, Modal, Stack, Text } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";

export default function PointReviewApproveDialog({
  opened,
  onClose,
  onConfirm,
  count,
  maxScore,
  loading,
}: {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
  maxScore: number;
  loading?: boolean;
}) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      radius="md"
      centered
      size="sm"
      styles={{
        content: { background: C.white },
        header: { background: C.white },
        body: { padding: 24 },
      }}
    >
      <Stack align="center" gap="md">
        <Box
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: C.greenLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconCircleCheck size={28} color={C.green} />
        </Box>
        <Text
          fw={700}
          size="lg"
          ta="center"
          style={{ color: C.navy, fontFamily: "'Roboto', sans-serif" }}
        >
          Duyệt {count} sinh viên?
        </Text>
        <Text
          size="sm"
          ta="center"
          style={{ color: C.textMid, fontFamily: "'Roboto', sans-serif", lineHeight: 1.6 }}
        >
          Hệ thống sẽ ghi nhận{" "}
          <Text span fw={700} style={{ color: C.green }}>
            {count} sinh viên
          </Text>{" "}
          đã tham gia và cấp{" "}
          <Text span fw={700} style={{ color: C.green }}>
            {maxScore} điểm
          </Text>{" "}
          cho mỗi người.
        </Text>
        <Group gap="sm" w="100%" mt={4}>
          <CustomButton
            variant="light"
            radius="sm"
            fullWidth
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
            fullWidth
            loading={loading}
            onClick={onConfirm}
            styles={{
              root: {
                background: C.green,
                color: C.white,
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 700,
              },
            }}
          >
            Xác nhận duyệt
          </CustomButton>
        </Group>
      </Stack>
    </Modal>
  );
}
