'use client'
// import '@schedule-x/theme-default/dist/index.css'
import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    CalendarEventExternal,
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { useState } from "react";
import { createEventModalPlugin } from '@schedule-x/event-modal'

interface MyScheduleXProps<T extends CalendarEventExternal> {
    values?: T[]
    timeGridEvent?: (props: { calendarEvent: T }) => React.ReactNode
    eventModal?: (props: { calendarEvent: T }) => React.ReactNode,
    nDays?: number,
    startDayBoundaries?: string,
    endDayBoundaries?: string
}

export function MyScheduleX<T extends CalendarEventExternal>({
    values,
    timeGridEvent,
    eventModal,
    nDays,
    startDayBoundaries = "05:00",
    endDayBoundaries = "21:00"
}: MyScheduleXProps<T>) {
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const eventModalPlugin = useState(() => createEventModalPlugin())[0]
    const calendar = useNextCalendarApp({
        locale: "vi-VN",
        dayBoundaries: {
            start: startDayBoundaries,
            end: endDayBoundaries,
        },
        weekOptions: {
            nDays: nDays,
            gridHeight: 700
        },
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: values,
        plugins: [eventsService, eventModalPlugin],
    })

    return (
        <ScheduleXCalendar
            calendarApp={calendar}
            customComponents={{
                timeGridEvent: timeGridEvent,
                eventModal: eventModal
            }}
        />
    )
}
