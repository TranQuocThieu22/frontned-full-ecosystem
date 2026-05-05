import { Badge, Box, Card, Divider, Flex, Group, RingProgress, ScrollArea, Text } from '@mantine/core';
import { IconBook, IconChevronDown } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { IUserDashboardData } from './interfaces/StudentDashBoard';

export default function F_vmz23lu0tk_CourseList({ studentData }: { studentData: IUserDashboardData }) {
    const upcomingCourses = studentData.course?.courses?.filter((course) => {
        return course.status === 4;
    }) || [];

    const [isHovered, setIsHovered] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const handleScroll = (position: { x: number; y: number }) => {
        if (scrollAreaRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
            const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
            setIsAtBottom(atBottom);
        }
    };

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    return (
        <Card style={{ height: '39vh', position: 'relative' }}>
            <Flex justify="space-between" align="center">
                <Text tt="uppercase" size="md" fw={600}>
                    Khóa học đang học
                </Text>
                <Badge color="blue" size="lg" radius="sm">
                    <Text fz={16} fw={500}>
                        {upcomingCourses.length}
                    </Text>
                </Badge>
            </Flex>

            <Divider variant="dashed" w="100%" />
            <ScrollArea.Autosize
                viewportRef={scrollAreaRef}
                onScrollPositionChange={handleScroll}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ position: 'relative' }}
            >
                {upcomingCourses.length === 0 && (
                    <Text c="dimmed" fz={14} ta="center" w="100%">
                        Hiện tại chưa có khóa học
                    </Text>
                )}
                {upcomingCourses.length > 0 && (
                    <Flex direction="column" gap={15} w="98%" style={{ borderRadius: '20px' }}>
                        {upcomingCourses.map((item) => {
                            const [attended, total] = (item.attendance || '0/0').split('/').map(Number);
                            const progressValue = total ? Math.floor(((attended ?? 0) / total) * 100) : 0;
                            return (
                                <Card
                                    key={item.courseName}
                                    p="md"
                                    withBorder
                                    style={{
                                        borderRadius: '8px',
                                        backgroundColor:
                                            'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-7))',
                                    }}
                                >
                                    <Group wrap="nowrap" align="center" justify="space-between">
                                        <IconBook
                                            style={{ width: '40px', height: '40px' }}
                                            strokeWidth={1.5}
                                            color="var(--mantine-color-blue-6)"
                                        />
                                        <Box style={{ flex: 1, minWidth: 0 }}>
                                            <Text
                                                size="sm"
                                                fw={500}
                                                style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    maxWidth: '100%',
                                                }}
                                            >
                                                {item.courseName}
                                            </Text>
                                            <Text size="xs" c="dimmed">
                                                {item.branchName}
                                            </Text>
                                        </Box>
                                        <Box style={{ flex: 1, minWidth: 0 }}>
                                            <Text size="sm" fw={500}>
                                                Nội dung
                                            </Text>
                                            <Text size="xs" c="dimmed">
                                                <IconBook style={{ width: '20px', height: '20px', marginBottom: '2px' }} />{' '}
                                                {item.attendance} tiết
                                            </Text>
                                        </Box>
                                        <RingProgress
                                            size={60}
                                            thickness={6}
                                            sections={[{ value: progressValue, color: 'green' }]}
                                            label={
                                                <Text size="xs" ta="center" c="green" fw={500}>
                                                    {progressValue}%
                                                </Text>
                                            }
                                        />
                                    </Group>
                                </Card>
                            );
                        })}
                    </Flex>
                )}
                {isHovered && !isAtBottom && upcomingCourses.length > 2 && (
                    <Box
                        onClick={scrollToBottom}
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            opacity: isHovered ? 1 : 0,
                            transition: 'opacity 0.2s ease-in-out',
                            backgroundColor: 'var(--mantine-color-gray-0)',
                            borderRadius: '50%',
                            padding: 6,
                            boxShadow: 'var(--mantine-shadow-sm)',
                            cursor: 'pointer',
                        }}
                    >
                        <IconChevronDown
                            size={24}
                            strokeWidth={2}
                            color="var(--mantine-color-blue-6)"
                            style={{ display: 'block' }}
                        />
                    </Box>
                )}
            </ScrollArea.Autosize>
        </Card>
    );
}
