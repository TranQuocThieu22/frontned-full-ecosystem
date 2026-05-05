'use client';
import { Button, Group, Stack, Text } from "@mantine/core";

interface SyncConfirmPromptProps {
    onClickConfirm?: () => void;
    onClickCancel?: () => void;
}

export const SyncConfirmPrompt = ({
    onClickConfirm,
    onClickCancel
}: SyncConfirmPromptProps) => {
    return (
        <>
            <Stack>

                <Group wrap="nowrap">
                    <Text><strong>Cảnh báo:</strong> Đồng bộ sẽ thay thế hoàn toàn dữ liệu môn học hiện tại của chương trình đào tạo.</Text>
                </Group>
                <Group justify="flex-end" mt="md">
                    <Button w={140}
                        variant="default"
                        color='#f0f0f3'
                        c={'#808080'}
                        style={{ border: 'none' }}
                        onClick={onClickCancel}>
                        HỦY THAO TÁC
                    </Button>
                    <Button
                        w={140}
                        variant='filled'
                        color="green.7"
                        onClick={onClickConfirm}>
                        THỰC HIỆN
                    </Button>
                </Group>
            </Stack>
        </>
    )
}