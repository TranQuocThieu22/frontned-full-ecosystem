"use client";
import {MyButtonModal,MyFieldset,MyFlexColumn,MyFlexRow,} from "aq-fe-framework/components";
import {createViewDay,createViewMonthAgenda,createViewMonthGrid,createViewWeek,} from '@schedule-x/calendar'
import { Box, Grid, Group, NumberFormatter, Paper, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {useRef, useState } from "react";
import { ScheduleXCalendar, useNextCalendarApp } from "@schedule-x/react";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { useDisclosure } from "@mantine/hooks";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";

export default function F_ddpt8jnt35_Calendar() {
    const updateModalRef = useRef<{ openWithData: (data: I_ThucDon) => void }>(null);
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const dis = useDisclosure(); 
    // Query
    const danhSachThucDonQuery = useQuery<I_ThucDon[]>({
        queryKey: ["F_ddpt8jnt35_Calendar"],
        queryFn: async () => {
            return mockData;
        },
    });

    // Mapping khung thời gian
    const buoiToTimeRange: Record<string, { start: string; end: string }> = {
        "Sáng": { start: "00:00", end: "01:00" },
        "Trưa": { start: "01:00", end: "02:00" },
        "Chiều": { start: "02:00", end: "03:00" },
    }

    // Chuyển data thành events
    const convertToEvents = (data: I_ThucDon[]) => {
        return data.map(item => {
            const date = item.ngay.toISOString().split("T")[0]
            const timeRange = buoiToTimeRange[item.buoi] ?? { start: "06:00", end: "07:00" }

            return {
                id: item.id.toString(),
                title: `${item.buoi}: ${item.thucDon}`,
                start: `${date} ${timeRange.start}`,
                end: `${date} ${timeRange.end}`,
                extendedProps: {
                    rawData: item
                }
            }
        })
    }

    // calendar
    const calendar = useNextCalendarApp({
        locale: "vi-VN",
        dayBoundaries: {
            start: '00:00',
            end: '03:00',
        },
        views: [
            createViewDay(),
            createViewWeek(),
            createViewMonthGrid(),
            createViewMonthAgenda()
        ],
        weekOptions: {
            nDays: 7,
            gridHeight: 700
        },
        events: convertToEvents(mockData),
        plugins: [eventsService],
    })


    if (danhSachThucDonQuery.isLoading) return "Đang tải dữ liệu...";
    if (danhSachThucDonQuery.isError) return "Lỗi tải dữ liệu";


    return (
        <>
        <MyButtonModal label={"Xem thực đơn"} modalSize={1500} crudType={"default"} mt={25} title='Bảng thực đơn các bữa ăn' onSubmit={() => { } } disclosure={dis} >
        <style jsx global>{`:root{--sx-calendar-week-grid-padding-left: calc(6.5rem * var(--mantine-scale));}`}</style>
        <MyFieldset
            title="Bảng thực đơn các bữa ăn"
            style={{
                "--bg-box-breakfast": "#FEC195",
                "--bg-box-lunch": "#A5CAD2",
                "--bg-box-dinner": "#FF9190",
                "--bg-box-breakfast-border": "#fc7a2e",
                "--bg-box-lunch-border": "#0dadd0",
                "--bg-box-dinner-border": "#ea3230",
            }}>
            <ScheduleXCalendar calendarApp={calendar} customComponents={{
                timeGridEvent: ({ calendarEvent }: { calendarEvent: any }) => {
                    const thucDonData = calendarEvent.extendedProps.rawData as I_ThucDon
                    return (
                        <>
                            <Box
                                h={'100%'}
                                style={{ borderRadius: "3px" }}
                                px={10} pb={10} pt={5}
                                mx={3}
                                onClick={() => { updateModalRef.current?.openWithData(thucDonData) }}
                                bg={
                                    thucDonData.buoi === "Sáng" ? "var(--bg-box-breakfast)"
                                        : thucDonData.buoi === "Trưa" ? "var(--bg-box-lunch)"
                                            : "var(--bg-box-dinner)"
                                }
                            >
                                <MyCenterFull>
                                    <Text fz="14px" fw={'bold'}>Bữa {thucDonData.buoi.toLowerCase()}</Text>
                                </MyCenterFull>
                                <MyFlexColumn gap="xs">
                                    <Text lineClamp={9} fz="14px">
                                        <Text fz="14px" fw={500} span>{thucDonData.thucDon?.length > 0 ? "Thực đơn: " : ""}</Text>
                                        {thucDonData.thucDon}
                                    </Text>
                                    <Text fz="14px">
                                        <Text fz="14px" fw={500} span>{thucDonData.dinhDuong?.length > 0 ? "Dinh dưỡng: " : ""}</Text>
                                        {thucDonData.dinhDuong}
                                    </Text>
                                    <Text fz="14px">
                                        <Text fz="14px" fw={500} span>{thucDonData.gia ? "Giá: " : ""}</Text>
                                        {<NumberFormatter thousandSeparator="." decimalSeparator="," value={thucDonData.gia} />}
                                    </Text>
                                </MyFlexColumn>
                            </Box>
                        </>
                    )
                },
                monthGridEvent: ({ calendarEvent }: { calendarEvent: any }) => {
                    const thucDonData = calendarEvent.extendedProps.rawData as I_ThucDon
                    return (
                        <>
                            <Box
                                style={{
                                    borderRadius: "3px",
                                    borderLeft: "4px solid",
                                    borderLeftColor: thucDonData.buoi === "Sáng" ? "var(--bg-box-breakfast-border)"
                                        : thucDonData.buoi === "Trưa" ? "var(--bg-box-lunch-border)"
                                            : "var(--bg-box-dinner-border)",
                                }}
                                onClick={() => { updateModalRef.current?.openWithData(thucDonData) }}
                                bg={
                                    thucDonData.buoi === "Sáng" ? "var(--bg-box-breakfast)"
                                        : thucDonData.buoi === "Trưa" ? "var(--bg-box-lunch)"
                                            : "var(--bg-box-dinner)"
                                }
                            >
                                <Text fz='xs'>Bữa {thucDonData.buoi.toLowerCase()}: {thucDonData.thucDon}</Text>
                            </Box>

                        </>
                    )
                },
                weekGridHour: ({ hour }) => <CustomTimeLabel hour={hour} />,
                weekGridDate: ({ date }) => <CustomWeekGridDate date={date} />,
                monthGridDayName: ({ day }) => <CustomMonthGridDayName day={day} />,
            }} />
        </MyFieldset>
       
    </MyButtonModal>
        </>
    );
}
const CustomTimeLabel = ({ hour }: { hour: string }) => {
    // giả sử hour nhận vào dạng chuỗi "00:00", "01:00", "02:00",…
    // tách số ra khỏi giờ kiểu chuỗi
    let numericHour;
    if (typeof hour === 'string' && hour.includes(':')) {
        numericHour = parseInt(hour.split(':')[0] ?? '0', 10);
    } else {
        numericHour = Number(hour);
    }

    // css để đè css gốc của label "lấy từ css gốc của nó nhưng sửa lại xíu"
    const labelStyle: React.CSSProperties = {
        position: "absolute",
        left: "calc(-2.55rem * var(--mantine-scale))",
        top: "45%",
        visibility: "visible"
    };

    // render label component
    const textLabel = (label: string) => {
        return (<Text fw={500} style={labelStyle} span>{label}</Text>)
    }

    // giả định mốc giờ như sau:
    // 00:00 –> 01:00 hiển thị "Sáng"
    // 01:00 –> 02:00 hiển thị "Trưa"
    // 02:00 –> 03:00 hiển thị "Chiều"
    // Render label
    if (numericHour === 0) return textLabel("Bữa sáng");
    if (numericHour === 1) return textLabel("Bữa trưa");
    if (numericHour === 2) return textLabel("Bữa chiều");
    return textLabel(hour);
};

const CustomWeekGridDate = ({ date }: { date: Date | string }) => {
    // Chuyển date về đối tượng Date nếu cần
    const d: Date = typeof date === "string" ? new Date(date) : date;
    // Lấy thứ của tuần; JavaScript: 0 là Chủ Nhật, 1 là Thứ 2, v.v.
    const dayIndex = d.getDay();

    //mMapping thứ theo định dạng bạn mong muốn
    const dayMapping: Record<number, string> = {
        0: "Chủ Nhật",
        1: "Thứ 2",
        2: "Thứ 3",
        3: "Thứ 4",
        4: "Thứ 5",
        5: "Thứ 6",
        6: "Thứ 7",
    };

    return <MyFlexColumn justify="start" align="center" gap={1}>
        <Text fz="17px" fw="bold" span>{dayMapping[dayIndex]}</Text>
        <Text fz="15px" fw={500} span>{utils_date_dateToDDMMYYYString(d)}</Text>
    </MyFlexColumn>;
};

// tùy biến cho thứ của chế độ xem theo tháng
const CustomMonthGridDayName = ({ day }: { day: number }) => {
    // Mapping số thứ sang chuỗi hiển thị theo định dạng mong muốn
    const dayMapping: Record<number, string> = {
        0: 'Chủ Nhật',
        1: 'Thứ 2',
        2: 'Thứ 3',
        3: 'Thứ 4',
        4: 'Thứ 5',
        5: 'Thứ 6',
        6: 'Thứ 7',
    };
    return <span>{dayMapping[day]}</span>;
};



const mockData: I_ThucDon[] = [
    {
        id: 1,
        ngay: new Date(),
        buoi: "Sáng",
        nhomHocSinh: "Trung học",
        cheDoAn: "Bình thường",
        thucDon: "Mỳ tôm bò, Bánh pizza, Sữa Milo, Cánh gà KFC, Thịt heo kho tàu, Khoai tây lắc phô mai, Rau muống xáo thịt bò, Canh rau muống vắt chanh, Cánh gà KFC, Thịt heo kho tàu, Khoai tây lắc phô mai, Rau muống xáo thịt bò, Canh rau muống vắt chanh",
        dinhDuong: "500 calo. 20g protein. 15g chất sơ. 5g chất béo",
        gia: 45000,
    },
    {
        id: 2,
        ngay: new Date(),
        buoi: "Trưa",
        nhomHocSinh: "Trung học",
        cheDoAn: "Bình thường",
        thucDon: "Cánh gà KFC, Thịt heo kho tàu, Khoai tây lắc phô mai, Rau muống xáo thịt bò, Canh rau muống vắt chanh",
        dinhDuong: "",
        gia: undefined,
    },
    {
        id: 3,
        ngay: new Date(),
        buoi: "Chiều",
        nhomHocSinh: "Trung học",
        cheDoAn: "Bình thường",
        thucDon: "Sữa proby",
        dinhDuong: "",
        gia: undefined,
    }
];


export interface I_ThucDon {
    id: number;
    ngay: Date;
    buoi: string;
    nhomHocSinh: string;
    cheDoAn?: string;
    thucDon: string;
    dinhDuong: string;
    gia?: number;
}

export const buoiSelectData = [
    { label: "Sáng", value: "Sáng" },
    { label: "Trưa", value: "Trưa" },
    { label: "Chiều", value: "Chiều" }
]

export const nhomHocSinhSelectData = [
    { label: "Tiểu học", value: "Tiểu học" },
    { label: "Trung học", value: "Trung học" },
]

export const cheDoAnSelectData = [
    { label: "Bình thường", value: "Bình thường" },
    { label: "Ăn chay", value: "Ăn chay" },
    { label: "Ăn kiêng", value: "Ăn kiêng" },
]