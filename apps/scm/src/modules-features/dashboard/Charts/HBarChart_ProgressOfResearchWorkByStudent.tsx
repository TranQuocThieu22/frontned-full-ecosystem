import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { Center, Paper, Progress, Text, useMantineColorScheme } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';

const data = [
    { researchWorkId: 1, researchName: 'Nghiên cứu về trí tuệ nhân tạo', progress: 60 },
    { researchWorkId: 2, researchName: 'Ứng dụng IoT trong nông nghiệp', progress: 70 },
    { researchWorkId: 3, researchName: 'Phân tích dữ liệu y tế', progress: 80 },
    { researchWorkId: 4, researchName: 'Phát triển hệ thống an ninh mạng', progress: 90 },
    { researchWorkId: 5, researchName: 'Ứng dụng AI trong giáo dục', progress: 56 },
    { researchWorkId: 6, researchName: 'Nghiên cứu về mạng 5G', progress: 65 },
    { researchWorkId: 7, researchName: 'Phát triển hệ thống quản lý học tập', progress: 75 },
    { researchWorkId: 8, researchName: 'Ứng dụng blockchain trong chuỗi cung ứng', progress: 85 },
    { researchWorkId: 9, researchName: 'Phân tích dữ liệu tài chính', progress: 45 },
    { researchWorkId: 10, researchName: 'Phát triển hệ thống quản lý bệnh viện', progress: 50 },
    { researchWorkId: 11, researchName: 'Nghiên cứu về học máy', progress: 60 },
    { researchWorkId: 12, researchName: 'Ứng dụng IoT trong nhà thông minh', progress: 70 },
    { researchWorkId: 13, researchName: 'Phân tích dữ liệu môi trường', progress: 80 },
    { researchWorkId: 14, researchName: 'Phát triển hệ thống quản lý giao thông', progress: 90 },
    { researchWorkId: 15, researchName: 'Ứng dụng AI trong thương mại điện tử', progress: 55 },
    { researchWorkId: 16, researchName: 'Nghiên cứu về mạng truyền thông', progress: 65 },
    { researchWorkId: 18, researchName: 'Phát triển hệ thống tự động hóa', progress: 65 },
    { researchWorkId: 19, researchName: 'Nghiên cứu về năng lượng mặt trời', progress: 75 },
    { researchWorkId: 20, researchName: 'Phân tích dữ liệu lớn', progress: 85 },
    { researchWorkId: 21, researchName: 'Ứng dụng blockchain trong tài chính', progress: 45 },
    { researchWorkId: 22, researchName: 'Phát triển ứng dụng di động', progress: 50 },
    { researchWorkId: 23, researchName: 'Nghiên cứu về trí tuệ nhân tạo', progress: 60 },
    { researchWorkId: 24, researchName: 'Ứng dụng IoT trong nông nghiệp', progress: 70 },
    { researchWorkId: 25, researchName: 'Phân tích dữ liệu y tế', progress: 80 },
    { researchWorkId: 26, researchName: 'Phát triển hệ thống an ninh mạng', progress: 90 },
    { researchWorkId: 27, researchName: 'Ứng dụng AI trong giáo dục', progress: 56 },
    { researchWorkId: 28, researchName: 'Nghiên cứu về mạng 5G', progress: 65 },
    { researchWorkId: 29, researchName: 'Phát triển hệ thống quản lý học tập', progress: 75 },
    { researchWorkId: 30, researchName: 'Ứng dụng blockchain trong chuỗi cung ứng', progress: 85 },
    { researchWorkId: 31, researchName: 'Phân tích dữ liệu tài chính', progress: 45 },
    { researchWorkId: 32, researchName: 'Phát triển hệ thống quản lý bệnh viện', progress: 50 },
    { researchWorkId: 33, researchName: 'Nghiên cứu về học máy', progress: 60 },
    { researchWorkId: 34, researchName: 'Ứng dụng IoT trong nhà thông minh', progress: 70 },
    { researchWorkId: 35, researchName: 'Phân tích dữ liệu môi trường', progress: 80 },
    { researchWorkId: 36, researchName: 'Phát triển hệ thống quản lý giao thông', progress: 90 },
    { researchWorkId: 37, researchName: 'Ứng dụng AI trong thương mại điện tử', progress: 55 },
    { researchWorkId: 38, researchName: 'Nghiên cứu về mạng truyền thông', progress: 65 },
    { researchWorkId: 39, researchName: 'Phát triển hệ thống quản lý tài sản', progress: 75 },
    { researchWorkId: 40, researchName: 'Ứng dụng blockchain trong y tế', progress: 85 },
    { researchWorkId: 41, researchName: 'Phân tích dữ liệu giáo dục', progress: 45 },
    { researchWorkId: 42, researchName: 'Phát triển hệ thống quản lý nhân sự', progress: 50 },
    { researchWorkId: 43, researchName: 'Nghiên cứu về trí tuệ nhân tạo trong y tế', progress: 60 },
    { researchWorkId: 44, researchName: 'Ứng dụng IoT trong công nghiệp', progress: 70 },
    { researchWorkId: 45, researchName: 'Phân tích dữ liệu kinh doanh', progress: 80 },
    { researchWorkId: 46, researchName: 'Phát triển hệ thống quản lý khách hàng', progress: 90 },
    { researchWorkId: 47, researchName: 'Ứng dụng AI trong tài chính', progress: 55 },
    { researchWorkId: 48, researchName: 'Nghiên cứu về mạng không dây', progress: 65 },
    { researchWorkId: 49, researchName: 'Phát triển hệ thống quản lý dự án', progress: 75 },
    { researchWorkId: 50, researchName: 'Ứng dụng blockchain trong giáo dục', progress: 85 },
    { researchWorkId: 51, researchName: 'Phân tích dữ liệu xã hội', progress: 45 },
    { researchWorkId: 52, researchName: 'Phát triển hệ thống quản lý tài chính', progress: 50 },
    { researchWorkId: 53, researchName: 'Nghiên cứu về học sâu', progress: 60 },
    { researchWorkId: 54, researchName: 'Ứng dụng IoT trong y tế', progress: 70 },
    { researchWorkId: 55, researchName: 'Phân tích dữ liệu năng lượng', progress: 80 },
    { researchWorkId: 56, researchName: 'Phát triển hệ thống quản lý sản xuất', progress: 90 },
    { researchWorkId: 57, researchName: 'Ứng dụng AI trong nông nghiệp', progress: 55 },
    { researchWorkId: 58, researchName: 'Nghiên cứu về mạng máy tính', progress: 65 },
    { researchWorkId: 59, researchName: 'Phát triển hệ thống quản lý vận tải', progress: 75 },
    { researchWorkId: 60, researchName: 'Ứng dụng blockchain trong công nghiệp', progress: 85 },
    { researchWorkId: 61, researchName: 'Phân tích dữ liệu truyền thông', progress: 45 },
    { researchWorkId: 62, researchName: 'Phát triển hệ thống quản lý tài nguyên', progress: 50 },
    { researchWorkId: 63, researchName: 'Nghiên cứu về trí tuệ nhân tạo trong công nghiệp', progress: 60 },
    { researchWorkId: 64, researchName: 'Ứng dụng IoT trong giao thông', progress: 70 },
    { researchWorkId: 65, researchName: 'Phân tích dữ liệu tài nguyên', progress: 80 },
    { researchWorkId: 66, researchName: 'Phát triển hệ thống quản lý năng lượng', progress: 90 }
];

interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
}

interface IResearchWork {
    code: string;
    name: string;
    total: number
    progressPercentage: number;
}

const mockData = [
    { code: 'RW1', name: 'Nghiên cứu về trí tuệ nhân tạo', total: 100, progressPercentage: 60 },
    { code: 'RW2', name: 'Ứng dụng IoT trong nông nghiệp', total: 100, progressPercentage: 70 },
    { code: 'RW3', name: 'Phân tích dữ liệu y tế', total: 100, progressPercentage: 80 },
    { code: 'RW4', name: 'Phát triển hệ thống an ninh mạng', total: 100, progressPercentage: 90 },
    { code: 'RW5', name: 'Ứng dụng AI trong giáo dục', total: 100, progressPercentage: 56 },
    { code: 'RW6', name: 'Nghiên cứu về mạng 5G', total: 100, progressPercentage: 65 },
    { code: 'RW7', name: 'Phát triển hệ thống quản lý học tập', total: 100, progressPercentage: 75 },
    { code: 'RW8', name: 'Ứng dụng blockchain trong chuỗi cung ứng', total: 100, progressPercentage: 85 },
    { code: 'RW9', name: 'Phân tích dữ liệu tài chính', total: 100, progressPercentage: 45 },
    { code: 'RW10', name: 'Phát triển hệ thống quản lý bệnh viện', total: 100, progressPercentage: 50 },
    { code: 'RW11', name: 'Nghiên cứu về học máy', total: 100, progressPercentage: 60 },
    { code: 'RW12', name: 'Ứng dụng IoT trong nhà thông minh', total: 100, progressPercentage: 70 },
    { code: 'RW13', name: 'Phân tích dữ liệu môi trường', total: 100, progressPercentage: 80 },
    { code: 'RW14', name: 'Phát triển hệ thống quản lý giao thông', total: 100, progressPercentage: 90 },
    { code: 'RW15', name: 'Ứng dụng AI trong thương mại điện tử', total: 100, progressPercentage: 55 },
    { code: 'RW16', name: 'Nghiên cứu về mạng truyền thông', total: 100, progressPercentage: 65 },
    { code: 'RW17', name: 'Phát triển hệ thống quản lý tài sản', total: 100, progressPercentage: 75 },
    { code: 'RW18', name: 'Phát triển hệ thống tự động hóa', total: 100, progressPercentage: 65 },
    { code: 'RW19', name: 'Nghiên cứu về năng lượng mặt trời', total: 100, progressPercentage: 75 },
    { code: 'RW20', name: 'Phân tích dữ liệu lớn', total: 100, progressPercentage: 85 },
    { code: 'RW21', name: 'Ứng dụng blockchain trong tài chính', total: 100, progressPercentage: 45 },
    { code: 'RW22', name: 'Phát triển ứng dụng di động', total: 100, progressPercentage: 50 },
    { code: 'RW23', name: 'Nghiên cứu về trí tuệ nhân tạo', total: 100, progressPercentage: 60 },
    { code: 'RW24', name: 'Ứng dụng IoT trong nông nghiệp', total: 100, progressPercentage: 70 },
    { code: 'RW25', name: 'Phân tích dữ liệu y tế', total: 100, progressPercentage: 80 },
    { code: 'RW26', name: 'Phát triển hệ thống an ninh mạng', total: 100, progressPercentage: 90 },
    { code: 'RW27', name: 'Ứng dụng AI trong giáo dục', total: 100, progressPercentage: 56 },
    { code: 'RW28', name: 'Nghiên cứu về mạng 5G', total: 100, progressPercentage: 65 },
    { code: 'RW29', name: 'Phát triển hệ thống quản lý học tập', total: 100, progressPercentage: 75 },
    { code: 'RW30', name: 'Ứng dụng blockchain trong chuỗi cung ứng', total: 100, progressPercentage: 85 },
    { code: 'RW31', name: 'Phân tích dữ liệu tài chính', total: 100, progressPercentage: 45 },
    { code: 'RW32', name: 'Phát triển hệ thống quản lý bệnh viện', total: 100, progressPercentage: 50 },
    { code: 'RW33', name: 'Nghiên cứu về học máy', total: 100, progressPercentage: 60 },
    { code: 'RW34', name: 'Ứng dụng IoT trong nhà thông minh', total: 100, progressPercentage: 70 },
    { code: 'RW35', name: 'Phân tích dữ liệu môi trường', total: 100, progressPercentage: 80 },
    { code: 'RW36', name: 'Phát triển hệ thống quản lý giao thông', total: 100, progressPercentage: 90 },
    { code: 'RW37', name: 'Ứng dụng AI trong thương mại điện tử', total: 100, progressPercentage: 55 },
    { code: 'RW38', name: 'Nghiên cứu về mạng truyền thông', total: 100, progressPercentage: 65 },
    { code: 'RW39', name: 'Phát triển hệ thống quản lý tài sản', total: 100, progressPercentage: 75 },
    { code: 'RW40', name: 'Ứng dụng blockchain trong y tế', total: 100, progressPercentage: 85 },
    { code: 'RW41', name: 'Phân tích dữ liệu giáo dục', total: 100, progressPercentage: 45 },
    { code: 'RW42', name: 'Phát triển hệ thống quản lý nhân sự', total: 100, progressPercentage: 50 },
    { code: 'RW43', name: 'Nghiên cứu về trí tuệ nhân tạo trong y tế', total: 100, progressPercentage: 60 },
    { code: 'RW44', name: 'Ứng dụng IoT trong công nghiệp', total: 100, progressPercentage: 70 },
    { code: 'RW45', name: 'Phân tích dữ liệu kinh doanh', total: 100, progressPercentage: 80 },
    { code: 'RW46', name: 'Phát triển hệ thống quản lý khách hàng', total: 100, progressPercentage: 90 },
    { code: 'RW47', name: 'Ứng dụng AI trong tài chính', total: 100, progressPercentage: 55 },
    { code: 'RW48', name: 'Nghiên cứu về mạng không dây', total: 100, progressPercentage: 65 },
    { code: 'RW49', name: 'Phát triển hệ thống quản lý dự án', total: 100, progressPercentage: 75 },
    { code: 'RW50', name: 'Ứng dụng blockchain trong giáo dục', total: 100, progressPercentage: 85 }
];

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

export default function HBarChart_ProgressOfResearchWorkByStudent() {
    const colorTheme = useMantineColorScheme()

    const totalDisountCode = mockData.reduce((acc, cur) => acc + cur.progressPercentage, 0);

    const columns = useMemo<MRT_ColumnDef<IResearchWork>[]>(
        () => [
            {
                header: "Mã đề tài",
                accessorKey: "code",
                size: 120
            },
            {
                header: "Tên đề tài",
                accessorKey: "name",
                minSize: 200,
                maxSize: 200
            },
            {
                header: "Tiến độ",
                accessorKey: "value",
                accessorFn(originalRow) {
                    return originalRow.progressPercentage;
                },
                Cell: ({ row }) => {
                    return (
                        <>
                            <Center>
                                <Text>Tiến độ thực hiện: <strong>{row.original.progressPercentage} / {row.original.total}%</strong></Text>
                            </Center>
                            <Progress color="yellow" radius="xs" size="lg" value={(row.original.progressPercentage / row.original.total) * 100} />
                        </>
                    )
                },
                minSize: 50,
                maxSize: 50
            }
        ],
        []
    );
    return (
        <MyFlexColumn>
            <Text mb={20}>Tiến độ thực hiện đề tài đang triển khai trong năm 2024</Text>
            {/* <BarChart
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
            /> */}
            <MyDataTable
                renderTopToolbarCustomActions={() => {
                    return (
                        <>
                            <Text fw={650} mt={5}>Tổng số đề tài: 50</Text>
                        </>
                    )
                }}
                exportAble={false}
                data={mockData}
                columns={columns}
                initialState={{
                    columnVisibility: {
                        code: false,
                    },
                    density: "xs",
                    pagination: { pageIndex: 0, pageSize: 5 },
                }}
            />
        </MyFlexColumn>
    );
}