import { ActionIcon, Box, Flex, Modal, ModalProps, Stack, Text } from "@mantine/core";
import { UseDisclosureReturnValue } from "@mantine/hooks";
import { IconMaximize, IconMinimize, IconX, ReactNode } from "@tabler/icons-react";
import { useState } from "react";
import { SafeOmitType } from "@aq-fe/core-ui/shared/types/safeOmitType";

export interface CustomModalProps extends SafeOmitType<ModalProps, "opened" | "onClose" | "title"> {
    disclosure: UseDisclosureReturnValue
    title?: ReactNode
    description?: ReactNode | string
    children?: ReactNode
}

export default function CustomModal({
    disclosure,
    title,
    description,
    children,
    ...rest
}: CustomModalProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    return (
        <Modal
            fullScreen={isFullscreen}
            radius={isFullscreen ? 0 : "md"}
            withCloseButton={false}
            opened={disclosure[0]}
            onClose={disclosure[1].close}
            styles={{ body: { padding: 0 } }}
            {...rest}
        >
            <Box
                py="sm"
                px="md"
                style={{ position: "sticky", top: 0, zIndex: 10, background: "var(--mantine-color-body)" }}
            >
                <Flex justify="space-between" align="center">
                    <Stack gap={2}>
                        <Text fw="bold">{title}</Text>
                        {typeof description === "string" ? (
                            <Text size="sm" c="dimmed">{description}</Text>
                        ) : (
                            description
                        )}
                    </Stack>
                    <Flex gap={5}>
                        <ActionIcon
                            variant="subtle"
                            radius="md"
                            color="gray"
                            onClick={() => setIsFullscreen((p) => !p)}
                        >
                            {isFullscreen ? <IconMinimize stroke={3} /> : <IconMaximize stroke={3} />}
                        </ActionIcon>
                        <ActionIcon variant="subtle" radius="md" color="gray" onClick={disclosure[1].close}>
                            <IconX stroke={3} />
                        </ActionIcon>
                    </Flex>
                </Flex>
            </Box>
            <Box px="md" pb="md" mt={5}>
                {children}
            </Box>
        </Modal>
    )
}
