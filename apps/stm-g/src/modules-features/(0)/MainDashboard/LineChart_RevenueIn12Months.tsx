// import { LineChart } from '@mantine/charts';
// import { Group, Paper, Text } from '@mantine/core';



// interface ChartTooltipProps {
//     label: string;
//     payload: Record<string, any>[] | undefined;
// }

// function ChartTooltip({ label, payload }: ChartTooltipProps) {
//     if (!payload) return null;

//     return (
//         <Paper px="md" py="sm" withBorder shadow="md" radius="md">
//             <Text fw={500} mb={5}>
//                 {isNaN(Date.parse(label)) ? label : new Date(label.replace(/(\d{2})\/(\d{2})/, '20$2-$1')).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
//             </Text>
//             {payload.map((item: any) => (
//                 <Text key={item.name} fz="sm">
//                     Doanh thu: {formatCurrency(item.value)}
//                 </Text>
//             ))}
//         </Paper>
//     );
// }

// let formatCurrency = (value: number): string => {
//     return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
// }

// let formatCurrency2 = (value: number): string => {
//     if (value >= 1000000000) {
//         return `${(value / 1000000000).toFixed(1)} tỷ`;
//     } else if (value >= 1000000) {
//         return `${(value / 1000000).toFixed(1)} tr`;
//     }
//     return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
// }


// interface IPast12MonthsAgoRevenue {
//     currentMonthRevenue?: {
//         courseCode?: string,
//         courseName?: string,
//         revenue?: number
//     },
//     firstMonthAgoRevenue?: {
//         courseCode?: string,
//         courseName?: string,
//         revenue?: number
//     },
//     secondMonthAgoRevenue?: {
//         courseCode?: string,
//         courseName?: string,
//         revenue?: number
//     },
//     thirdMonthAgoRevenue?: {
//         courseCode?: string,
//         courseName?: string,
//         revenue?: number
//     },
//     fourthMonthAgoRevenue?: {
//         courseCode?: string,
//         courseName?: string,
//         revenue?: number
//     },
//     fifthMonthAgoRevenue?: {
//         courseCode?: string,
//         courseName?: string,
//         revenue?: number
//     },
//     sixthMonthAgoRevenue?: {
//         courseCode?: string,
//         courseName?: string,
//         revenue?: number
//     },
//     seventhMonthAgoRevenue?: {
//         courseCode?: string,
//         courseName?: string,
//         revenue?: number
//     },
//     eighthMonthAgoRevenue?: {
//         courseCode?: string,
//         courseName?: string,
//         revenue?: number
//     },
//     ninthMonthAgoRevenue?: {
//         courseCode?: string,
//         courseName?: string,
//         revenue?: number
//     },
//     tenthMonthAgoRevenue?: {
//         courseCode?: string,
//         courseName?: string,
//         revenue?: number
//     },
//     evelenthMonthAgoRevenue?: {
//         courseCode?: string,
//         courseName?: string,
//         revenue?: number
//     },
//     twelfthMonthAgoRevenue?: {
//         courseCode?: string,
//         courseName?: string,
//         revenue?: number
//     },
// }

// function formatDataFinal({ pass12MonthData }: { pass12MonthData: IPast12MonthsAgoRevenue }) {
//     const result: { month: string; revenue?: number }[] = [];
//     const now = new Date();

//     const keys: (keyof IPast12MonthsAgoRevenue)[] = [
//         "twelfthMonthAgoRevenue",
//         "evelenthMonthAgoRevenue",
//         "tenthMonthAgoRevenue",
//         "ninthMonthAgoRevenue",
//         "eighthMonthAgoRevenue",
//         "seventhMonthAgoRevenue",
//         "sixthMonthAgoRevenue",
//         "fifthMonthAgoRevenue",
//         "fourthMonthAgoRevenue",
//         "thirdMonthAgoRevenue",
//         "secondMonthAgoRevenue",
//         "firstMonthAgoRevenue",
//         "currentMonthRevenue",
//     ];

//     for (let i = 0; i < keys.length; i++) {
//         const key = keys[i];
//         const date = new Date(now.getFullYear(), now.getMonth() - (12 - i), 1);
//         const month = (date.getMonth() + 1).toString().padStart(2, '0');
//         const year = date.getFullYear().toString().slice(-2);

//         result.push({
//             month: `${month}/${year}`,
//             revenue: pass12MonthData[key]?.revenue,
//         });
//     }

//     return result;
// }
// export default function LineChart_RevenueIn12Months({ pass12MonthData }: { pass12MonthData: IPast12MonthsAgoRevenue }) {
//     const data = formatDataFinal({ pass12MonthData: pass12MonthData })

//     return (
//         <Group>
//             <Text mb={"50"}>Biểu đồ phân tích doanh thu khóa học 12 tháng qua</Text>
//             <LineChart
//                 w={"100%"}
//                 h={200}
//                 data={data}
//                 dataKey="month"
//                 series={[
//                     { name: 'revenue', color: 'indigo.6' },
//                 ]}
//                 tooltipProps={{
//                     content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
//                 }}
//                 curveType="linear"
//                 yAxisLabel="Tổng doanh thu"
//                 tickLine="y"
//                 yAxisProps={{ width: 64, tickFormatter: (value: number) => formatCurrency2(value) }}
//             />

//         </Group>
//     );
// }