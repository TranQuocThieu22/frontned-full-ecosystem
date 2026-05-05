"use client";

import { ActionIcon, Modal, Button, Text, Group, Stack, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash, IconInfoCircle, IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IEvidenceType } from "@/shared/interfaces/evidence/IEvidenceType";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";

export default function EvidenceTypeDeleteList({
  selectedItems,
  onSubmit,
}: {
  selectedItems: IEvidenceType[];
  onSubmit: () => Promise<any>;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onSubmit();
      close();
      await queryClient.invalidateQueries();
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const count = selectedItems.length;

  return (
    <>
      <CustomButton
        actionType="delete"
        onClick={open}
        disabled={count === 0}
      >
        Xóa ({count})
      </CustomButton>

      <Modal
        opened={opened}
        onClose={close}
        title={<Text fw={600} size="xl">Xác nhận xóa</Text>}
        centered
        size="lg"
      >
        <Stack gap="md">
          <Text fw={600}>
            Bạn đang thực hiện{" "}
            <Text component="span" c="red" fw={600}>
              Xóa {selectedItems.map((i) => i.code).join(", ")}
            </Text>{" "}
            loại minh chứng
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
                <Text c="red.6" fw={600} mb={"xs"}>
                  Cảnh báo:
                </Text>
                <Text c="red.6">
                  Sau khi xác nhận, {count} dữ liệu sẽ bị xóa và không thể hoàn tác!
                </Text>
                <Text c="red.6">
                  Vui lòng kiểm tra kỹ trước khi thực hiện xác nhận
                </Text>
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
            <Button color="red" onClick={handleDelete} loading={isDeleting}>
              Xác nhận Xóa
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
