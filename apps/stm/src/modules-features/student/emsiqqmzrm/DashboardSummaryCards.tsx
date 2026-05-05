import { Card, SimpleGrid, Text, ThemeIcon, Title, useMantineTheme } from '@mantine/core';
import { IconCalendar, IconCalendarEvent, IconListLetters } from '@tabler/icons-react';
import { IUserDashboardData } from './interfaces/StudentDashBoard';


export default function CourseExamStatistics({ studentData }: { studentData: IUserDashboardData }) {
    const theme = useMantineTheme();

    return (
        <SimpleGrid
            cols={3}
            spacing="lg"
        >
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ backgroundColor: theme.colors.blue[0] }}
            >
                <ThemeIcon
                    size="xl"
                    radius="md"
                    variant="light"
                    color="blue"
                    style={{ marginBottom: theme.spacing.md }}
                >
                    <IconListLetters size={24} />
                </ThemeIcon>
                <Title order={4}>Số lượng khóa học</Title>
                <Text size="xl" fw={700} c="blue">
                    {studentData.course?.totalCount ?? 0}
                </Text>
            </Card>

            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ backgroundColor: theme.colors.violet[0] }}
            >
                <ThemeIcon
                    size="xl"
                    radius="md"
                    variant="light"
                    color="violet"
                    style={{ marginBottom: theme.spacing.md }}
                >
                    <IconCalendarEvent size={24} />
                </ThemeIcon>
                <Title order={4}>Số lượng khóa thi</Title>
                <Text size="xl" fw={700} c="violet">
                    {studentData.exam?.totalCount ?? 0}
                </Text>
            </Card>

            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ backgroundColor: theme.colors.green[0] }}
            >
                <ThemeIcon
                    size="xl"
                    radius="md"
                    variant="light"
                    color="green"
                    style={{ marginBottom: theme.spacing.md }}
                >
                    <IconCalendar size={24} />
                </ThemeIcon>
                <Title order={4}>Số lượng chứng chỉ nhận được</Title>
                <Text size="xl" fw={700} c="green">
                    {studentData.certificate?.totalCount ?? 0}
                </Text>
            </Card>
        </SimpleGrid>
    );
}
