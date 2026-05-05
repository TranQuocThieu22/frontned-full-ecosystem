"use client";

import { Button, Flex, Modal, Stack, Text } from "@mantine/core";

import { useScoreFrameworkVersionStore } from "@/shared/stores/scoreFrameworkVersionStore";
import { UseScoreFrameworkVersion } from "@/features/admin/scoreFrameworkVersion/shared/useScoreFrameworkVersion";

export function DeleteScoreFrameworkVersion() {
  const hookController = UseScoreFrameworkVersion()
  const onClose = hookController.closeDeleteModal;
  const onConfirm = hookController.confirmDelete
  const opened = useScoreFrameworkVersionStore((s) => s.deleteModalOpened);
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={700} size="sm" style={{ color: "#1A2744", fontFamily: "'Roboto', sans-serif" }}>
          Xác nhận xóa version
        </Text>
      }
      radius="lg"
      padding="lg"
      centered
    >
      <Stack gap="md">
        <Text
          size="sm"
          style={{ color: "#3A3834", fontFamily: "'Roboto', sans-serif", lineHeight: 1.6 }}
        >
          Bạn sắp xóa dữ liệu này. Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?
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
            onClick={onConfirm}
            styles={{ root: { fontFamily: "'Roboto', sans-serif", fontWeight: 700 } }}
          >
            Xóa
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
}
