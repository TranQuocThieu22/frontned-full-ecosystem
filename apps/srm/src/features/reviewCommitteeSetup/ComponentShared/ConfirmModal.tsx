'use client';

import { Button, Group, Modal, Text } from "@mantine/core";
import { UseDisclosureReturnValue } from "@mantine/hooks";
import { IconAlertCircleFilled, IconBan, IconPencil } from "@tabler/icons-react";

interface Props {
    disclosure: UseDisclosureReturnValue;
    disclosureParentModal: UseDisclosureReturnValue;
    handleWhenDontSave?: Function
}

export default function ConfirmModal({ disclosure, disclosureParentModal, handleWhenDontSave }: Props) {
    return (
        <>
            <Modal
                title="Xác nhận"
                opened={disclosure[0]}
                onClose={disclosure[1].close}
                size="md"
                centered
                padding="md"
                styles={{
                    header: { paddingBottom: 0, paddingTop: 0 },
                }}
            >
                <Group align="center" p="md" pt="5px" gap="xs">
                    <IconAlertCircleFilled
                        style={{ width: "2.5rem", height: "2.5rem" }}
                        color="var(--mantine-color-yellow-6)"
                    />
                    <Text fz="md" fw={500}>
                        Bạn chưa lưu phiên chỉnh sửa này!
                    </Text>
                </Group>

                <Group grow mt="xs" gap="sm">
                    <Button
                        color="red"
                        variant="filled"
                        onClick={() => {
                            disclosure[1].close();
                            disclosureParentModal[1].close();
                            handleWhenDontSave && handleWhenDontSave();
                        }}
                        leftSection={<IconBan />}
                    >
                        Không lưu
                    </Button>
                    <Button
                        color="blue"
                        variant="light"
                        onClick={disclosure[1].close}
                        leftSection={<IconPencil />}
                    >
                        Tiếp tục chỉnh sửa
                    </Button>
                </Group>
            </Modal>

        </>
    );
}