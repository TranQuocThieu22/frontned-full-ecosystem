"use client";

import { Button, Flex, Modal, Stack, Text } from "@mantine/core";

import { useScoreFrameworkVersionStore } from "@/shared/stores/scoreFrameworkVersionStore";
import { UseScoreFrameworkVersion } from "@/features/admin/scoreFrameworkVersion/shared/useScoreFrameworkVersion";



export function ArchiveModal() {
  const hookController = UseScoreFrameworkVersion();
  const onClose = hookController.closeArchiveModal;
  const onConfirm = hookController.confirmArchive;
  const opened = useScoreFrameworkVersionStore((s) => s.archiveModalOpened);
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={700} size="sm" style={{ color: "#1A2744", fontFamily: "'Roboto', sans-serif" }}>
          Xác nhận lưu trữ version
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
          Version này sẽ chuyển sang trạng thái <b>Lưu trữ</b> và không dùng cho năm học mới.
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
            color="gray"
            size="sm"
            radius="md"
            onClick={onConfirm}
            styles={{ root: { fontFamily: "'Roboto', sans-serif", fontWeight: 700 } }}
          >
            Lưu trữ
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
}
