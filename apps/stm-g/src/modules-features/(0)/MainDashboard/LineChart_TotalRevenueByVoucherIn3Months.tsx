// import { LineChart } from '@mantine/charts';
// import { Group, Paper, Text } from '@mantine/core';

// const data = [
//     { month: '09/24', revenue: 69000000 },
//     { month: '10/24', revenue: 206000000 },
//     { month: '11/24', revenue: 842000000 },
// ];

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
// interface ILast3MonthsDiscountRevenue {
//     currentMonthRevenue?: number
//     firstMonthsAgoRevenue?: number,
//     secondMonthsAgoRevenue?: number,
//     thirdMonthsAgoRevenue?: number
// }

// function formatDataFinal({ pass12MonthData }: { pass12MonthData: ILast3MonthsDiscountRevenue }) {
//     const result: { month: string; Quantity?: number }[] = [];
//     const now = new Date();

//     const keys: (keyof ILast3MonthsDiscountRevenue)[] = [
//         // "thirdMonthsAgoRevenue",
//         "secondMonthsAgoRevenue",
//         "firstMonthsAgoRevenue",
//         "currentMonthRevenue"
//     ];

//     for (let i = 0; i < keys.length; i++) {
//         const key = keys[i];
//         const date = new Date(now.getFullYear(), now.getMonth() - (2 - i), 1);
//         const month = (date.getMonth() + 1).toString().padStart(2, '0');
//         const year = date.getFullYear().toString().slice(-2);

//         result.push({
//             month: `${month}/${year}`,
//             Quantity: pass12MonthData[key]
//         });
//     }

//     return result;
// }

// export default function LineChart_TotalRevenueByDiscountIn3Months({ pass12MonthData }: { pass12MonthData: ILast3MonthsDiscountRevenue }) {
//     const data = formatDataFinal({ pass12MonthData })
//     return (
//         <>
//             <Group>
//                 <Text mb={"50"}>Doanh thu sử dụng mã giảm giá 3 tháng qua</Text>
//                 <LineChart
//                     w={"100%"}
//                     h={350}
//                     data={data}
//                     dataKey="month"
//                     series={[
//                         { name: 'Quantity', color: 'indigo.6' },
//                     ]}
//                     tooltipProps={{
//                         content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
//                     }}
//                     curveType="linear"
//                     yAxisLabel="Tổng doanh thu"
//                     tickLine="y"
//                     yAxisProps={{ width: 100, tickFormatter: (value: number) => formatCurrency2(value) }}
//                 />
//             </Group>
//         </>
//     );
// }