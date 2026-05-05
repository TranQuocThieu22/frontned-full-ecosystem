import {Button, Group, Modal, Stack, Text} from "@mantine/core";
import {IconAlertCircle} from "@tabler/icons-react";

interface ErrorModalProps {
    opened: boolean;
    onClose: () => void;
    messages: string[];
}

export function ErrorModalImportMessage({ opened, onClose, messages }: ErrorModalProps) {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={
                <Group gap="xs">
                    <IconAlertCircle size={22} color="blue" />
                    <Text fw={500}>
                        Thông báo import
                    </Text>
                </Group>
            }
            centered
            size="lg"
            radius="md"
            zIndex={300}
            closeOnClickOutside={false}
            overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
            <Stack gap="sm">
                {messages.map((msg, idx) => (
                    <Text
                        key={idx}
                        size="md"
                        c="red"
                        style={{
                            padding: "8px 12px",
                            backgroundColor: "#fff5f5",
                            borderRadius: "8px",
                            border: "1px solid #ffc9c9",
                        }}
                    >
                        {msg}
                    </Text>
                ))}
            </Stack>

            <Button
                mt="lg"
                fullWidth
                onClick={onClose}
                color="red"
                variant="filled"
                radius="md"
            >
                Đóng
            </Button>
        </Modal>
    );
}
