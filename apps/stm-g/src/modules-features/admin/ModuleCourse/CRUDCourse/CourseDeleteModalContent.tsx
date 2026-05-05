"use client"
import baseAxios from '@/api/config/baseAxios';
import { Button, Flex, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CourseDeleteModalContent({ deleteDisc, currentCourseState, courseId, courseCode }: { deleteDisc: any, currentCourseState: any, courseId?: number | null, courseCode?: string | null }) {
    const queryClient = useQueryClient();
    const mutateCourse = useMutation({
        mutationFn: async () => {
            let body = {
                id: courseId,
                isEnabled: false
            }
            let response = await baseAxios.post('/Course/Delete', body)
            if (response.data.isSuccess === 1) {
                notifications.show({
                    title: 'Thao tác thành công',
                    message: 'Dữ liệu đã được xóa',
                    color: 'green',
                })
                currentCourseState.setCourseId(null);
                deleteDisc[1].close();
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
                queryKey: [`CourseTable`]
            });
        },
        onError: () => {
            //todo
        },
    });

    const handleDeleteCourseAPI = async () => {
        mutateCourse.mutate();
    }

    return (
        <>
            <Group
                mb={20}>
                <span>Bạn sắp xóa dữ liệu &quot;{courseCode}&quot;. Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?</span>
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
                    onClick={deleteDisc[1].close}>
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
        </>
    )
}

