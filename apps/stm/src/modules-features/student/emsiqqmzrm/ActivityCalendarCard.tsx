import baseAxios from "@/api/config/baseAxios";
import { Blockquote, Button, Collapse, Flex, Group, Indicator, ScrollArea, Text } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { IconChevronDown, IconChevronUp, IconClock } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { utils_date_dateToDDMMYYYString, utils_date_getHHmm } from "aq-fe-framework/utils";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import PaperLayout from "./PaperLayout";

export default function ActivityCalendarCard({ currentUserId }: { currentUserId: number }) {
  const [opened, setOpened] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const router = useRouter()
  const viewScheduleQuery = useQuery<any[]>({
    queryKey: ["F_i47273jqpi_ViewSchedule"],
    queryFn: async () => {
      const startDate = new Date();
      startDate.setDate(1); // Set to the first day of the current month
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1); // Move to the next month
      endDate.setDate(0); // Set to the last day of the current month
      endDate.setHours(23, 59, 59, 999);
      const res = await baseAxios.post("/CourseSection/GetSchedule", {
        studentId: Number(currentUserId),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        pageSize: 0,
        pageNumber: 0
      });
      return res.data.data
    },
  })
  const activities = Array.from({ length: 5 }).map((_, index) => ({
    id: index,
    title: "Lập trình web",
    lecturer: "Nguyễn Văn A",
    room: `10${index + 1}`,
    date: "18:00 - 20:00 • 16/04/2025"
  }));

  return (
    <PaperLayout
      title="Lịch hoạt động"
      // leftIcon={<IconCalendar />}
      rightButton={
        <Button
          variant="light"
          size="xs"
          onClick={() => router.push('/student/9j8m8m5dz2')}
        >
          Xem chi tiết
        </Button>
      }
    >
      <Calendar
        size="md"
        locale="vi"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex'
        }}
        renderDay={(date) => {
          const day = new Date(date).getDate();
          const isHighlighted = (viewScheduleQuery.data ?? []).some(activity => {
            const activityDate = new Date(activity.endDate).getDate();
            return activityDate === day;
          });
          return (
            <Indicator size={6} color="red" offset={-2} disabled={!isHighlighted}>
              <div>{day}</div>
            </Indicator>
          );
        }}
      />
      {(viewScheduleQuery.data?.length ?? 0) > 0 ? (
        <>
          <ScrollArea
            h={opened ? 336 : 168}
            scrollbarSize={2}
            scrollHideDelay={500}
            viewportRef={viewportRef}
          >
            <Flex direction="column" gap="sm">
              {(viewScheduleQuery.data ?? []).slice(0, 1).map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </Flex>

            {(viewScheduleQuery.data ?? []).length > 1 && (
              <Collapse in={opened} mt="sm">
                <Flex direction="column" gap="sm">
                  {(viewScheduleQuery.data ?? []).slice(1).map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </Flex>
              </Collapse>
            )}
          </ScrollArea>

          <Group justify="center" mt="sm">
            <Button
              fullWidth
              variant="transparent"
              rightSection={opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
              onClick={() => setOpened((prev) => !prev)}
            >
              {opened ? 'Thu gọn' : 'Xem thêm'}
            </Button>
          </Group>
        </>
      ) : (
        <Text mt={10} c="dimmed" size="sm" ta="center" pb={8}>
          Chưa có lịch hoạt động sắp tới.
        </Text>
      )}

    </PaperLayout>
  )
}

const ActivityItem = ({ activity }: { activity: any }) => {
  return (
    <Blockquote ml={16} mt={16} key={activity.id} color="blue" p='md' icon={<IconClock />}
      cite={`${utils_date_getHHmm(new Date(activity.startDate))} - ${utils_date_getHHmm(new Date(activity.endDate))} - 
    ${utils_date_dateToDDMMYYYString(new Date(activity.endDate))}`}>
      <Text
        tt="uppercase"
        size="lg"
        fw={500}
      >{activity.subjectName}</Text>
      <Text>Giảng viên: {activity.lecturerName?.filter(Boolean).join(', ')}</Text>
      <Text>Phòng: {activity.addressName}</Text>
    </Blockquote>
  )
}
