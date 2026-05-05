import { StudentList } from "@/interfaces/account";
import { Card, Stack, Group, Text, Badge, Box, Divider, Paper } from "@mantine/core";
import { IconTrophy, IconCalendarCheck } from "@tabler/icons-react";

interface ParticipationMonitoringCardInfoProps {
    student: StudentList;
    statistics: {
        totalActivities: number;
        totalPoints: number;
    };
}

export default function ParticipationMonitoringCardInfo({
    student,
    statistics
}: ParticipationMonitoringCardInfoProps) {
    return (
        <Card shadow="md" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
            <Stack gap="lg">
                {/* Header */}
                <Box>
                    <Text size="xs" tt="uppercase" fw={700} c="blue.7" mb={4}>
                        Thông tin sinh viên
                    </Text>
                    <Divider color="blue.2" />
                </Box>

                {/* Student Information */}
                <Stack gap="md">
                    <Group justify="space-between" wrap="nowrap">
                        <Box style={{ flex: 1 }}>
                            <Text size="xs" c="dimmed" mb={4}>Mã sinh viên</Text>
                            <Text fw={700} size="md">{student.code}</Text>
                        </Box>
                        <Box style={{ flex: 1 }}>
                            <Text size="xs" c="dimmed" mb={4}>Họ và tên</Text>
                            <Text fw={700} size="md">{student.fullName}</Text>
                        </Box>
                    </Group>

                    <Group justify="space-between" wrap="nowrap">
                        <Box style={{ flex: 1 }}>
                            <Text size="xs" c="dimmed" mb={4}>Khoa</Text>
                            <Text fw={600} size="sm">{student.facultyName || "Chưa xác định"}</Text>
                        </Box>
                        <Box style={{ flex: 1 }}>
                            <Text size="xs" c="dimmed" mb={4}>Lớp</Text>
                            <Text fw={600} size="sm">{student.className || "Chưa xác định"}</Text>
                        </Box>
                    </Group>
                </Stack>

                <Divider label={
                    <Text size="xs" fw={600} c="dimmed">
                        THỐNG KÊ THAM GIA
                    </Text>
                } labelPosition="center" />

                {/* Statistics Section */}
                <Stack gap="sm">
                    <Paper withBorder p="md" radius="md" style={{ backgroundColor: 'var(--mantine-color-green-0)' }}>
                        <Group justify="space-between" align="center" wrap="nowrap">
                            <Group gap="xs">
                                <IconCalendarCheck size={20} color="var(--mantine-color-green-7)" />
                                <Box>
                                    <Text size="xs" c="dimmed">Hoạt động đã tham gia</Text>
                                    <Text size="xl" fw={700} c="green.7">
                                        {statistics.totalActivities}
                                    </Text>
                                </Box>
                            </Group>
                            <Badge size="lg" variant="filled" color="green" radius="md">
                                Hoạt động
                            </Badge>
                        </Group>
                    </Paper>

                    <Paper withBorder p="md" radius="md" style={{ backgroundColor: 'var(--mantine-color-blue-0)' }}>
                        <Group justify="space-between" align="center" wrap="nowrap">
                            <Group gap="xs">
                                <IconTrophy size={20} color="var(--mantine-color-blue-7)" />
                                <Box>
                                    <Text size="xs" c="dimmed">Tổng điểm tích lũy</Text>
                                    <Text size="xl" fw={700} c="blue.7">
                                        {statistics.totalPoints}
                                    </Text>
                                </Box>
                            </Group>
                            <Badge size="lg" variant="filled" color="blue" radius="md">
                                Điểm
                            </Badge>
                        </Group>
                    </Paper>
                </Stack>
            </Stack>
        </Card>
    );
}
