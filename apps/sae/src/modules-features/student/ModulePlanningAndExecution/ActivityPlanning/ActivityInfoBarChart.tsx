import { service_account } from '@/api/services/service_account';
import { service_ranking } from '@/api/services/service_ranking';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { BarChart } from '@mantine/charts';
import { Box, Button, Flex, Group, Menu, Paper, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDownload, IconFileTypeCsv, IconFileTypePng, IconFileTypeSvg } from '@tabler/icons-react';
import saveAs from 'file-saver';
import { useMemo, useRef } from 'react';

export default function ActivityInfoBarChart() {
    const currentUserQuery = useCustomReactQuery({
        queryKey: ["Q_StudentInfo"],
        axiosFn: () => service_account.getCurrentUser()
    });

    const currentUser = useMemo(() => {
        if (!currentUserQuery.data) return {};
        return currentUserQuery.data;
    }, [currentUserQuery.data]);

    // Map data chart
    const Q_StudentRanking = useCustomReactQuery({
        queryKey: ["Q_Chart_StudentRankingInit", currentUser.id],
        axiosFn: () => service_ranking.getStudentRankingInit({
            studentId: currentUser.id ?? 0,
            isPreview: true,
        }),
        options: {
            enabled: !!currentUser.id,
        },
    });


    // Tính toán dataChart dựa trên dữ liệu API
    const dataChart = useMemo(() => {
        if (!Q_StudentRanking.data?.activityStudentInfoViewModels) return [];
        return Q_StudentRanking.data.activityStudentInfoViewModels.map((item, index) => {
            // Tính tổng point từ evidences với isApply: true
            const attended = item.evidences
                .filter((evidence) => evidence.isApply)
                .reduce((sum, evidence) => sum + evidence.point, 0);

            return {
                dieu: `D${index + 1}`,
                registered: item.maxPoint || 0,
                attended: attended || 0,
                max: item.standardMaxpoint || 0,
            };
        });
    }, [Q_StudentRanking.data]);

    // Ref để tham chiếu đến BarChart
    const chartRef = useRef<HTMLDivElement>(null);

    // Hàm tải xuống PNG
    const downloadAsPNG = () => {
        if (chartRef.current) {
            const svg = chartRef.current.querySelector('svg');
            if (svg) {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = svg.clientWidth * 2;
                    canvas.height = svg.clientHeight * 2;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.scale(2, 2);
                    }
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const img = new Image();
                    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));

                    img.onload = () => {
                        ctx?.drawImage(img, 0, 0);
                        canvas.toBlob((blob) => {
                            if (blob) {
                                saveAs(blob, `student-ranking-chart-${new Date().toISOString()}.png`);
                            }
                        }, 'image/png');
                    };
                } catch (error) {
                    notifications.show({
                        message: `Error downloading PNG:${error}`,
                        color: "red",
                    });
                }
            } else {
                notifications.show({
                    message: 'PNG not found in chart',
                    color: "red",
                });
            }
        }
    };

    // Hàm tải xuống SVG
    const downloadAsSVG = () => {
        if (chartRef.current) {
            const svg = chartRef.current.querySelector('svg');
            if (svg) {
                try {
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                    saveAs(blob, `student-ranking-chart-${new Date().toISOString()}.svg`);
                } catch (error) {
                    notifications.show({
                        message: `Error downloading SVG:${error}`,
                        color: "red",
                    });
                }
            } else {
                notifications.show({
                    message: 'SVG not found in chart',
                    color: "red",
                });
            }
        }
    };

    // Hàm tải xuống CSV
    const downloadAsCSV = () => {
        const headers = ['Điều', 'Tổng điểm đăng ký', 'Tổng điểm tham dự', 'Điểm tối đa'];
        const csvRows = [
            headers.join(','), // Dòng tiêu đề
            ...dataChart.map((item) =>
                [
                    item.dieu,
                    item.registered,
                    item.attended,
                    item.max,
                ].join(',')
            ),
        ];
        const csvContent = '\ufeff' + csvRows.join('\n'); // Thêm BOM cho UTF-8
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `student-ranking-chart-${new Date().toISOString()}.csv`);
    };
    return (
        <Paper mt={20} p={10}>
            <Flex
                justify={'space-between'}
                align={'center'}
            >
                <Text fw={700} ml={20}>
                    Biểu đồ
                </Text>
                <Menu shadow="md" width={200} position="bottom-end">
                    <Menu.Target>
                        <Button
                            variant="light"
                            color="blue"
                            size="xs"
                            leftSection={<IconDownload size={16} />}
                        >
                            Tải xuống
                        </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item
                            leftSection={<IconFileTypePng size={16} />}
                            onClick={downloadAsPNG}
                        >
                            Download PNG
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconFileTypeSvg size={16} />}
                            onClick={downloadAsSVG}
                        >
                            Download SVG
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconFileTypeCsv size={16} />}
                            onClick={downloadAsCSV}
                        >
                            Download CSV
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Flex>
            <div ref={chartRef}>
                <Flex mt={10} align="center">
                    {Q_StudentRanking.isLoading ? (
                        <Text>Loading...</Text>
                    ) : Q_StudentRanking.error ? (
                        <Text>Error loading data</Text>
                    ) : (
                        <Box style={{ width: '100%' }}>
                            <BarChart
                                h={350}
                                data={dataChart}
                                dataKey="dieu"
                                series={[
                                    { name: 'registered', label: 'Tổng điểm đăng ký', color: 'rgba(0, 143, 251, 0.85)' },
                                    { name: 'attended', label: 'Tổng điểm tham gia', color: 'rgba(0, 227, 150, 0.85)' },
                                    { name: 'max', label: 'Điểm tối đa', color: 'rgba(254, 176, 25, 0.85)' },
                                ]}
                                withLegend={false}
                                withBarValueLabel
                                valueFormatter={(value) => new Intl.NumberFormat('en-US').format(value)}
                                valueLabelProps={{ position: 'inside', fill: 'white' }}
                                legendProps={{ verticalAlign: 'bottom' }}
                                tooltipProps={{
                                    wrapperStyle: { zIndex: 10 }
                                }}
                                yAxisLabel="Điểm"
                                xAxisLabel="Điều"
                            />
                        </Box>
                    )}
                </Flex>
                <Group mt={5} gap="xl" justify="center">
                    <Group gap="xs">
                        <Box w={12} h={12} bg="rgba(0, 143, 251, 0.85)" />
                        <Text size="sm">Tổng điểm đăng ký</Text>
                    </Group>
                    <Group gap="xs">
                        <Box w={12} h={12} bg="rgba(0, 227, 150, 0.85)" />
                        <Text size="sm">Tổng điểm tham dự</Text>
                    </Group>
                    <Group gap="xs">
                        <Box w={12} h={12} bg="rgba(254, 176, 25, 0.85)" />
                        <Text size="sm">Điểm tối đa</Text>
                    </Group>
                </Group>
            </div>
        </Paper>
    )
}
