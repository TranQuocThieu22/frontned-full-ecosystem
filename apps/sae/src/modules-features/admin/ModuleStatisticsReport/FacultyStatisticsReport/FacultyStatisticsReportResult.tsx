'use client'
import { Card, Table, Stack, Text, Box, Badge, Group, Divider } from "@mantine/core";
import { IconChartBar } from "@tabler/icons-react";
import { FacultyStatisticsReportRateInfoViewModel } from "./interfaces/IFacultyStatisticsReportViewModel";

export function FacultyStatisticsReportResult({ data }: { data?: FacultyStatisticsReportRateInfoViewModel[] }) {
    if (!data || data.length === 0) {
        return null;
    }

    const colorRateName = {
        'Xuất Sắc': 'green.7',
        'Tốt': 'teal.7',
        'Giỏi': 'blue.7',
        'Khá': 'yellow.7',
        'Trung Bình': 'orange.7',
        'Yếu': 'red.7',
        'Kém': 'dark.7'
    }
    const totalCount = data.reduce((sum, item) => sum + (item.count ?? 0), 0);

    return (
        <Card shadow="md" padding="lg" radius="md" withBorder >
            <Stack gap="md">
                {/* Header */}
                <Box>
                    <Group justify="space-between" align="center">
                        <Group gap="xs">
                            <IconChartBar size={20} color="var(--mantine-color-blue-7)" />
                            <Text size="sm" fw={700} c="blue.7" tt="uppercase">
                                Thống kê xếp loại
                            </Text>
                        </Group>
                        <Badge size="lg" variant="light" color="blue">
                            Tổng: {totalCount}
                        </Badge>
                    </Group>
                    <Divider color="blue.2" mt="xs" />
                </Box>

                {/* Table */}
                <Table
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                    verticalSpacing="sm"
                    style={{
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}
                >
                    <Table.Thead style={{ backgroundColor: 'var(--mantine-color-blue-1)' }}>
                        <Table.Tr>
                            <Table.Th style={{ textAlign: 'center' }}>
                                <Text fw={600} size="sm">Xếp loại</Text>
                            </Table.Th>
                            <Table.Th style={{ textAlign: 'center' }}>
                                <Text fw={600} size="sm">Số lượng</Text>
                            </Table.Th>
                            <Table.Th style={{ textAlign: 'center' }}>
                                <Text fw={600} size="sm">Tỉ lệ</Text>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {data.map((item, index) => {
                            const percentage = totalCount > 0
                                ? ((item.count ?? 0) / totalCount * 100).toFixed(2)
                                : '0.00';

                            return (
                                <Table.Tr key={index}>
                                    <Table.Td style={{ textAlign: 'center' }}>
                                        <Text fw={600} size="sm">{item.rateName}</Text>
                                    </Table.Td>
                                    <Table.Td style={{ textAlign: 'center' }} >
                                        <Text fw={600}>{item.count}</Text>
                                        {/* <Badge size="lg" variant="light" color="blue">
                                            {item.count}
                                        </Badge> */}
                                    </Table.Td>
                                    <Table.Td style={{ textAlign: 'center' }}>
                                        <Group justify="center" gap="xs">
                                            <Text
                                                fw={700}
                                                size="sm"
                                                //  c={colorRateName[item.rateName as keyof typeof colorRateName] || 'gray'}
                                                c='green.7'
                                            >
                                                {percentage}%
                                            </Text>
                                        </Group>
                                    </Table.Td>
                                </Table.Tr>
                            );
                        })}
                    </Table.Tbody>
                </Table>
            </Stack>
        </Card>
    );
}
