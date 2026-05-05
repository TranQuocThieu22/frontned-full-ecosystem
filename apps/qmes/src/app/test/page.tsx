'use client'
import { Center, Paper } from '@mantine/core';
// import {
//     createViewDay,
//     createViewMonthAgenda,
//     createViewMonthGrid,
//     createViewWeek,
// } from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';

import '@schedule-x/theme-default/dist/index.css';

function CalendarApp() {
    const plugins = [createEventsServicePlugin()]

    // const calendar = useNextCalendarApp({
    //     views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    //     events: [
    //         {
    //             id: '1',
    //             title: 'Event 1',
    //             start: '2023-12-16',
    //             end: '2023-12-16',
    //         },
    //     ],
    // }, plugins)

    // useEffect(() => {
    //     // get all events
    //     calendar?.events.getAll()
    // }, [])

    return (
        <Center h={'100vh'}>
            <Paper h={'20vh'} w={'80%'}>
                {/* <ScheduleXCalendar calendarApp={calendar} /> */}
            </Paper>
        </Center>
    )
}

export default CalendarApp