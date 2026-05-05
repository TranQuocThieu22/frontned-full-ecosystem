import { utils_date_dateToDDMMYYYString } from '@/utils/date';
import { Badge, Blockquote, Box, Card, Divider, Flex, ScrollArea, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { IUserDashboardData } from './interfaces/StudentDashBoard';

interface ExamProps {
    studentData: IUserDashboardData;
}

export default function F_vmz23lu0tk_Exam({ studentData }: ExamProps) {

    const [isHovered, setIsHovered] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    // Lọc kỳ thi có examDate > today (tương tự UpcomingExamsCard)
    const upcomingExams = studentData.exam?.exams?.filter((exam) => {
        const today = new Date();
        const examDate = exam.examDate ? new Date(exam.examDate) : new Date(0);
        return examDate > today;
    }) || [];

    // Chuyển đổi dữ liệu từ studentData sang I_exam

    const handleScroll = (position: { x: number; y: number }) => {
        if (scrollAreaRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
            // Kiểm tra xem đã cuộn đến cuối chưa (cộng thêm 1px để tránh lỗi làm tròn)
            const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
            setIsAtBottom(atBottom);
        }
    };

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth', // Cuộn mượt mà
            });
        }
    };

    return (
        <Card style={{ height: '39vh', position: 'relative' }}>
            <Flex justify="space-between" align="center">
                <Text tt="uppercase" size="md" fw={600}>
                    Khóa thi sắp tổ chức
                </Text>
                <Badge color="blue" size="lg" radius="sm">
                    <Text fz={16} fw={500}>{upcomingExams.length}</Text>
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
                <Flex direction="column" w="98%" style={{ borderRadius: '20px' }}>
                    {upcomingExams.length > 0 ? (
                        upcomingExams.map((item, index) => (
                            <Blockquote
                                key={index}
                                color="yellow"
                                m={10}
                                p={15}
                                style={{
                                    borderRadius: '8px',
                                    backgroundColor:
                                        'light-dark(var(--mantine-color-yellow-0), var(--mantine-color-dark-7))',
                                }}
                            >
                                <Text tt="uppercase" size="sm" fw={500}>
                                    {item.examName}
                                </Text>
                                <Text size="sm" c="dimmed">
                                    Ngày thi:{' '}
                                    {item.examDate
                                        ? utils_date_dateToDDMMYYYString(new Date(item.examDate))
                                        : 'N/A'}
                                </Text>
                                <Text size="sm" c="dimmed">
                                    Thi tại: {item.branchName}
                                </Text>
                            </Blockquote>
                        ))
                    ) : (
                        <Text c="dimmed" size="sm" ta="center" pb={8}>
                            Chưa có khóa thi nào sắp tới.
                        </Text>
                    )}
                </Flex>
                {isHovered && !isAtBottom && upcomingExams.length > 2 && (
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
