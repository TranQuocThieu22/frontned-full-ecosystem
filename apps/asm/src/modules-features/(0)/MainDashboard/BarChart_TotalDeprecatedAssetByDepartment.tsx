// "use client"
// import { BarChart } from '@mantine/charts';
// import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

// const data = [
//     { status: 'Phòng đào tạo', amount: 84, color: 'cyan.6' },
//     { status: 'Phòng kế toán', amount: 151, color: 'teal.6' },
//     { status: 'Phòng hành chính', amount: 84, color: 'lime.6' },
//     { status: 'Phòng nhân sự', amount: 151, color: 'rgba(173, 78, 148, 1)' },
//     { status: 'Khoa CNTT', amount: 84, color: 'grape.6' },
//     { status: 'Khoa Kinh tế', amount: 151, color: 'indigo.6' },
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
//                 {label}
//             </Text>
//             {payload.map((item: any) => (
//                 <Text key={item.name} c={item.color} fz="sm">
//                     Số lượng: {item.value}
//                 </Text>
//             ))}
//         </Paper>
//     );
// }


// export default function BarChart_TotalDeprecatedAssetByDepartment() {
//     const colorTheme = useMantineColorScheme()
//     return (
//         <>
//             <Group>
//                 <Text mb={"50"}>Biểu đồ theo dõi tài sản hết khấu hao</Text>
//                 <BarChart
//                     h={200}
//                     w={"100%"}
//                     data={data}
//                     dataKey="status"
//                     series={[
//                         { name: 'amount', color: 'color', label: 'Số lượng' }
//                     ]}
//                     tooltipProps={{
//                         content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
//                     }}
//                     yAxisLabel="Số lượng"
//                     yAxisProps={{ width: 64 }}
//                     maxBarWidth={64}
//                     tickLine="y"
//                     barProps={{
//                         label: {
//                             position: 'top',
//                             value: 'amount',
//                             fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
//                         }
//                     }}
//                 />
//             </Group>
//         </>
//     );
// }


import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
    { department: 'Phòng đào tạo', amount: 84 },
    { department: 'Phòng kế toán', amount: 151 },
    { department: 'Phòng hành chính', amount: 84 },
    { department: 'Phòng nhân sự', amount: 151 },
    { department: 'Khoa CNTT', amount: 84 },
    { department: 'Khoa Kinh tế', amount: 151 },
    { department: 'Khoa QTKD', amount: 120 },
    { department: 'Khoa Điện - Điện tử', amount: 95 },
    { department: 'Khoa ngôn ngữ Anh', amount: 110 },
    { department: 'Phòng kỹ thuật', amount: 130 },
    { department: 'Phòng bảo vệ', amount: 75 }
];

interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;
    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            <Text fw={500} mb={5}>
                {label}
            </Text>
            {payload.map((item: any) => (
                <Text key={item.name} c={"black"} fz="sm">
                    Số lượng: {item.value}
                </Text>
            ))}
        </Paper>
    );
}

export default function BarChart_TotalDeprecatedAssetByDepartment() {
    const colorTheme = useMantineColorScheme()

    return (
        <Group>
            <Text mb={"20"}>Biểu đồ theo dõi tài sản hết khấu hao</Text>
            <BarChart
                h={600}
                w={"90%"}
                data={data}
                dataKey="department"
                orientation="vertical"
                yAxisProps={{ width: 160 }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                series={[{ name: 'amount', color: 'blue.6', label: 'department' }]}
                barProps={{
                    label: {
                        position: 'right',
                        value: 'amount',
                        fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        // content: ({ value }) => `${value}%`,
                    }
                }}
                maxBarWidth={20}
                tickLine="x"
                yAxisLabel="Danh sách các đơn vị"
                xAxisLabel="Số lượng"
            />
        </Group>
    );
}