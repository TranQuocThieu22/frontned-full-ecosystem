import { C } from '@/app/operation/ctsv/pointReview/shared/pointReview.constants';
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton';
import { Box, Group, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import React from 'react'

export default function RejectConfirmInline({
  studentName,
  onConfirm,
  onCancel,
  loading,
}: {
  studentName: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 16px",
        background: C.orangeLight,
        borderBottom: `1px solid ${C.neutralBorder}`,
        animation: "fadeUp 0.2s ease both",
      }}
    >
      <IconAlertCircle size={16} color={C.orange} />
      <Text size="sm" style={{ color: C.orange, fontFamily: "'Roboto', sans-serif", flex: 1 }}>
        Xác nhận từ chối <Text span fw={700}>{studentName}</Text>
      </Text>
      <Group gap={6}>
        <CustomButton
          size="xs"
          radius="sm"
          variant="light"
          color="gray"
          onClick={onCancel}
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
          size="xs"
          radius="sm"
          loading={loading}
          onClick={onConfirm}
          styles={{
            root: {
              background: C.orange,
              color: C.white,
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 700,
            },
          }}
        >
          Xác nhận từ chối
        </CustomButton>
      </Group>
    </Box>
  );
}
