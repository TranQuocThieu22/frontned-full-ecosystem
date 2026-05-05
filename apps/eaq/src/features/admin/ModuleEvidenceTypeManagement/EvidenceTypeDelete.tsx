"use client";

import { service_EAQEvidenceType } from "@/shared/APIs/service_EAQEvidenceType";
import { ActionIcon, Modal, Button, Text, Group, Stack, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconTrash, IconInfoCircle, IconArrowLeft } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function EvidenceTypeDelete({
  id,
  code,
  resetRowSelection,
}: {
  id: number;
  code: string;
  resetRowSelection: Function;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await service_EAQEvidenceType.delete(id);
      notifications.show({
        color: "green",
        message: "Xóa thành công",
      });
      resetRowSelection();
      close();
      await queryClient.invalidateQueries();
    } catch (error) {
      notifications.show({
        color: "red",
        message: "Có lỗi xảy ra khi xóa",
      });
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <ActionIcon variant="light" color="red" onClick={open} title="Xóa">
        <IconTrash size={18} />
      </ActionIcon>

      <Modal
        opened={opened}
        onClose={close}
        title={<Text fw={600} size="xl">Xác nhận xóa</Text>}
        centered
        size="lg"
      >
        <Stack gap="md">
          <Text fw={600}>
            Bạn đang thực hiện <Text component="span" c="red" fw={600}>Xóa {code}</Text> loại minh chứng
          </Text>

          <Box
            style={{
              border: "1px solid var(--mantine-color-red-6)",
              borderRadius: "var(--mantine-radius-md)",
              padding: "var(--mantine-spacing-md)",
              backgroundColor: "var(--mantine-color-red-0)",
            }}
          >
            <Group gap="xs" style={{ alignItems: "flex-start" }}>
              <IconInfoCircle
                size={20}
                color="var(--mantine-color-red-6)"
                style={{ marginTop: 2 }}
              />
              <Box>
                <Text c="red.6" fw={600} mb={'xs'}>Cảnh báo:</Text>
                <Text c="red.6">Sau khi xác nhận, dữ liệu sẽ bị xóa và không thể hoàn tác!</Text>
                <Text c="red.6">Vui lòng kiểm tra kỹ trước khi thực hiện xác nhận</Text>
              </Box>
            </Group>
          </Box>

          <Text c="dimmed">Bạn có chắc muốn tiếp tục?</Text>

          <Group justify="flex-end" mt="md">
            <Button
              variant="default"
              onClick={close}
              disabled={isDeleting}
              leftSection={<IconArrowLeft size={16} />}
              bg="gray.1"
            >
              Quay lại
            </Button>
            <Button
              color="red"
              onClick={handleDelete}
              loading={isDeleting}
            >
              Xác nhận Xóa
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
