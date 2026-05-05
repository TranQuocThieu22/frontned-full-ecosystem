'use client'
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Box, Card, Stack, Menu, Text, Group, Divider, Badge } from "@mantine/core";
import { IconFileTypeCsv, IconFileTypePng, IconFileTypeSvg, IconMenu2, IconChartPie } from "@tabler/icons-react";
import { saveAs } from "file-saver";
import { useRef } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { SchoolStatisticsReportRateInfoViewModel } from "@/modules-features/admin/ModuleStatisticsReport/SchoolStatisticsReport/interfaces/ISchoolStatisticsReportViewModel";

export function SchoolStatisticsReportChart({ data }: { data?: SchoolStatisticsReportRateInfoViewModel[] }) {
    const chartRef = useRef<HTMLDivElement>(null);
    const permissionStore = usePermissionStore();

    const rateInfo = data?.map((item) => ({
        label: item.rateName,
        value: item.count,
    }));

    const totalCount = data?.reduce((sum, item) => sum + (item.count ?? 0), 0) || 0;

    const downloadAsPNG = () => {
        if (!chartRef.current) return;
        const svgElement = chartRef.current.querySelector("svg");
        if (!svgElement) return;

        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = svgElement.clientWidth;
            canvas.height = svgElement.clientHeight;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                if (blob) {
                    saveAs(blob, "faculty-statistics-chart.png");
                }
                URL.revokeObjectURL(url);
            }, "image/png");
        };
        img.src = url;
    };

    const downloadAsCSV = () => {
        if (!rateInfo) return;
        const headers = ['Xếp loại', 'Số lượng'];
        const csvRows = [
            headers.join(','),
            ...rateInfo.map((item) => [item.label, item.value].join(',')),
        ];
        const csvContent = '\ufeff' + csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `faculty-statistics-${new Date().toISOString()}.csv`);
    };

    const downloadAsSVG = () => {
        if (chartRef.current) {
            const svg = chartRef.current.querySelector('svg');
            if (svg) {
                try {
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                    saveAs(blob, `faculty-statistics-${new Date().toISOString()}.svg`);
                } catch (error) {
                    console.error('Error downloading SVG:', error);
                }
            }
        }
    };

    return (
        <Card shadow="md" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
            <Stack gap="md">
                {/* Header */}
                <Box>
                    <Group justify="space-between" align="center">
                        <Group gap="xs">
                            <IconChartPie size={20} color="var(--mantine-color-green-7)" />
                            <Text size="sm" fw={700} c="green.7" tt="uppercase">
                                Biểu đồ phân bổ
                            </Text>
                        </Group>
                        <Group gap="xs">
                            <Badge size="lg" variant="light" color="green">
                                Tổng: {totalCount}
                            </Badge>
                            {permissionStore.state.currentPermissionPage?.isExport && (
                                <Menu shadow="md" width={200} position="bottom-end">
                                    <Menu.Target>
                                        <CustomButton actionType="default" variant="light" color="blue" size="xs">
                                            <IconMenu2 size={16} />
                                        </CustomButton>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item leftSection={<IconFileTypeSvg size={16} />} onClick={downloadAsSVG}>
                                            Download SVG
                                        </Menu.Item>
                                        <Menu.Item leftSection={<IconFileTypePng size={16} />} onClick={downloadAsPNG}>
                                            Download PNG
                                        </Menu.Item>
                                        <Menu.Item leftSection={<IconFileTypeCsv size={16} />} onClick={downloadAsCSV}>
                                            Download CSV
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            )}
                        </Group>
                    </Group>
                    <Divider color="green.2" mt="xs" />
                </Box>

                {/* Chart */}
                <Box ref={chartRef} style={{ width: '100%', height: '280px' }}>
                    <ResponsiveContainer>
                        <BarChart
                            data={rateInfo}
                            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                            <XAxis
                                dataKey="label"
                                label={{
                                    value: 'Xếp loại',
                                    position: 'insideBottom',
                                    offset: -10,
                                    style: { fontWeight: 600 }
                                }}
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis
                                label={{
                                    value: 'Số lượng',
                                    angle: -90,
                                    position: 'insideLeft',
                                    style: { fontWeight: 600 }
                                }}
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e9ecef',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const value = payload[0]?.value as number;
                                        const percentage = totalCount > 0
                                            ? ((value / totalCount) * 100).toFixed(2)
                                            : '0.00';

                                        return (
                                            <div style={{
                                                padding: '8px 12px',
                                                backgroundColor: 'white',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                            }}>
                                                <p style={{
                                                    margin: 0,
                                                    fontWeight: 600,
                                                    fontSize: '13px',
                                                    marginBottom: '4px'
                                                }}>
                                                    {payload[0]?.payload.label}
                                                </p>
                                                <p style={{
                                                    margin: 0,
                                                    color: 'var(--mantine-color-green-7)',
                                                    fontWeight: 700,
                                                    fontSize: '14px'
                                                }}>
                                                    Số lượng: {value}
                                                </p>
                                                <p style={{
                                                    margin: 0,
                                                    color: 'var(--mantine-color-blue-7)',
                                                    fontWeight: 700,
                                                    fontSize: '14px',
                                                    marginTop: '2px'
                                                }}>
                                                    Tỷ lệ: {percentage}%
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar
                                dataKey="value"
                                fill="var(--mantine-color-green-6)"
                                radius={[8, 8, 0, 0]}
                            >
                                <LabelList
                                    dataKey="value"
                                    position="top"
                                    style={{ fontWeight: 600, fontSize: 12 }}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Stack>
        </Card>
    );
}
