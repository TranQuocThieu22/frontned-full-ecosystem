'use client';

import { Button, Center, Group, Modal, Stack, Text, rem } from "@mantine/core";
import { UseDisclosureReturnValue } from "@mantine/hooks";
import { IconAlertCircleFilled } from "@tabler/icons-react";

interface Props {
    disc: UseDisclosureReturnValue;
    discParentModal: UseDisclosureReturnValue;
    handleSetValueModalUpdate?: Function;
}

export default function AlertDialog({
    disc,
    discParentModal,
    handleSetValueModalUpdate,
}: Props) {
    return (
        <Modal
            opened={disc[0]}
            onClose={disc[1].close}
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
                        Bạn chưa lưu phiên chỉnh sửa
                    </Text>
                    <Text fz="md" c="dimmed">
                        Nếu thoát, mọi thay đổi sẽ không được giữ lại.
                    </Text>
                </Stack>

                {/* Hành động */}
                <Group gap="lg" w="100%" align="center">
                    <Button
                        color="red"
                        variant="outline"
                        radius="xl"
                        size="md"
                        flex={1}
                        onClick={() => {
                            disc[1].close();
                            discParentModal[1].close();
                            handleSetValueModalUpdate && handleSetValueModalUpdate();
                        }}
                    >
                        Không lưu
                    </Button>
                    <Button
                        color="blue"
                        variant="filled"
                        radius="xl"
                        size="md"
                        flex={1}
                        onClick={disc[1].close}
                    >
                        Tiếp tục chỉnh sửa
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
}
