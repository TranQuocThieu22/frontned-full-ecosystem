'use client'
// import '@schedule-x/theme-default/dist/index.css'
import {
    CalendarEventExternal,
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react';
import { useState } from "react";

interface CustomScheduleXProps<T extends CalendarEventExternal> {
    values?: T[]
    timeGridEvent?: (props: { calendarEvent: T }) => React.ReactNode
    eventModal?: (props: { calendarEvent: T }) => React.ReactNode,
    nDays?: number,
    startDayBoundaries?: string,
    endDayBoundaries?: string
}

export function CustomScheduleX<T extends CalendarEventExternal>({
    values,
    timeGridEvent,
    eventModal,
    nDays,
    startDayBoundaries = "05:00",
    endDayBoundaries = "21:00"
}: CustomScheduleXProps<T>) {
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
