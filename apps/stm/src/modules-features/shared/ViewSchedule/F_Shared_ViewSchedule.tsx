'use client'
import {
    CalendarEventExternal,
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react'

import baseAxios from '@/api/config/baseAxios'
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn'
import MyFlexRow from '@/components/Layouts/FlexRow/MyFlexRow'
import { Box, ColorSwatch, Paper, Text, Title } from '@mantine/core'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import '@schedule-x/theme-default/dist/index.css'
import { IconClock, IconMap, IconUserQuestion, IconUsersGroup } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { utils_date_formatToDateTimeStartEnd } from 'aq-fe-framework/utils'
import { useEffect, useState } from 'react'
import useS_Shared_ViewSchedule from './useS_Shared_ViewSchedule'
interface IBuoiHoc extends CalendarEventExternal {
    start: string,
    end: string,
    subjectName?: string,
    hoTenGiangVien?: string,
    addressCapacity?: number,
    addressName?: string,
    lecturerName?: string[]
    laLichThi?: boolean,
    description?: string
}
interface I {
    id?: number,
    name?: string,
    startDate?: string,
    endDate?: string,
    addressName?: string,
    addressCapacity?: number,
    lecturerName?: string[]
    subjectName?: string,
}

export default function F_Shared_ViewSchedule() {
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const eventModal = useState(() => createEventModalPlugin())[0]
    const store = useS_Shared_ViewSchedule()
    const query = useQuery<I[]>({
        queryKey: ["F_i47273jqpi_ViewSchedule", {
            PageSize: 0,
            PageNumber: 0,
            lecturerId: store.state.lecturerId,
            courseSectionId: store.state.courseSectionId,
            addressId: store.state.addressId,
            studentId: store.state.studentId
        }],
        queryFn: async () => {
            const res = await baseAxios.post("/CourseSection/GetSchedule", {
                PageSize: 0,
                PageNumber: 0,
                lecturerId: store.state.lecturerId,
                courseSectionId: store.state.courseSectionId,
                addressId: store.state.addressId,
                studentId: store.state.studentId
            })
            return res.data.data
        },
    })
    useEffect(() => {
        console.log("s");

        query.refetch()
    }, [store.state])
    const calendar = useNextCalendarApp({
        locale: "vi-VN",
        dayBoundaries: {
            start: '05:00',
            end: '21:00',
        },

        weekOptions: {
            nDays: 7,
            gridHeight: 700
        },
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        plugins: [eventsService, eventModal]
    })


    useEffect(() => {
        // get all events
        if (query.data == undefined) return
        const result = query.data.map(item => {
            return ({
                id: item.id!,
                start: item.startDate!.replaceAll("T", " ").split(":").slice(0, 2).join(":"),
                end: item.endDate!.replaceAll("T", " ").split(":").slice(0, 2).join(":"),
                subjectName: item.subjectName,
                addressName: item.addressName,
                addressCapacity: item.addressCapacity,
                lecturerName: item.lecturerName
            }) as IBuoiHoc
        })
        calendar?.events.set(result)
    }, [query.data, store.state])
    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra"

    return (
        <div>
            <ScheduleXCalendar calendarApp={calendar} customComponents={{
                timeGridEvent: ({ calendarEvent }: { calendarEvent: IBuoiHoc }) => {
                    return (
                        <Box h={'100%'} style={{ border: "1px solid gray", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }} bg={calendarEvent.laLichThi ? 'violet.2' : "blue.2"} p={4}>
                            <MyFlexColumn gap={1}>
                                <Text size='sm' fw={'bold'}>{calendarEvent.laLichThi ? "(Thi) " : "(Học) "}{calendarEvent.subjectName || "Chưa đặt tên"}</Text>
                                {calendarEvent.lecturerName?.length == 0 && "Chưa xếp giảng viên"}
                                {calendarEvent.laLichThi == false && <Text size='sm'>{calendarEvent.lecturerName}</Text>}
                                <Text size='sm'>Phòng: {calendarEvent.addressName}</Text>
                            </MyFlexColumn>
                        </Box>
                    )
                },
                eventModal: ({ calendarEvent }: { calendarEvent: IBuoiHoc }) => {
                    return (
                        <Paper p={'md'} style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }}>
                            <MyFlexColumn>
                                <MyFlexRow>
                                    <ColorSwatch size={"15px"} color={calendarEvent.laLichThi ? '#d0bfff' : "#a5d8ff"} />
                                    <Title order={4}>{calendarEvent.subjectName || "Chưa đặt tên"}</Title>
                                </MyFlexRow>
                                <MyFlexRow>
                                    <IconClock />
                                    <Text>{utils_date_formatToDateTimeStartEnd(new Date(calendarEvent.start), new Date(calendarEvent.end))}</Text>
                                </MyFlexRow>
                                <MyFlexRow>
                                    <IconUsersGroup />
                                    <Text>Sức chứa: {calendarEvent.addressCapacity}</Text>
                                </MyFlexRow>
                                <MyFlexRow>
                                    <IconMap />
                                    <Text>Phòng: {calendarEvent.addressName}</Text>
                                </MyFlexRow>
                                <MyFlexRow>
                                    <IconUserQuestion />
                                    <Text>Giảng viên: {calendarEvent.lecturerName?.length == 0 ? "Chưa xếp giảng viên" : calendarEvent.lecturerName}</Text>
                                </MyFlexRow>
                            </MyFlexColumn>
                        </Paper>
                    )
                }
            }} />
        </div>
    )
}
