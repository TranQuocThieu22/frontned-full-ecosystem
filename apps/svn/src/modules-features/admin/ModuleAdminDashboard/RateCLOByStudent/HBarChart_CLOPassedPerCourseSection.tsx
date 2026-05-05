import { BarChart } from '@mantine/charts';
import { Group, Paper, Select, Text, useMantineColorScheme } from '@mantine/core';

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
                    Tỉ lệ đạt CLO: {item.value}%
                </Text>
            ))}
        </Paper>
    );
}

const data = [
    {
        courseSectionId: 1,
        courseSectionName: 'Lập trình web - N01',
        CLOPassedPercentage: 85
    },
    {
        courseSectionId: 1,
        courseSectionName: 'Lập trình web - N02',
        CLOPassedPercentage: 82
    },
    {
        courseSectionId: 1,
        courseSectionName: 'Lập trình web - N03',
        CLOPassedPercentage: 90
    },
    {
        courseSectionId: 1,
        courseSectionName: 'Lập trình web - N04',
        CLOPassedPercentage: 89
    },
    {
        courseSectionId: 2,
        courseSectionName: 'Cấu trúc dữ liệu và giải thuật - N01',
        CLOPassedPercentage: 78
    },
    {
        courseSectionId: 2,
        courseSectionName: 'Cấu trúc dữ liệu và giải thuật - N02',
        CLOPassedPercentage: 92
    },
    {
        courseSectionId: 2,
        courseSectionName: 'Cấu trúc dữ liệu và giải thuật - N03',
        CLOPassedPercentage: 88
    },
    {
        courseSectionId: 2,
        courseSectionName: 'Cấu trúc dữ liệu và giải thuật - N04',
        CLOPassedPercentage: 75
    },
    {
        courseSectionId: 3,
        courseSectionName: 'Trí tuệ nhân tạo - N01',
        CLOPassedPercentage: 85
    },
    {
        courseSectionId: 3,
        courseSectionName: 'Trí tuệ nhân tạo - N02',
        CLOPassedPercentage: 79
    },
    {
        courseSectionId: 3,
        courseSectionName: 'Trí tuệ nhân tạo - N03',
        CLOPassedPercentage: 83
    },
    {
        courseSectionId: 3,
        courseSectionName: 'Trí tuệ nhân tạo - N04',
        CLOPassedPercentage: 91
    },
    {
        courseSectionId: 4,
        courseSectionName: 'Cơ sở dữ liệu - N01',
        CLOPassedPercentage: 95
    },
    {
        courseSectionId: 4,
        courseSectionName: 'Cơ sở dữ liệu - N02',
        CLOPassedPercentage: 93
    },
    {
        courseSectionId: 4,
        courseSectionName: 'Cơ sở dữ liệu - N03',
        CLOPassedPercentage: 87
    },
    {
        courseSectionId: 4,
        courseSectionName: 'Cơ sở dữ liệu - N04',
        CLOPassedPercentage: 90
    },
    {
        courseSectionId: 5,
        courseSectionName: 'An toàn thông tin - N01',
        CLOPassedPercentage: 87
    },
    {
        courseSectionId: 5,
        courseSectionName: 'An toàn thông tin - N02',
        CLOPassedPercentage: 84
    },
    {
        courseSectionId: 5,
        courseSectionName: 'An toàn thông tin - N03',
        CLOPassedPercentage: 91
    },
    {
        courseSectionId: 5,
        courseSectionName: 'An toàn thông tin - N04',
        CLOPassedPercentage: 86
    },
    {
        courseSectionId: 6,
        courseSectionName: 'Lập trình mobile - N01',
        CLOPassedPercentage: 88
    },
    {
        courseSectionId: 6,
        courseSectionName: 'Lập trình mobile - N02',
        CLOPassedPercentage: 81
    },
    {
        courseSectionId: 6,
        courseSectionName: 'Lập trình mobile - N03',
        CLOPassedPercentage: 85
    },
    {
        courseSectionId: 7,
        courseSectionName: 'Mạng máy tính - N01',
        CLOPassedPercentage: 79
    },
    {
        courseSectionId: 7,
        courseSectionName: 'Mạng máy tính - N02',
        CLOPassedPercentage: 83
    },
    {
        courseSectionId: 7,
        courseSectionName: 'Mạng máy tính - N03',
        CLOPassedPercentage: 77
    },
    {
        courseSectionId: 8,
        courseSectionName: 'Học máy - N01',
        CLOPassedPercentage: 92
    },
    {
        courseSectionId: 8,
        courseSectionName: 'Học máy - N02',
        CLOPassedPercentage: 89
    },
    {
        courseSectionId: 8,
        courseSectionName: 'Học máy - N03',
        CLOPassedPercentage: 94
    },
    {
        courseSectionId: 9,
        courseSectionName: 'Khai phá dữ liệu - N01',
        CLOPassedPercentage: 86
    },
    {
        courseSectionId: 9,
        courseSectionName: 'Khai phá dữ liệu - N02',
        CLOPassedPercentage: 82
    },
    {
        courseSectionId: 9,
        courseSectionName: 'Khai phá dữ liệu - N03',
        CLOPassedPercentage: 88
    },
    {
        courseSectionId: 10,
        courseSectionName: 'Hệ thống thông tin - N01',
        CLOPassedPercentage: 91
    },
    {
        courseSectionId: 10,
        courseSectionName: 'Hệ thống thông tin - N02',
        CLOPassedPercentage: 87
    },
    {
        courseSectionId: 10,
        courseSectionName: 'Hệ thống thông tin - N03',
        CLOPassedPercentage: 89
    },
    {
        courseSectionId: 11,
        courseSectionName: 'Công nghệ phần mềm - N01',
        CLOPassedPercentage: 84
    },
    {
        courseSectionId: 11,
        courseSectionName: 'Công nghệ phần mềm - N02',
        CLOPassedPercentage: 88
    },
    {
        courseSectionId: 11,
        courseSectionName: 'Công nghệ phần mềm - N03',
        CLOPassedPercentage: 82
    },
    {
        courseSectionId: 12,
        courseSectionName: 'Kiểm thử phần mềm - N01',
        CLOPassedPercentage: 93
    },
    {
        courseSectionId: 12,
        courseSectionName: 'Kiểm thử phần mềm - N02',
        CLOPassedPercentage: 90
    },
    {
        courseSectionId: 12,
        courseSectionName: 'Kiểm thử phần mềm - N03',
        CLOPassedPercentage: 95
    },
    {
        courseSectionId: 13,
        courseSectionName: 'Phân tích thiết kế hệ thống - N01',
        CLOPassedPercentage: 80
    },
    {
        courseSectionId: 13,
        courseSectionName: 'Phân tích thiết kế hệ thống - N02',
        CLOPassedPercentage: 85
    },
    {
        courseSectionId: 13,
        courseSectionName: 'Phân tích thiết kế hệ thống - N03',
        CLOPassedPercentage: 78
    },
    {
        courseSectionId: 14,
        courseSectionName: 'Xử lý ngôn ngữ tự nhiên - N01',
        CLOPassedPercentage: 87
    },
    {
        courseSectionId: 14,
        courseSectionName: 'Xử lý ngôn ngữ tự nhiên - N02',
        CLOPassedPercentage: 84
    },
    {
        courseSectionId: 14,
        courseSectionName: 'Xử lý ngôn ngữ tự nhiên - N03',
        CLOPassedPercentage: 89
    },
    {
        courseSectionId: 15,
        courseSectionName: 'Phát triển ứng dụng web nâng cao - N01',
        CLOPassedPercentage: 86
    },
    {
        courseSectionId: 15,
        courseSectionName: 'Phát triển ứng dụng web nâng cao - N02',
        CLOPassedPercentage: 91
    },
    {
        courseSectionId: 15,
        courseSectionName: 'Phát triển ứng dụng web nâng cao - N03',
        CLOPassedPercentage: 83
    }
]

export default function HBarChart_CLOPassedPerCourseSection() {
    const colorTheme = useMantineColorScheme()
    return (
        <Group>
            <Text mb={"2"}>Biểu đồ theo dõi tỷ lệ đạt CLO môn học theo từng khóa</Text>
            <Select
                w={{ base: '100%', md: 300 }}
                mb={"md"}
                data={[
                    { value: '1', label: 'Công nghệ thông tin - K24' },
                    { value: '2', label: 'Công nghệ thông tin - K23' },
                    { value: '3', label: 'Công nghệ thông tin - K22' },
                    { value: '4', label: 'Khoa học máy tính - K24' },
                    { value: '5', label: 'Khoa học máy tính - K23' },
                    { value: '6', label: 'Quản trị kinh doanh - K24' },
                    { value: '7', label: 'Quản trị kinh doanh - K23' },
                    { value: '8', label: 'Kỹ thuật điện - K24' },
                    { value: '9', label: 'Kỹ thuật điện - K23' },
                    { value: '10', label: 'Kỹ thuật cơ khí - K24' },
                    { value: '11', label: 'Kỹ thuật xây dựng - K24' },
                    { value: '12', label: 'Kinh tế học - K24' },
                    { value: '13', label: 'Luật học - K24' },
                    { value: '14', label: 'Tâm lý học - K24' },
                    { value: '15', label: 'Giáo dục học - K24' },
                ]}
                defaultValue="1"
            />
            <BarChart
                h={1500}
                w={"96%"}
                data={data || []}
                dataKey="courseSectionName"
                orientation="vertical"
                yAxisProps={{ width: 220 }}
                xAxisProps={{
                    domain: [0, 100], tickMargin: 15, orientation: 'top',
                    label: {
                        value: 'Tỉ lệ đạt CLO (%)',
                        position: 'top',
                        // fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        fontSize: 14
                    }
                }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                series={[{ name: 'CLOPassedPercentage', color: 'red', label: 'courseSectionName' }]}
                barProps={{
                    label: {
                        position: 'right',
                        value: 'amount',
                        fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        // content: ({ value }) => `${value}%`,
                    },
                }}
                maxBarWidth={20}
                tickLine="x"
                yAxisLabel="Tên nhóm môn học"
                xAxisLabel="Tỉ lệ đạt CLO (%)"
            />
        </Group>
    );
}