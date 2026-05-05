import { utils_date_dateToDDMMYYYString } from '@/utils/date';
import { Badge, Box, Card, Divider, Flex, Group, ScrollArea, Text } from '@mantine/core';
import { IconCalendarEvent, IconChevronDown, IconClock, IconMapPin } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { IUserDashboardData } from './interfaces/StudentDashBoard';

export default function F_vmz23lu0tk_CourseOpen({ studentData }: { studentData: IUserDashboardData }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const upcomingCourses = studentData.course?.courses?.filter((course) => {
        return course.status === 2;
    }) || [];

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
        <Box style={{ height: '44vh', position: 'relative' }}>
            <Flex justify="space-between" align="center" mr={10}>
                <Text tt="uppercase" size="sm" fw={600}>
                    Khóa học sắp khai giảng
                </Text>
                <Badge color="blue" size="lg" radius="sm">
                    {upcomingCourses.length}
                </Badge>
            </Flex>
            <Divider variant="dashed" w="100%" mt="sm" />
            <ScrollArea.Autosize
                viewportRef={scrollAreaRef}
                onScrollPositionChange={handleScroll}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ height: 'calc(44vh - 60px)', position: 'relative' }}
            >
                <Flex direction="column" w="98%" gap={15} style={{ borderRadius: '20px' }}>

                    {upcomingCourses && upcomingCourses.length > 0 ? (
                        upcomingCourses.map((course, index) => (
                            <Card
                                key={index}
                                withBorder
                                shadow="sm"
                                radius="md"
                                p="md"
                                style={{
                                    backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-7))',
                                }}
                            >
                                <Text size="md" fw={600} c="blue">
                                    {course.courseName}
                                </Text>
                                <Group mt="xs" align="center" gap={8}>
                                    <Text size="sm" c="dimmed">
                                        <IconCalendarEvent size={16} color="var(--mantine-color-gray-6)" /> giảng ngày:{' '}
                                        {course.studyDate ? utils_date_dateToDDMMYYYString(new Date(course.studyDate)) : 'N/A'}
                                    </Text>
                                </Group>
                                <Group mt="xs" align="center" gap={8}>
                                    <Text size="sm" c="dimmed">
                                        <IconClock size={16} color="var(--mantine-color-gray-6)" /> Thời gian học:{' '}
                                        {course.timeCluster || 'Chưa xác định'}
                                    </Text>
                                </Group>
                                <Group mt="xs" align="center" gap={8}>
                                    <Text size="sm" c="dimmed">
                                        <IconMapPin size={16} color="var(--mantine-color-gray-6)" /> Học tại:{' '}
                                        {course.branchName || 'Chưa xác định'}
                                    </Text>
                                </Group>
                            </Card>
                        ))
                    ) : (
                        <Text c="dimmed" size="sm" ta="center" pb={8}>
                            Chưa có khóa học nào sắp tới.
                        </Text>
                    )}
                </Flex>
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
        </Box>
    );
}
