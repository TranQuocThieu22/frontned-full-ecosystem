"use client"
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { ActionIcon, Button, Flex, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CertificateDecisionDelete({
    certficateDecisionId,
    certficateDecisionCode
}: {
    certficateDecisionId?: number;
    certficateDecisionCode?: string | null;
}) {
    const queryClient = useQueryClient();
    const discDeleteModal = useDisclosure(false);

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await baseAxios.post('/CertificateDecision/Delete', {
                id: certficateDecisionId,
                isEnabled: false
            })
            if (response.data.isSuccess === 1) {
                notifications.show({ title: 'Thao tác thành công', message: 'Dữ liệu đã được xóa', color: 'green' })
            } else {
                notifications.show({ title: 'Thao tác thất bại', message: 'Dữ liệu chưa được xóa', color: 'red' })
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`allCertificateDecision`] });
        },
    });

    return (
        <>
            <ActionIcon variant="light" radius="sm" color="red" onClick={discDeleteModal[1].open}>
                <IconTrash />
            </ActionIcon>
            <Modal opened={discDeleteModal[0]} onClose={discDeleteModal[1].close} title="Xóa dữ liệu">
                <Group mb={20}>
                    <span>Bạn sắp xóa dữ liệu &quot;{certficateDecisionCode}&quot;. Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?</span>
                </Group>
                <Flex gap="sm" justify="end" align="center">
                    <Button w="50%" color="rgba(0,0,0,0.2)" c="black" variant="outline" onClick={discDeleteModal[1].close}>
                        Hủy thao tác
                    </Button>
                    <Button w="50%" color="red" onClick={() => mutation.mutate()}>
                        Xác nhận xóa
                    </Button>
                </Flex>
            </Modal>
        </>
    )
}
