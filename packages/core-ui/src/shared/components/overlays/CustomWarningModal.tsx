import { Flex, Modal, Paper, Stack, Text } from "@mantine/core";
import { UseDisclosureReturnValue } from "@mantine/hooks";
import { ReactNode } from "react";
import { CustomButton } from "../button/CustomButton/CustomButton";
import { CustomFlexEnd } from "../layout/CustomFlexEnd";

interface CustomWarningModalProps {
    children?: ReactNode;
    onConfirm: () => void;
    disclosure: UseDisclosureReturnValue
}

export default function CustomWarningModal({
    children,
    onConfirm,
    disclosure
}: CustomWarningModalProps) {

    return (
        <Modal
            opened={disclosure[0]}
            onClose={disclosure[1].close}
            title={"⚠️ Cảnh báo"}
        >
            <Paper p={'md'} mt={'md'}>
                <Text fw={600} size="md">
                    Bạn có chắc chắn muốn tiếp tục?
                </Text>
                <Flex gap="lg" align="flex-start">
                    <Stack gap={6}>
                        {children}
                    </Stack>
                </Flex>

                {/* Actions */}
                <CustomFlexEnd gap="sm">
                    <CustomButton
                        actionType="modalConfirm"
                        onClick={onConfirm}
                    />
                    <CustomButton
                        variant="outline"
                        actionType="cancel"
                        onClick={() => {
                            disclosure[1].close()
                        }}
                    />
                </CustomFlexEnd>
            </Paper>
        </Modal>
    );
}
