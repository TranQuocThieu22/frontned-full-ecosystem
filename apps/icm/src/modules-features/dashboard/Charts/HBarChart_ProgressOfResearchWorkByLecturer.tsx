import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
    { researchWorkId: 1, researchName: 'Học sâu cho nhận dạng hình ảnh', progress: 50 },
    { researchWorkId: 2, researchName: 'Phân tích thị trường cho chiến lược kinh doanh', progress: 75 },
    { researchWorkId: 3, researchName: 'Thuật toán tối ưu trong kỹ thuật điện', progress: 60 },
    { researchWorkId: 4, researchName: 'Hệ thống năng lượng tái tạo', progress: 80 },
    { researchWorkId: 5, researchName: 'Hệ quản trị cơ sở dữ liệu', progress: 90 },
    { researchWorkId: 6, researchName: 'Mạng truyền thông không dây', progress: 70 },
    { researchWorkId: 7, researchName: 'Phát triển phần mềm Agile', progress: 85 },
    { researchWorkId: 8, researchName: 'Xử lý ngôn ngữ tự nhiên', progress: 65 },
    { researchWorkId: 9, researchName: 'Phân tích dự đoán trong tài chính', progress: 55 },
    { researchWorkId: 10, researchName: 'Thiết kế trải nghiệm người dùng', progress: 45 },
    { researchWorkId: 11, researchName: 'Phân tích mối đe dọa an ninh mạng', progress: 75 },
    { researchWorkId: 12, researchName: 'Hạ tầng và dịch vụ đám mây', progress: 80 },
    { researchWorkId: 13, researchName: 'Dữ liệu lớn trong chăm sóc sức khỏe', progress: 70 },
    { researchWorkId: 14, researchName: 'Ứng dụng IoT trong thành phố thông minh', progress: 60 },
    { researchWorkId: 15, researchName: 'Blockchain cho quản lý chuỗi cung ứng', progress: 50 },
    { researchWorkId: 16, researchName: 'Thuật toán máy tính lượng tử', progress: 40 }
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
                    Tiến độ: {item.value}%
                </Text>
            ))}
        </Paper>
    );
}

export default function HBarChart_ProgressOfResearchWorkByLecturer() {
    const colorTheme = useMantineColorScheme()

    return (
        <Group>
            <Text mb={"20"}>Biểu đồ theo dõi tiến độ đề tài đang triển khai trong năm 2024</Text>
            <BarChart
                h={800}
                w={"96%"}
                data={data}
                dataKey="researchName"
                orientation="vertical"
                yAxisProps={{ width: 220 }}
                xAxisProps={{ domain: [0, 100], orientation: 'bottom', tickCount: 11 }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                series={[{ name: 'progress', color: 'blue.6', label: 'researchName' }]}
                barProps={{
                    label: {
                        position: 'right',
                        value: 'amount',
                        fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                    }
                }}
                maxBarWidth={20}
                tickLine="x"
                yAxisLabel="Danh sách đề tài"
                xAxisLabel="Tiến độ hoàn thành (%)"
            />
        </Group>
    );
}