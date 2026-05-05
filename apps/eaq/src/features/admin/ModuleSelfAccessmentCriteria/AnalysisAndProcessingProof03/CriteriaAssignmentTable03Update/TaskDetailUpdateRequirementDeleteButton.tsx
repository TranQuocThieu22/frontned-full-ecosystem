"use client";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { Button, Center, Group, Modal, rem, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircleFilled } from "@tabler/icons-react";

interface Props {
  code: string;
  onClick: () => void;
}

export default function TaskDetailUpdateRequirementDeleteButton({
  code,
  onClick,
}: Props) {
  const modalDisc = useDisclosure();

  return (
    <>
      <Modal
        opened={modalDisc[0]}
        onClose={modalDisc[1].close}
        withCloseButton={false}
        centered
        size="lg"
        radius="lg"
        padding="lg"
        styles={{
          body: { textAlign: "center" },
        }}
      >
        <Stack align="center" gap="md">
          {/* Icon cảnh báo */}
          <Center
            style={{
              backgroundColor: "var(--mantine-color-yellow-light)",
              borderRadius: "50%",
              width: rem(80),
              height: rem(80),
            }}
          >
            <IconAlertCircleFilled
              style={{ width: rem(45), height: rem(45) }}
              color="var(--mantine-color-yellow-7)"
            />
          </Center>

          {/* Nội dung */}
          <Stack gap={4}>
            <Text fz="xl" fw={600}>
              Xác nhận xóa thay đổi của yêu cầu {code} ?
            </Text>
          </Stack>

          {/* Hành động */}
          <Group gap="lg" w="100%" align="center" mt={20}>
            <Button
              color="red"
              variant="outline"
              radius="xl"
              size="md"
              flex={1}
              onClick={() => {
                modalDisc[1].close();
              }}
            >
              Hủy
            </Button>
            <Button
              color="red"
              variant="filled"
              radius="xl"
              size="md"
              flex={1}
              onClick={() => {
                onClick();
                modalDisc[1].close();
              }}
            >
              Xóa
            </Button>
          </Group>
        </Stack>
      </Modal>

      <CustomActionIcon actionType="delete" onClick={modalDisc[1].open} />
    </>
  );
}
