// import { BarChart } from '@mantine/charts';
// import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';



// interface ChartTooltipProps {
//     label: string;
//     payload: Record<string, any>[] | undefined;
// }

// function ChartTooltip({ label, payload }: ChartTooltipProps) {
//     if (!payload) return null;
//     return (
//         <Paper px="md" py="sm" withBorder shadow="md" radius="md">
//             <Text fw={500} mb={5}>
//                 {label}
//             </Text>
//             {payload.map((item: any) => (
//                 <Text key={item.name} c={"black"} fz="sm">
//                     Tiến độ: {item.value}%
//                 </Text>
//             ))}
//         </Paper>
//     );
// }

// interface ICourseProcess {
//     courseName?: string,
//     courseId?: number,
//     progress?: number
// }

// export default function HBarChart_CourseProgressPercentage({ courseProcessData }: { courseProcessData?: ICourseProcess[] }) {
//     const colorTheme = useMantineColorScheme()

//     const data = courseProcessData?.map(item => ({
//         courseId: item.courseId,
//         courseName: item.courseName,
//         progress: item.progress
//     }))

//     return (
//         <Group>
//             <Text mb={"20"}>Biểu đồ theo dõi tiến độ giảng dạy của lớp</Text>
//             <BarChart
//                 h={800}
//                 w={"96%"}
//                 data={data || []}
//                 dataKey="courseName"
//                 orientation="vertical"
//                 yAxisProps={{ width: 220 }}
//                 xAxisProps={{ domain: [0, 100] }}
//                 tooltipProps={{
//                     content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
//                 }}
//                 series={[{ name: 'progress', color: 'blue.6', label: 'courseName' }]}
//                 barProps={{
//                     label: {
//                         position: 'right',
//                         value: 'amount',
//                         fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
//                         // content: ({ value }) => `${value}%`,
//                     }
//                 }}
//                 maxBarWidth={20}
//                 tickLine="x"
//                 yAxisLabel="Danh sách lớp"
//                 xAxisLabel="Tiến độ hoàn thành (%)"
//             />
//         </Group>
//     );
// }