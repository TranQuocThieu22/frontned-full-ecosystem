'use client';
import { Alert, Box, Button, Center, Flex, Group, LoadingOverlay, SegmentedControl, Select, Text, useMantineColorScheme } from "@mantine/core";
import { DateInput, MonthPickerInput } from "@mantine/dates";
import { createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek, } from '@schedule-x/calendar';
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { IconCalendarWeek, IconChevronsLeft, IconChevronsRight, IconClock, IconHazeMoon, IconInfoCircle, IconSun, IconSunset2 } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import F_jk2z08i07i_UpdateMenu from './F_jk2z08i07i_UpdateMenu';

export interface WeekSelectMenuCalendar {
    name: string;
    start: string; // format YYYY-MM-DD
    end: string; // format YYYY-MM-DD
}

export interface I_jk2z08i07i_Menu {
    id: number;
    ngay: string; // format yyyy-mm-ddThh:mm:ss
    buoi: string;
    nhomHocSinh: string;
    cheDoAn?: string;
    thucDon: string;
    dinhDuong: string;
    gia?: number;
}

export default function F_jk2z08i07i_CalendarMenu(
    {
        data,
        isLoadingDataMenu,
        isErrorLoadDataMenu,
        isLoadingDataWeekOption,
        isErrorLoadDataWeekOption,
        setDateStart,
        setDateEnd,
        listWeekSelectData
    }: {
        data?: I_jk2z08i07i_Menu[],
        isLoadingDataMenu: boolean,
        isErrorLoadDataMenu: boolean,
        isLoadingDataWeekOption: boolean,
        isErrorLoadDataWeekOption: boolean,
        setDateStart: Function,
        setDateEnd: Function,
        listWeekSelectData?: WeekSelectMenuCalendar[]
    }
) {
    const [isCalendarSmall, setIsCalendarSmall] = useState(false);
    const updateModalRef = useRef<{ openWithData: (data: I_jk2z08i07i_Menu) => void }>(null);
    const eventsService = useState(() => createEventsServicePlugin())[0];
    // use useMemo() for calendarControl to avoid rerender when change dark/light mode
    const calendarControls = useMemo(() => createCalendarControlsPlugin(), []);
    const { colorScheme } = useMantineColorScheme();


    // Convert data to event
    const convertDataToEvents = (data: I_jk2z08i07i_Menu[]) => {
        // Mapping meal to period of time
        // 0h -> 1h --> breakfast
        // 1h -> 2h --> lunch
        // 2h -> 3h --> dinner
        const mappingMealToTimeRange: Record<string, { start: string; end: string }> = {
            "Sáng": { start: "00:01", end: "00:59" },
            "Trưa": { start: "01:01", end: "01:59" },
            "Chiều": { start: "02:01", end: "02:59" },
        }

        return data.map(item => {
            const date = item.ngay.split("T")[0]
            const timeRange = mappingMealToTimeRange[item.buoi] ?? { start: "06:00", end: "07:00" }
            return {
                id: item.id,
                title: `${item.buoi}: ${item.thucDon}`,
                start: `${date} ${timeRange.start}`,
                end: `${date} ${timeRange.end}`,
                extendedProps: {
                    rawData: item
                }
            }
        })
    }

    // calendarApp 
    /// docs: https://schedule-x.dev/docs/calendar/configuration 
    /// https://schedule-x.dev/docs/calendar/configuration
    const calendarApp = useCalendarApp({
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
        events: [],
        plugins: [eventsService, calendarControls],
        callbacks: {
            isCalendarSmall($app) {
                const isSmall = $app.elements.calendarWrapper?.clientWidth! < 800;
                setIsCalendarSmall(isSmall)
                return isSmall;
            },
            onRangeUpdate(range) {
                setDateStart(range.start.split(" ")[0]);
                setDateEnd(range.end.split(" ")[0]);
            },
            onEventClick(calendarEvent) {
                updateModalRef.current?.openWithData(calendarEvent.extendedProps.rawData as I_jk2z08i07i_Menu);
            },
        },
    });

    // set theme dark/light mode for calendar
    calendarApp?.setTheme(colorScheme === 'dark' ? 'dark' : 'light');

    // load data to calendar
    useEffect(() => {
        if (data) {
            const events = convertDataToEvents(data);
            eventsService.set(events);
        }
    }, [eventsService, data]);

    if (isLoadingDataWeekOption) return <>
        <Box pos="relative" mih={700}>
            <LoadingOverlay
                visible={true}
                zIndex={3}
                overlayProps={{ radius: 'sm', blur: 10 }}
                loaderProps={{ color: 'var(--mantine-color-blue-light-color)', type: 'bars', size: "70" }}
            />
        </Box>
    </>;

    if (isErrorLoadDataMenu) return <>
        <Alert variant="outline" color="red" radius="md" title="Error load data" icon={<IconInfoCircle />}></Alert>
    </>

    return <>
        {/* css for custom calendar*/}
        <><style jsx global>{
            `@keyframes sx-slide-down {
                0% {opacity: 0.5; transform: translateY(-2%);}
                100% { opacity: 1; transform: translateY(0);}
            }
            .sx__slide-right { animation: sx-slide-down 0.2s ease !important; }
            .sx__slide-left { animation: sx-slide-down 0.2s ease !important; }
            .sx__month-grid-cell {
                height: clamp(30px, 1.25rem, 24px);
            }
            :root {
                --text-color-calendar-menu: #000000;
                --text-color-calendar-menu-month-out-date: #808080;
            }
            :root[data-mantine-color-scheme="dark"] {
                --text-color-calendar-menu: #adadad;
                --text-color-calendar-menu-month-out-date: #565555;
            }`
        }</style></>
        {/* css when calendar width small*/}
        {isCalendarSmall
            ? <><style jsx global>{`
                /* For column meal of the day */
                :root{ 
                    --sx-calendar-week-grid-padding-left: 0; 
                }
                .sx__week-grid__hour {
                    display: none;
                }`
            }</style></>
            : <><style jsx global>{`
                /* For column meal of the day */
                :root{ 
                    --sx-calendar-week-grid-padding-left: calc(6.5rem * var(--mantine-scale)); 
                }`
            }</style></>
        }
        <Box pos="relative" mih={700}>
            <LoadingOverlay
                visible={isLoadingDataMenu}
                zIndex={3}
                overlayProps={{ radius: 'sm', blur: 10 }}
                loaderProps={{ color: 'var(--mantine-color-blue-light-color)', type: 'bars', size: "70" }}
            />
            <ScheduleXCalendar calendarApp={calendarApp} customComponents={{
                timeGridHour: ({ hour } : { hour: string }) => <CustomTimeLabel hour={hour} />,
                weekGridDate: ({ date } : { date: string }) => <CustomWeekGridDate date={date} />,
                monthGridDayName: ({ day } : { day: number }) => <CustomMonthGridDayName day={day} />,
                monthGridDate: ({ date, jsDate } : { date: string, jsDate: Date }) => <CustomMonthGridDate
                    date={date}
                    jsDate={jsDate}
                    calendarControls={calendarControls}
                />,
                headerContent: () => <CustomHeaderContent
                    listWeekSelectData={listWeekSelectData}
                    isCalendarSmall={isCalendarSmall}
                    calendarControls={calendarControls}
                    isErrorLoadDataWeekOption={isErrorLoadDataWeekOption}
                />,
                timeGridEvent: ({ calendarEvent }) => <CustomTimeGirdEvent
                    calendarEvent={calendarEvent}
                    isCalendarSmall={isCalendarSmall}
                />,
                monthGridEvent: ({ calendarEvent }) => <CustomMonthGridEvent
                    calendarEvent={calendarEvent}
                    calendarControls={calendarControls}
                />,
                monthAgendaEvent: ({ calendarEvent }) => <CustomMonthAgendaEvent
                    calendarEvent={calendarEvent}
                />,
            }} />
        </Box>
        <F_jk2z08i07i_UpdateMenu ref={updateModalRef} />
    </>;
}

// docs: https://schedule-x.dev/docs/calendar/custom-components
// Custom label for meal of the day "Bữa sáng", "Bữa trưa", "Bữa chiều"
const CustomTimeLabel = ({ hour }: { hour: string }) => {
    // Hour is received as string "00:00", "01:00", "02:00",…
    // Get hour from time string
    let numericHour;
    if (typeof hour === 'string' && hour.includes(':')) {
        numericHour = parseInt(hour?.split(':')[0] || '0', 10);
    } else {
        numericHour = Number(hour);
    }

    // css for label
    const labelStyle: React.CSSProperties = {
        position: "absolute",
        left: "calc(-2.55rem * var(--mantine-scale))",
        top: "45%",
        visibility: "visible"
    };

    // data meal
    const mealOfTheDay = ["Bữa sáng", "Bữa trưa", "Bữa chiều"]

    // Mapping hour to meal of the day
    // 00:00 –> "Bữa sáng"
    // 01:00 –> "Bữa trưa"
    // 02:00 -> "Bữa chiều"
    // Render label
    return <Text fw={500} style={labelStyle} span>{mealOfTheDay[numericHour]}</Text>;
};

// Custom label days of the week for week and day view mode
const CustomWeekGridDate = ({ date }: { date: string }) => {
    // Get today
    const today = new Date();

    // Get day of the week index
    const dayIndex = new Date(date).getDay();

    //Mapping days of the week index to string label
    const dayMapping: Record<number, string> = {
        0: "Chủ Nhật",
        1: "Thứ 2",
        2: "Thứ 3",
        3: "Thứ 4",
        4: "Thứ 5",
        5: "Thứ 6",
        6: "Thứ 7",
    };

    return <Flex direction="column" justify="start" align="center" gap={1}>
        <Text fz="17px" fw="500" span>{dayMapping[dayIndex]}</Text>
        <Flex align="center">
            {date === today.toISOString().split("T")[0]
                ? <>
                    <IconChevronsRight />
                    <Text fz="15px" span>{`${date[8]}${date[9]}/${date[5]}${date[6]}`}</Text>
                    <IconChevronsLeft />
                </>
                : <Text fz="15px" span>{`${date[8]}${date[9]}/${date[5]}${date[6]}`}</Text>
            }
        </Flex>
    </Flex>;
};

const CustomMonthGridDate = ({ date, jsDate, calendarControls }: { date: string, jsDate: Date, calendarControls: any }) => {
    const styleForToday = {
        backgroundColor: "rgb(200 144 255)",
        color: "white",
        borderRadius: "50%",
        width: "1.7rem",
        height: "1.7rem",
    }

    return <Text
        ta="center"
        style={new Date().toDateString() === jsDate.toDateString() ? styleForToday : {}}
        c={jsDate.getMonth() + 1 == calendarControls.getDate().split("-")[1] ? {} : "var(--text-color-calendar-menu-month-out-date)"}
    >
        {date}
    </Text>;
}

// Custom label days of the week for month-grid view mode
const CustomMonthGridDayName = ({ day }: { day: number }) => {
    //Mapping days of the week index to string label
    const dayMapping: Record<number, string> = {
        0: 'Chủ Nhật',
        1: 'Thứ 2',
        2: 'Thứ 3',
        3: 'Thứ 4',
        4: 'Thứ 5',
        5: 'Thứ 6',
        6: 'Thứ 7',
    };
    return <Text fw={500}>{dayMapping[day]}</Text>;
};

// Custom header content for calendar
const CustomHeaderContent = (
    {
        calendarControls,
        listWeekSelectData,
        isErrorLoadDataWeekOption,
        isCalendarSmall
    }: {
        calendarControls: any,
        isCalendarSmall: boolean,
        listWeekSelectData?: WeekSelectMenuCalendar[],
        isErrorLoadDataWeekOption: boolean
    }
) => {
    // this variable just set view for header content if you want to set for calendar, you need call setView() of calendarControl
    const [view, setView] = useState(calendarControls.getView());
    const [date, setDate] = useState(calendarControls.getDate());

    const convertDateToYYYYmmDD = (date: Date) => {
        // sài date.toISOString().split("T")[0] bị lệch 1 ngày đầu tháng
        // format YYYY-MM-DD
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    }

    // Function find week by date
    const getStartDateByAnyDate = (dateStr: string): string | null => {
        const date = dayjs(dateStr);
        const matched = listWeekSelectData?.find((week) =>
            date.isAfter(dayjs(week.start).subtract(1, 'day')) &&
            date.isBefore(dayjs(week.end).add(1, 'day'))
        );
        return matched?.start ?? null;
    };

    // Mapping data for week select box
    const selectData = listWeekSelectData?.map((week) => ({
        value: week.start,
        label: week.name,
    }));

    return <>
        <Group>
            <Button
                variant="default"
                style={{
                    border: "calc(.0625rem * var(--mantine-scale)) solid var(--mantine-color-gray-4)",
                    borderRadius: "var(--mantine-radius-default)"
                }}
                size="sm"
                onClick={() => {
                    calendarControls.setDate(convertDateToYYYYmmDD(new Date()));
                    setDate(convertDateToYYYYmmDD(new Date()));
                }}
            >
                Hôm nay
            </Button>
            <Text fz="h4">{`Tháng ${date[5]}${date[6]} ${date[0]}${date[1]}${date[2]}${date[3]}`}</Text>
        </Group>
        <Group>
            {view === "day"
                ? <DateInput
                    leftSection={<IconCalendarWeek />}
                    value={new Date(date)} // mantine v8 thì bỏ convert
                    size="sm"
                    w="8rem"
                    clearable={false}
                    onChange={(value) => {
                        if (value) {
                            calendarControls.setDate((value)); // mantine v8 thì bỏ convert
                            setDate((value)); // mantine v8 thì bỏ convert
                        }
                    }}
                />
                : view === "week"
                    ? <Select
                        leftSection={<IconCalendarWeek />}
                        size="sm"
                        w="18rem"
                        data={selectData}
                        value={getStartDateByAnyDate(date)}
                        placeholder={isErrorLoadDataWeekOption ? "Lỗi tải dữ liệu !!!" : "Tuần hiển thị không thuộc danh sách"}
                        searchable
                        nothingFoundMessage="Không tìm thấy..."
                        onChange={(value) => {
                            if (value) {
                                calendarControls.setDate(value);
                                setDate(value);
                            }
                        }}
                    />
                    : <MonthPickerInput
                        leftSection={<IconCalendarWeek />}
                        monthsListFormat="[Tháng] M"
                        size="sm"
                        valueFormat="[Tháng] MM YYYY"
                        locale="vi"
                        value={new Date(date)} // mantine v8 thì bỏ convert
                        style={{
                            border: "calc(.0625rem * var(--mantine-scale)) solid var(--mantine-color-gray-4)",
                            borderRadius: "var(--mantine-radius-default)"
                        }}
                        onChange={(value) => {
                            if (value) {
                                calendarControls.setDate((value)); // mantine v8 thì bỏ convert
                                setDate((value)); // mantine v8 thì bỏ convert
                            }
                        }}
                    />
            }
            <SegmentedControl
                data={isCalendarSmall
                    ? [
                        { label: 'Ngày', value: 'day' },
                        { label: 'Tháng', value: 'month-agenda' },
                    ]
                    : [
                        { label: 'Ngày', value: 'day' },
                        { label: 'Tuần', value: 'week' },
                        { label: 'Tháng', value: 'month-grid' },
                    ]
                }
                transitionDuration={400}
                transitionTimingFunction="linear"
                size="sm"
                radius="md"
                color="rgba(140, 140, 140, 1)"
                defaultValue={calendarControls.getView()}
                onChange={(value) => {
                    calendarControls.setView(value);
                    setView(value);
                }}
            />
        </Group>
    </>
}

// Custom month gird event
const CustomMonthGridEvent = ({ calendarEvent, calendarControls }: { calendarEvent: any, calendarControls: any }) => {
    const data = calendarEvent.extendedProps.rawData as I_jk2z08i07i_Menu
    return (
        <Box
            style={{
                color: data.ngay.split("-")[1] !== calendarControls.getDate().split("-")[1]
                    ? "var(--text-color-calendar-menu-month-out-date)"
                    : "var(--text-color-calendar-menu)"
            }}
            ml={10}
        >
            <Flex align="center">
                {data.buoi === "Sáng" ? <IconSunset2 /> : data.buoi === "Trưa" ? <IconSun /> : <IconHazeMoon />}
                <Text ml={5} fw={500} fz='sm'>
                    {data.buoi}: <Text fz='sm' span>{data.thucDon}</Text>
                </Text>
            </Flex>
        </Box>
    )
}

// Custom month angeda event
const CustomMonthAgendaEvent = ({ calendarEvent }: { calendarEvent: any }) => {
    const data = calendarEvent.extendedProps.rawData as I_jk2z08i07i_Menu
    return (<>
        <Box
            h='100%' px={10} pb={10} pt={5} mx={3}
            style={{ color: "var(--text-color-calendar-menu)" }}
        >
            <Text fw='500' fz="h3">Bữa {data.buoi.toLowerCase()}</Text>
            <Flex direction="column" gap="xs">
                <Text lineClamp={9} fz="14px">
                    <Text fz="14px" fw={500} span>{data.thucDon?.length > 0 ? "Thực đơn: " : ""}</Text>
                    {data.thucDon}
                </Text>
                <Text fz="14px">
                    <Text fz="14px" fw={500} span>{data.dinhDuong?.length > 0 ? "Dinh dưỡng: " : ""}</Text>
                    {data.dinhDuong}
                </Text>
                <Text fz="14px">
                    <Text fz="14px" fw={500} span>{data.gia ? "Giá: " : ""}</Text>
                    {data.gia?.toLocaleString("vi-VN")}
                </Text>
            </Flex>
            <Group gap="3" pt={10}>
                <IconClock />
                <Text fz={14} fw="500">
                    {`${data.ngay[8]}${data.ngay[9]}/${data.ngay[5]}${data.ngay[6]}/${data.ngay[0]}${data.ngay[1]}${data.ngay[2]}${data.ngay[3]}`} - {data.buoi}
                </Text>
            </Group>
        </Box>
    </>)
}

// Custom time grid event
const CustomTimeGirdEvent = ({ calendarEvent, isCalendarSmall }: { calendarEvent: any, isCalendarSmall: boolean }) => {
    const data = calendarEvent.extendedProps.rawData as I_jk2z08i07i_Menu;
    return (<>
        <Box
            style={{ color: "var(--text-color-calendar-menu)" }}
            px={10} pb={10} pt={5} mx={3} h='100%'
        >
            {isCalendarSmall ? <Center w="100%"><Text fz="h3" fw={500}>Bữa {data.buoi.toLowerCase()}</Text></Center> : <></>}
            <Flex direction="column" gap="xs">
                <Text lineClamp={10} fz="14px">
                    <Text fz="14px" fw={500} span>{data.thucDon?.length > 0 ? "Thực đơn: " : ""}</Text>
                    {data.thucDon}
                </Text>
                <Text fz="14px">
                    <Text fz="14px" fw={500} span>{data.dinhDuong?.length > 0 ? "Dinh dưỡng: " : ""}</Text>
                    {data.dinhDuong}
                </Text>
                <Text fz="14px">
                    <Text fz="14px" fw={500} span>{data.gia ? "Giá: " : ""}</Text>
                    {data.gia?.toLocaleString("vi-VN")}
                </Text>
            </Flex>
        </Box>
    </>)
}

