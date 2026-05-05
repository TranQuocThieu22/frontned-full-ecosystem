import type { ModalProps } from '@mantine/core';
import { Button, Group, Modal, Stack, Text } from "@mantine/core";

interface DeletePromptProps {
    onConfirm: () => void;
    target?: {
        label?: string | null;
        code?: string | null;
        name?: string | null;
    };
    modalProps: ModalProps;
}

export default function DeletePrompt({
    onConfirm,
    target,
    modalProps
}: DeletePromptProps) {
    return (
        <>
            <Modal
                size={500}
                title={<Text fw={700}>Xóa dữ liệu{target && target?.label && ` ${target.label}`}</Text>}
                {...modalProps}
            >
                <Stack>
                    <Text>Bạn đang thực hiện xóa dữ liệu{target && ((target.code && target.code !== null) ? <> mã <strong>{target.code}</strong></> : (target.name && target.name !== null) && <> tên <strong>{target.name}</strong></>)}. Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?</Text>
                    <Group justify="flex-end" mt="md">
                        <Button w={100}
                            variant="default"
                            color='#f0f0f3'
                            c={'#808080'}
                            style={{ border: 'none' }}
                            onClick={modalProps.onClose}>
                            QUAY LẠI
                        </Button>
                        <Button
                            w={100}
                            variant='filled'
                            color="#e5484d"
                            onClick={onConfirm}>
                            XÓA
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    )
}