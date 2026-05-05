import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Card, Indicator, ScrollArea, Text } from "@mantine/core";
import { DatePicker, DatePickerProps } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import { utils_date_dateToDDMMYYYString } from 'aq-fe-framework/utils';
import dayjs from 'dayjs';
import { useState } from "react";

interface ISchedule {
    id?: number;
    name?: string;
    startDate?: string;
    endDate?: string;
    addressName?: string;
    addressCapacity?: number;
    lecturerName?: string[];
    subjectName?: string;
}

export interface ICourseDetail {
    id?: number;
    title?: string;
    startTime?: string;
    endTime?: string;
    date?: Date;
    lecturerName?: string;
    room?: string;
    total?: number;
}

export default function F_iynoujfptk_CourseDetail({
    lecturerId,
}: {
    readonly lecturerId: number;
}) {
    const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([new Date(), new Date()]);
    const querySchedule = useQuery<ISchedule[]>({
        queryKey: ["F_iynoujfptk_Read", selectedDates],
        queryFn: async () => {
            if (!selectedDates[0] || !selectedDates[1]) return [];

            const res = await baseAxios.post("/CourseSection/GetSchedule", {
                PageSize: 0,
                PageNumber: 0,
                startDate: dayjs(selectedDates[0]).format('YYYY-MM-DD'),
                endDate: dayjs(selectedDates[1]).format('YYYY-MM-DD'),
                lecturerId: lecturerId
            });
            return res.data.data;
        },
        enabled: !!selectedDates[0] && !!selectedDates[1]
    });
    const getDayProps: DatePickerProps["getDayProps"] = (date) => {
        const isLargerThanStart = dayjs(date).isAfter(selectedDates[0], 'date');
        const isSmallerThanEnd = dayjs(date).isBefore(selectedDates[1], 'date');
        const isSameStart = dayjs(date).isSame(selectedDates[0], 'date');
        const isSameEnd = dayjs(date).isSame(selectedDates[1], 'date');

        if (isLargerThanStart && isSmallerThanEnd) {
            return {
                style: {
                    backgroundColor: "var(--mantine-color-blue-1)",
                    color: "var(--mantine-color-dark-7)",
                }
            };
        } else if (isSameEnd && isSameStart) {
            return {
                style: {
                    backgroundColor: "var(--mantine-color-blue-filled)",
                    color: "var(--mantine-color-white)",
                    borderRadius: "50% 0 50% 0",
                }
            }
        } else if (isSameStart) {
            return {
                style: {
                    backgroundColor: "var(--mantine-color-blue-filled)",
                    color: "var(--mantine-color-white)",
                    borderRadius: "50% 0 0 0",
                }
            }
        } else if (isSameEnd) {
            return {
                style: {
                    backgroundColor: "var(--mantine-color-blue-filled)",
                    color: "var(--mantine-color-white)",
                    borderRadius: "0 0 50% 0",
                }
            }
        }
        return {};
    };

    const handleDateChange = (dates: [string | null, string | null]) => {
        setSelectedDates([
            dates[0] ? new Date(dates[0]) : null,
            dates[1] ? new Date(dates[1]) : null
        ]);
    };

    const filteredSchedules = querySchedule?.data?.filter((schedule) => {
        if (!schedule.startDate || !selectedDates[0]) return true;
        if (!selectedDates[1]) {
            return dayjs(schedule.startDate).isSame(selectedDates[0], 'date');
        }
        return (
            dayjs(schedule.startDate).isSameOrAfter(selectedDates[0], 'date') &&
            dayjs(schedule.startDate).isSameOrBefore(selectedDates[1], 'date')
        );
    }) ?? [];

    const renderContent = () => {
        if (querySchedule.isLoading) return <Text ta="center" c="dimmed" mt="md">Đang tải</Text>;
        if (querySchedule.isError) return <Text ta="center" c="dimmed" mt="md">Không có dữ liệu</Text>;
        if (!selectedDates[0] || !selectedDates[1]) {
            return <Text ta="center" c="dimmed" mt="md">Vui lòng chọn ngày</Text>;
        }
        if (filteredSchedules.length === 0) {
            return <Text ta="center" c="dimmed" mt="md">Không có lịch hoạt động trong khoảng thời gian này</Text>;
        }
        return filteredSchedules.map((schedule) => (
            <Card
                key={schedule.id}
                p="md"
                my="md"
            >
                <Text fw="bold">{schedule.subjectName}</Text>
                <Text>
                    {dayjs(schedule.startDate).format('HH:mm')} - {dayjs(schedule.endDate).format('HH:mm')}
                    {schedule.startDate && ` ngày ${utils_date_dateToDDMMYYYString(new Date(schedule.startDate))}`}
                </Text>
                <Text>Lớp: {schedule.name} - Sĩ số: {schedule.addressCapacity}</Text>
                <Text>Phòng: {schedule.addressName}</Text>
            </Card>
        ));
    };

    return (
        <MyFlexColumn gap={0}>
            <Text fw={700} ta="center" fz={{ base: 'sm', sm: 'md' }}>Lịch hoạt động</Text>
            <Text fw={700} ta="center" fz={{ base: 'sm', sm: 'md' }}>
                {selectedDates[0] && selectedDates[1] && (
                    <>
                        {selectedDates[0].getTime() === selectedDates[1].getTime() ? (
                            <>trong {utils_date_dateToDDMMYYYString(selectedDates[0])}</>
                        ) : (
                            <>
                                {utils_date_dateToDDMMYYYString(selectedDates[0])} {" - "}
                                {utils_date_dateToDDMMYYYString(selectedDates[1])}
                            </>
                        )}
                    </>
                )}
            </Text>

            <ScrollArea
                mih={{ base: '45vh', sm: 'calc(100vh - 25vh - 46px)', md: 'calc(100vh - 50vh - 46px)', lg: 'calc(100vh - 25vh - 46px)' }}
                h={{ base: '45vh', sm: 'calc(100vh - 25vh - 46px)', md: 'calc(100vh - 50vh - 46px)', lg: 'calc(100vh - 25vh - 46px)' }}>
                <DatePicker
                    size="sm"
                    style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
                    type="range"
                    allowSingleDateInRange
                    value={selectedDates}
                    onChange={handleDateChange}
                    getDayProps={getDayProps}
                    renderDay={(date) => {
                        const day = new Date(date).getDate();
                        const isToday = dayjs(date).isSame(dayjs(), 'date');
                        return (
                            <Indicator size={6} color="red" offset={-2} disabled={!isToday}>
                                <div>{day}</div>
                            </Indicator>
                        );
                    }}
                />
                {renderContent()}
            </ScrollArea>
        </MyFlexColumn>
    );
} 