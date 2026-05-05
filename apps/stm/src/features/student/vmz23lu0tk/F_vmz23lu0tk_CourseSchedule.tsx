import { utils_date_dateToDDMMYYYString } from '@/utils/date';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Badge, Box, Button, Divider, Flex, Grid, Paper, ScrollArea, Text } from '@mantine/core';
import { DatePicker, DatePickerProps } from '@mantine/dates';
import { IconAlarm, IconChevronDown } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { utils_date_getHHmm } from 'aq-fe-framework/utils';
import { useMemo, useRef, useState } from 'react';
import TashBoard from './style/TashBoard.module.css';
;

interface I_courseDetail {
    id?: number;
    title?: string;
    startTime?: string;
    endTime?: string;
    date?: Date;
    lecturerName?: string;
    room?: string;
}

interface CourseScheduleProps {
    currentUserId: number;
}

export default function F_vmz23lu0tk_CourseSchedule({ currentUserId }: CourseScheduleProps) {
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    const [showAll, setShowAll] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const viewScheduleQuery = useQuery<I_courseDetail[]>({
        queryKey: ["F_i47273jqpi_ViewSchedule", currentUserId],
        queryFn: async () => {
            const startDate = new Date();
            startDate.setDate(1); // Đầu tháng hiện tại
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date();
            endDate.setMonth(endDate.getMonth() + 1); // Cuối tháng hiện tại
            endDate.setDate(0);
            endDate.setHours(23, 59, 59, 999);
            const res = await baseAxios.post("/CourseSection/GetSchedule", {
                studentId: Number(currentUserId),
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                pageSize: 0,
                pageNumber: 0,
            });
            // Chuyển đổi dữ liệu API để khớp với I_courseDetail
            return res.data.data.map((item: any) => ({
                id: item.id,
                title: item.subjectName,
                lecturerName: item.lecturerName?.filter(Boolean).join(', '),
                room: item.addressName,
                date: new Date(item.endDate),
                startTime: utils_date_getHHmm(new Date(item.startDate)),
                endTime: utils_date_getHHmm(new Date(item.endDate)),
            }));
        },
    });

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

    const getDayProps: DatePickerProps['getDayProps'] = (date: string) => {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return {};
        }

        const isToday =
            parsedDate.getDate() === today.getDate() &&
            parsedDate.getMonth() === today.getMonth() &&
            parsedDate.getFullYear() === today.getFullYear();
        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);

        const isHighlighted =
            viewScheduleQuery.data?.some((item) => {
                if (!item.date) return false;
                const courseDate = new Date(item.date);
                courseDate.setHours(0, 0, 0, 0);
                return (
                    normalizedDate.getDate() === courseDate.getDate() &&
                    normalizedDate.getMonth() === courseDate.getMonth() &&
                    normalizedDate.getFullYear() === courseDate.getFullYear()
                );
            }) || false;

        if (isToday) {
            return {
                style: {
                    backgroundColor: 'var(--mantine-color-blue-3)',
                    color: 'var(--mantine-color-dark)',
                    borderRadius: '50%',
                },
            };
        }

        if (isHighlighted) {
            return {
                style: {
                    backgroundColor: 'var(--mantine-color-green-5)',
                    color: 'var(--mantine-color-white)',
                    borderRadius: '50%',
                },
            };
        }

        return {};
    };

    const filteredCourses = useMemo(() => {
        if (!viewScheduleQuery.data) return [];

        if (!value[0]) return viewScheduleQuery.data;

        const startDate = new Date(value[0]);
        startDate.setHours(0, 0, 0, 0);

        const endDate = value[1] ? new Date(value[1]) : new Date(startDate);
        endDate.setHours(0, 0, 0, 0);

        return viewScheduleQuery.data.filter((item) => {
            if (!item.date) return false;
            const courseDate = new Date(item.date);
            courseDate.setHours(0, 0, 0, 0);
            return courseDate >= startDate && courseDate <= endDate;
        });
    }, [viewScheduleQuery.data, value]);

    const handleShowAll = () => {
        setShowAll(true);
        setValue([null, null]);
    };

    if (viewScheduleQuery.isLoading) {
        return 'Đang tải dữ liệu';
    }
    if (viewScheduleQuery.isError) {
        return 'Lỗi khi tải dữ liệu!';
    }

    const displayCourses = showAll ? viewScheduleQuery.data || [] : filteredCourses;

    return (
        <Paper pl={20} pr={10} py={20}>
            <Flex justify="space-between" align="center">
                <Text tt="uppercase" size="md" fw={500}>
                    Lịch hoạt động
                </Text>
                <Button variant="light" size="compact-xs" onClick={handleShowAll}>
                    Xem tất cả
                </Button>
            </Flex>
            <Divider variant="dashed" w="100%" />
            <Grid>
                <Grid.Col span={{ base: 12, xl: 5 }}>
                    <Flex justify="center" align="center">
                        <DatePicker
                            value={value}
                            onChange={(newValue) => {
                                const convertedValue: [Date | null, Date | null] = [
                                    newValue[0] ? new Date(newValue[0]) : null,
                                    newValue[1] ? new Date(newValue[1]) : null,
                                ];
                                if (
                                    (convertedValue[0] && isNaN(convertedValue[0].getTime())) ||
                                    (convertedValue[1] && isNaN(convertedValue[1].getTime()))
                                ) {
                                    return;
                                }
                                setValue(convertedValue);
                                setShowAll(false);
                            }}
                            type="range"
                            allowSingleDateInRange
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                            }}
                            defaultDate={new Date()}
                            getDayProps={getDayProps}
                        />
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12, xl: 7 }}>
                    <ScrollArea.Autosize
                        viewportRef={scrollAreaRef}
                        onScrollPositionChange={handleScroll}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{ position: 'relative' }}
                    >
                        <Flex
                            direction="column"
                            align="start"
                            gap={15}
                            h="40vh"
                            style={{ borderRadius: '20px' }}
                            mr={15}
                        >
                            {displayCourses.length > 0 ? (
                                displayCourses.map((item) => (
                                    <Box key={item.id} className={TashBoard.taskCard}>
                                        <Flex align="center">
                                            <Flex direction="column" align="start" gap={5}>
                                                <Text fz={16} fw={500}>
                                                    {item.title || "Guest"}
                                                </Text>
                                                <Text lh={1.2} fz={12} c="dimmed">
                                                    Giáo viên: {item.lecturerName || "Guest"}
                                                </Text>
                                                <Text lh={1.2} fz={12} c="dimmed">
                                                    Địa điểm: {item.room || "Guest"}
                                                </Text>
                                            </Flex>
                                            <Box className={TashBoard.badge} bg="green">
                                                {item.date
                                                    ? utils_date_dateToDDMMYYYString(new Date(item.date))
                                                    : 'N/A'}
                                            </Box>
                                        </Flex>
                                        <Badge
                                            className={TashBoard.log}
                                            h={30}
                                            leftSection={<IconAlarm size={18} strokeWidth={1.2} />}
                                        >
                                            <Text tt="capitalize" fz={12} fw={400}>
                                                {item.startTime}-{item.endTime}
                                            </Text>
                                        </Badge>
                                    </Box>
                                ))
                            ) : (
                                <Text c="dimmed" fz={14} ta="center" w="100%">
                                    Không có khóa học nào trong khoảng ngày đã chọn.
                                </Text>
                            )}
                        </Flex>
                        {isHovered && !isAtBottom && displayCourses.length > 2 && (
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
                </Grid.Col>
            </Grid>
        </Paper>
    );
}
