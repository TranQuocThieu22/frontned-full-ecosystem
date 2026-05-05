"use client";

import { Box, Button, Flex, Modal, Stack, Text } from "@mantine/core";

interface DeleteConfirmModalProps {
  opened: boolean;
  hasChildren: boolean;
  childCount: number;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteConfirmModal({
  opened,
  hasChildren,
  childCount,
  onConfirm,
  onClose,
}: DeleteConfirmModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={700} size="sm" style={{ color: "#1A2744", fontFamily: "'Roboto', sans-serif" }}>
          Xác nhận xóa tiêu chí
        </Text>
      }
      radius="lg"
      padding="lg"
      centered
      size="sm"
      styles={{ header: { borderBottom: "1px solid #E8E2D9", marginBottom: 16 } }}
    >
      <Stack gap="md">
        <Box
          style={{
            background: "#FEF0EC",
            border: "1px solid #D4623B",
            borderRadius: 8,
            padding: "10px 14px",
          }}
        >
          <Text
            size="xs"
            style={{ color: "#D4623B", fontFamily: "'Roboto', sans-serif", lineHeight: 1.6 }}
          >
            {hasChildren
              ? `Tiêu chí này có ${childCount} tiêu chí con sẽ bị xóa theo.`
              : "Hành động này không thể hoàn tác."}
          </Text>
        </Box>
        <Text
          size="sm"
          style={{ color: "#3A3834", fontFamily: "'Roboto', sans-serif", lineHeight: 1.6 }}
        >
          Bạn có chắc chắn muốn xóa tiêu chí này không?
        </Text>
        <Flex justify="flex-end" gap="sm">
          <Button
            variant="default"
            size="sm"
            radius="md"
            onClick={onClose}
            styles={{
              root: {
                border: "1px solid #E8E2D9",
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 600,
              },
            }}
          >
            Hủy
          </Button>
          <Button
            color="red"
            size="sm"
            radius="md"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            styles={{ root: { fontFamily: "'Roboto', sans-serif", fontWeight: 700 } }}
          >
            Xóa
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
}
