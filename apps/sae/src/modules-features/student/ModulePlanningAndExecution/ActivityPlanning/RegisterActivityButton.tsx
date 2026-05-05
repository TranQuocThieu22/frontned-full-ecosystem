import { service_account } from '@/api/services/service_account';
import { service_studentsActivityRegistration } from '@/api/services/service_studentsActivityRegistration';
import { Event } from '@/interfaces/event';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import {
    Button,
    Group,
    Text,
    Stack,
    Paper,
    Divider,
    Badge,
    Box
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { IconCheck, IconX, IconAlertCircle } from '@tabler/icons-react';

export default function RegisterActivityButton({ data }: { data: Event }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const disclosure = useDisclosure(false);
    const queryClient = useQueryClient();

    const currentUserQuery = useCustomReactQuery({
        queryKey: ["Q_StudentInfo"],
        axiosFn: () => service_account.getCurrentUser()
    });

    const currentUser = useMemo(() => {
        return currentUserQuery.data || {};
    }, [currentUserQuery.data]);

    const handleSubmit = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            await service_studentsActivityRegistration.create({
                studentId: currentUser.id,
                eventId: data.id,
                name: data.name,
                code: data.code,
                isEnabled: false,
                point: data.maxPoint,
            });

            disclosure[1].close();

            queryClient.invalidateQueries({
                queryKey: ["Q_StudentsActivityRegistration_GetByStudent"],
            });

            notifications.show({
                title: "Thành công",
                message: "Đăng ký hoạt động thành công",
                color: "green",
                icon: <IconCheck size={18} />,
            });
        } catch (err: any) {
            console.error('Registration error:', err);

            notifications.show({
                title: "Lỗi đăng ký",
                message: err.response?.data?.exception?.message || "Đã xảy ra lỗi. Vui lòng thử lại.",
                color: "red",
                icon: <IconX size={18} />,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <CustomButtonModal
            buttonProps={{
                disabled: !data.isRegistration,
                children: "Đăng ký",
                variant: "filled",
                color: "blue"
            }}
            modalProps={{
                title: "Xác nhận đăng ký hoạt động",
                size: "md",
                centered: true
            }}
            disclosure={disclosure}
        >
            <Stack gap="md">
                <Paper p="md" withBorder bg="gray.0">
                    <Stack gap="xs">
                        <Group justify="space-between" wrap="nowrap">
                            <Text size="sm" c="dimmed" fw={500}>
                                Mã hoạt động
                            </Text>
                            <Badge variant="light" color="blue" size="lg">
                                {data.code}
                            </Badge>
                        </Group>

                        <Divider />

                        <Box>
                            <Text size="sm" c="dimmed" mb={4}>
                                Tên hoạt động
                            </Text>
                            <Text size="sm" fw={500}>
                                {data.standardName}
                            </Text>
                        </Box>

                        <Divider />

                        <Group justify="space-between" wrap="nowrap">
                            <Text size="sm" c="dimmed" fw={500}>
                                Điểm tối đa
                            </Text>
                            <Badge variant="filled" color="green" size="lg">
                                {data.maxPoint} điểm
                            </Badge>
                        </Group>
                    </Stack>
                </Paper>

                <Group gap="xs" c="blue.6">
                    <IconAlertCircle size={16} />
                    <Text size="xs">
                        Vui lòng xác nhận thông tin trước khi đăng ký
                    </Text>
                </Group>

                <Group justify="flex-end" mt="md">
                    <Button
                        variant="default"
                        onClick={disclosure[1].close}
                        disabled={isSubmitting}
                    >
                        Hủy
                    </Button>
                    <Button
                        color="green"
                        onClick={handleSubmit}
                        loading={isSubmitting}
                        leftSection={<IconCheck size={16} />}
                    >
                        Xác nhận đăng ký
                    </Button>
                </Group>
            </Stack>
        </CustomButtonModal>
    );
}
