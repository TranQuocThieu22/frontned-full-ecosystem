import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Card, Group, Progress, ScrollArea, Text } from "@mantine/core";

type ICourse = {
    id: number;
    name: string;
    totalSession: number;
    totalSessionsCompleted: number;
}

type F_iynoujfptk_CourseListProps = {
    readonly courses: ICourse[];
}

export default function F_iynoujfptk_CourseList({ courses }: F_iynoujfptk_CourseListProps) {
    return (
        <MyFlexColumn>
            <Text fw={600} tt="uppercase" fz={{ base: 'sm', sm: 'md', md: 'lg' }} c="dimmed">Khóa học đang dạy</Text>
            <ScrollArea>
                {courses?.map((item) => {
                    const progressValue = (item.totalSessionsCompleted && item.totalSession) ?
                        Math.floor(item.totalSessionsCompleted / item.totalSession * 100) : 0;

                    return (
                        <Card
                            key={item.id}
                            p={{ base: 'xs', sm: 'md' }}
                            my={{ base: 'xs', sm: 'md' }}
                            style={{ cursor: 'pointer' }}
                        >
                            <Group justify="space-between" wrap="nowrap">
                                <Text fz={{ base: 'sm', sm: 'md' }} truncate>{item.name}</Text>
                                <Text c="cyan" fw={700} fz={{ base: 'sm', sm: 'md' }}>{progressValue}%</Text>
                            </Group>
                            <Group mt="xs" wrap="nowrap">
                                <Progress.Root size="md" style={{ flexGrow: 1 }}>
                                    <Progress.Section
                                        value={progressValue}
                                        color="green"
                                        animated
                                    >
                                        <Progress.Label />
                                    </Progress.Section>
                                </Progress.Root>
                                <Text fz={{ base: 'sm', sm: 'md' }}>{item.totalSessionsCompleted}/{item.totalSession}</Text>
                            </Group>
                        </Card>
                    );
                })}
            </ScrollArea>
        </MyFlexColumn>
    );
} 