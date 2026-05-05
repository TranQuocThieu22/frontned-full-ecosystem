"use client"
import baseAxios from '@/api/config/baseAxios';
import { ActionIcon, Button, Flex, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CertificateDecisionDeleteActionIcon({ certficateDecisionId, certficateDecisionCode }: { certficateDecisionId?: number, certficateDecisionCode?: string | null }) {
    const queryClient = useQueryClient();
    const discDeleteModal = useDisclosure(false);
    const mutateCourse = useMutation({
        mutationFn: async () => {
            let body = {
                id: certficateDecisionId,
                isEnabled: false
            }
            let response = await baseAxios.post('/CertificateDecision/Delete', body)
            if (response.data.isSuccess === 1) {
                notifications.show({
                    title: 'Thao tác thành công',
                    message: 'Dữ liệu đã được xóa',
                    color: 'green',
                })
            }

            if (response.data.isSuccess !== 1) {
                notifications.show({
                    title: 'Thao tác thất bại',
                    message: 'Dữ liệu chưa được xóa',
                    color: 'red',
                })
            }
        },
        onSuccess: (response) => {
            //todo
            queryClient.invalidateQueries({
                queryKey: [`allCertificateDecision`]
            });
        },
        onError: () => {
            //todo
        },
    });

    const handleOnClickDeleteIcon = () => {
        discDeleteModal[1].open();
    }

    const handleDeleteCourseAPI = async () => {
        mutateCourse.mutate();
    }

    return (
        <>
            <ActionIcon
                variant="light"
                radius="sm"
                color='red'
                onClick={handleOnClickDeleteIcon}
            >
                <IconTrash />
            </ActionIcon>
            <Modal
                opened={discDeleteModal[0]}
                onClose={discDeleteModal[1].close}
                title="Xóa dữ liệu"
            >
                <Group
                    mb={20}>
                    <span>Bạn sắp xóa dữ liệu &quot;{certficateDecisionCode}&quot;. Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?</span>
                </Group>
                <Flex
                    gap="sm"
                    justify="end"
                    align="center"
                    direction="row"
                >
                    <Button
                        w={"50%"}
                        color="rgba(0, 0, 0, 0.2)"
                        c={"black"}
                        variant="outline"
                        onClick={discDeleteModal[1].close}>
                        Hủy thao tác
                    </Button>
                    <Button
                        w={"50%"}
                        color="red"
                        variant='filled'
                        onClick={handleDeleteCourseAPI}
                    >
                        Xác nhận xóa
                    </Button>
                </Flex>
            </Modal>
        </>
    )
}

