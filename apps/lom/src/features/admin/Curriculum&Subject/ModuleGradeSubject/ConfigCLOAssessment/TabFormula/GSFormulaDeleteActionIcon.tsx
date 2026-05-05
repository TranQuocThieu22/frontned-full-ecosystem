"use client"
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { ActionIcon, Button, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function GSFormulaDeleteActionIconModal({ GSFormulaID, GSFormulaCode, gradeSubjectId }: { GSFormulaID?: number, GSFormulaCode?: string | null, gradeSubjectId?: number }) {
    const queryClient = useQueryClient();
    const discDeleteModal = useDisclosure(false);
    const mutateGSFormula = useMutation({
        mutationFn: async () => {
            let body = {
                id: GSFormulaID,
                isEnabled: false
            }
            let response = await baseAxios.post('/COESubjectFormula/Delete', body)
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
                queryKey: [`GSFormulaTableByGradeSubjectId${gradeSubjectId}`]
            });
        },
        onError: () => {
            //todo
        },
    });

    const handleOnClickDeleteIcon = () => {
        discDeleteModal[1].open();
    }

    const handleDeleteGSFormulaAPI = async () => {
        mutateGSFormula.mutate();
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
                size={500}
                opened={discDeleteModal[0]}
                onClose={discDeleteModal[1].close}
                title={
                    <Text fw={700}>
                        Xóa hình thức đánh giá
                    </Text>
                }
            >
                <Stack>
                    <span>Bạn sắp xóa dữ liệu. Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?</span>
                    <Group justify="flex-end" mt="md">
                        <Button
                            w={100}
                            variant="white"
                            color="grey"
                            onClick={discDeleteModal[1].close}>
                            QUAY LẠI
                        </Button>
                        <Button
                            w={100}
                            color="red"
                            variant='filled'
                            onClick={handleDeleteGSFormulaAPI}
                        >
                            XÓA
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    )
}

