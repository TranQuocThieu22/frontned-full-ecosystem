import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { ScheduleChart } from '@/hooks/query-hooks/Dashboard/useQ_Dashboard_GetLecturer';
import { LineChart } from '@mantine/charts';
import { Box, Card, Flex, ScrollArea, Text } from "@mantine/core";
import { useMemo } from 'react';

const colors = ['#4caf50', '#C0C0C0', '#FF9800', '#2196F3', '#9C27B0', '#FF5722', '#673AB7', '#009688', '#795548', '#607D8B'];


interface ICourse {
  id: number;
  name: string;
  scheduleChart: ScheduleChart;
}

interface F_iynoujfptk_CourseListProps {
  readonly courses: ICourse[];

}

export default function F_iynoujfptk_LineChart({ courses }: F_iynoujfptk_CourseListProps) {
  const chartData = useMemo(() => {
    if (!courses || courses.length === 0) return [];

    const dates = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (i + 1));
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
      }).replace(/(\w+) (\d+)/, '$1 $2');
    }).reverse();

    return dates.map((date, index) => {
      const dataPoint: { [key: string]: string | number } = { date };
      courses.forEach((course) => {
        const dayKey = `day${30 - index}Ago` as keyof ScheduleChart;
        dataPoint[course.name] = course.scheduleChart[dayKey];
      });
      return dataPoint;
    });
  }, [courses]);

  const series = useMemo(() => {
    return courses.map((course, index) => ({
      name: course.name,
      color: colors[index % colors.length],
    }));
  }, [courses]);

  if (courses.length === 0) {
    return <Text>Không có dữ liệu để hiển thị</Text>;
  }

  return (
    <MyFlexColumn>
      <Text fw={600} tt="uppercase" fz={{ base: 'sm', sm: 'md', md: 'lg' }} c="dimmed" mb="sm">Lộ trình hoàn thành giảng dạy</Text>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'xs', sm: 'md' }}
        justify="space-between"
        align={{ base: 'center', sm: 'flex-start' }}
        w="100%"
      >
        <Card withBorder p="xs" style={{ width: 'fit-content' }}>
          <ScrollArea type="auto" offsetScrollbars>
            {series.map((serie, index) => (
              <Flex key={index} align="center" gap="xs" mb="xs">
                <Box w={10} h={10} bg={serie.color} style={{ borderRadius: '50%' }} />
                <Text fz={{ base: 'xs', sm: 'sm' }} truncate>
                  {serie.name}
                </Text>
              </Flex>
            ))}
          </ScrollArea>
        </Card>

        <Box style={{ flex: 1, width: '100%', minHeight: '250px' }}>
          <LineChart
            h={{ base: 250, sm: 300 }}
            data={chartData}
            dataKey="date"
            series={series}
            curveType="linear"
            withDots
            tooltipAnimationDuration={200}
          />
        </Box>
      </Flex>
    </MyFlexColumn>
  );
}
