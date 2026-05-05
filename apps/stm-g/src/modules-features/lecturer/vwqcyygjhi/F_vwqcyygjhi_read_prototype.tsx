'use client'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react'
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn'
import MyFlexRow from '@/components/Layouts/FlexRow/MyFlexRow'
import { utils_date_formatToDateTimeStartEnd } from '@/utils/date'
import { Box, ColorSwatch, Paper, Text, Title } from '@mantine/core'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import '@schedule-x/theme-default/dist/index.css'
import { IconClock, IconMap, IconUserQuestion, IconUsersGroup } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
interface I_modal {
  id?: number,
  name?: string,
  startDate?: string,
  endDate?: string,
  addressName?: string,
  addressCapacity?: number,
  lecturerName?: string,
  subjectName?: string,
  laLichThi?: boolean,
  schedule?: {
    dayth?: number,
    timeStart?: string,
    timeEnd?: string,
  }
}
interface I {
  id?: number,
  name?: string,
  startDate?: string,
  endDate?: string,
  addressName?: string,
  addressCapacity?: number,
  lecturerName?: string,
  subjectName?: string,
  laLichThi?: boolean,
  schedule?: {
    dayth?: number,
    timeStart?: string,
    timeEnd?: string,
  },
  color?: string,
}


// Hàm hash để tạo màu cố định từ `subjectName`
function hashStringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (((hash >> (i * 8)) & 127) + 128);
    color += ("00" + value.toString(16)).slice(-2);
  }

  console.log(`${str}: ${color}`);
  return color;
}


// Lấy màu dựa trên `subjectName`
function getColor(subjectName: string | undefined): string {
  return subjectName ? hashStringToColor(subjectName) : "#000000";
}

function generatePeriod(item: I) {
  let events = []
  const today = new Date().toISOString().split("T")[0];

  if(!today) return

  let start = new Date(item.startDate ?? today)
  let end = new Date(item.endDate ?? today)
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.error("Invalid date:", item.startDate, item.endDate);
    return [];
  }

  while (start < end) {
    if (start.getDay() === item.schedule?.dayth) {
      let dateStr = start.toISOString().split("T")[0] // Lấy YYYY-MM-DD
      events.push({
        id: `${item.id} ${item.name}`,
        title: item.subjectName,
        start: `${dateStr} ${item.schedule.timeStart}`,
        end: `${dateStr} ${item.schedule.timeEnd}`,
        startDate: item.startDate,
        endDate: item.endDate,
        schedule: {
          dayth: item.schedule.dayth,
          timeStart: item.schedule.timeStart,
          timeEnd: item.schedule.timeEnd,
        },
        addressName: item.addressName,
        addressCapacity: item.addressCapacity,
        subjectName: item.subjectName,
        lecturerName: item.lecturerName,
        color: getColor(item.subjectName)
      })

    }
    console.log("time start: ", item.schedule?.timeStart)
    console.log(item.color)

    start.setDate(start.getDate() + 1) // Tăng ngày lên

  }

  return events
}
export default function F_vwqcyygjhi_read_prototype() {
  const today = new Date().toISOString().split("T")[0];
  const eventsService = useState(() => createEventsServicePlugin())[0]
  const eventModal = useState(() => createEventModalPlugin())[0]
  const query = useQuery<I[]>({
    queryKey: [`F_vwqcyygjhi_read`],
    queryFn: async () => courses
  })

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
    events: [],
    plugins: [eventsService, eventModal],

  })


  useEffect(() => {
    if (!query.data || query.data.length === 0) return;

    // Lọc chỉ lấy các lớp học (không lấy lịch thi)
    const filteredData = query.data.filter(item => item.laLichThi === false);

    // Chuyển thành sự kiện cho calendar
    const result = filteredData.flatMap(item => generatePeriod(item)).filter(item => item !== undefined);

    if ( result && result.length > 0) {
      calendar?.events.set(result);
    }

  }, [query.data])

  // console.log("Final events: ",eventsService)
  if (query.isLoading) return "Đang tải dữ liệu..."
  if (query.isError) return "Có lỗi xảy ra"
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} customComponents={{
        timeGridEvent: ({ calendarEvent }: { calendarEvent: I }) => {
          return (
            <Box
              h={'100%'}
              style={{
                border: "1px solid gray",
                borderRadius: "5px",
                boxShadow:
                  "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
              }}
              bg={calendarEvent.color} // Không dùng màu lịch thi
              p={4}
            >
              <MyFlexColumn gap={1}>
                <Text size='sm' fw={'bold'}>
                  {calendarEvent.subjectName || "Chưa đặt tên"}
                </Text>
                <Text size='sm'>{calendarEvent.lecturerName}</Text>
                <Text size='sm'>Phòng: {calendarEvent.addressName}</Text>
              </MyFlexColumn>
            </Box>
          );
        },
        eventModal: ({ calendarEvent }: { calendarEvent: I }) => {
          return (
            <Paper
              p={'md'}
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
              }}
            >
              <MyFlexColumn>
                <MyFlexRow>
                  <ColorSwatch size={"15px"} color={"#a5d8ff"} />
                  <Title order={4}>{calendarEvent.subjectName || "Chưa đặt tên"}</Title>
                </MyFlexRow>
                <MyFlexRow>
                  <IconClock />
                  <Text>
                    {utils_date_formatToDateTimeStartEnd(
                      new Date(`${calendarEvent.startDate} ${calendarEvent.schedule?.timeStart}`),
                      new Date(`${calendarEvent.endDate} ${calendarEvent.schedule?.timeEnd}`)
                    )}
                  </Text>
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
                  <Text>
                    Giảng viên: {calendarEvent.lecturerName?.length == 0 ? "Chưa xếp giảng viên" : calendarEvent.lecturerName}
                  </Text>
                </MyFlexRow>
              </MyFlexColumn>
            </Paper>
          );
        },
      }} />

    </div>
  )
}

const courses: I[] = [
  {
    id: 1,
    name: "Calculus 3",
    startDate: "2025-03-03",
    endDate: "2025-06-30",
    addressName: "Phòng 101 - Cơ sở A",
    addressCapacity: 40,
    lecturerName: "Nguyễn Văn A",
    subjectName: "Calculus 3",
    laLichThi: false,
    schedule: {
      dayth: 2, // Thứ 3
      timeStart: "08:00",
      timeEnd: "10:00",
    },
  },
  {
    id: 2,
    name: "Cơ sở dữ liệu",
    startDate: "2025-03-03",
    endDate: "2025-06-30",
    addressName: "Phòng 202 - Cơ sở B",
    addressCapacity: 50,
    lecturerName: "Phạm Văn C",
    subjectName: "Database Fundamentals",
    laLichThi: false,
    schedule: {
      dayth: 3, // Thứ 4
      timeStart: "10:30",
      timeEnd: "12:30",
    },
  },
  {
    id: 3,
    name: "Trí tuệ nhân tạo",
    startDate: "2025-03-03",
    endDate: "2025-06-30",
    addressName: "Phòng 305 - Cơ sở C",
    addressCapacity: 35,
    lecturerName: "Lê Văn D",
    subjectName: "Artificial Intelligence",
    laLichThi: false,
    schedule: {
      dayth: 4, // Thứ 5
      timeStart: "13:00",
      timeEnd: "15:00",
    },
  },
  {
    id: 4,
    name: "Khoa học dữ liệu",
    startDate: "2025-03-03",
    endDate: "2025-06-30",
    addressName: "Phòng 401 - Cơ sở A",
    addressCapacity: 45,
    lecturerName: "Nguyễn Minh F",
    subjectName: "Data Science",
    laLichThi: false,
    schedule: {
      dayth: 5, // Thứ 6
      timeStart: "13:30",
      timeEnd: "17:30",
    },
  },
  {
    id: 5,
    name: "Hệ thống nhúng",
    startDate: "2025-03-03",
    endDate: "2025-06-30",
    addressName: "Phòng 501 - Cơ sở B",
    addressCapacity: 30,
    lecturerName: "Trần Quốc G",
    subjectName: "Embedded Systems",
    laLichThi: true,
    schedule: {
      dayth: 5, // Thứ 7
      timeStart: "09:00",
      timeEnd: "11:00",
    },
  },
];

