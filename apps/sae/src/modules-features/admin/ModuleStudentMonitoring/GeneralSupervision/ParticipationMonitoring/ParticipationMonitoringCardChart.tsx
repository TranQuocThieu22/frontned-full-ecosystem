'use client'

import { service_ranking } from '@/api/services/service_ranking';
import { StudentList } from '@/interfaces/account';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { BarChart } from '@mantine/charts';
import { Card, Stack, Text, Box, Divider, Group, Badge, LoadingOverlay, Tooltip } from '@mantine/core';
import { useEffect, useState } from 'react';

interface IChartData {
    "standard": string;
    "Điểm lập kế hoạch": number;
    "Điểm đạt được": number;
    "Điểm tối đa": number;
}

export default function ParticipationMonitoringCardChart({ student }: { student: StudentList }) {
    const [data, setData] = useState<IChartData[]>([]);
    const PLAN_POINT = {
        code: 'blue.4',
        mantine: 'var(--mantine-color-blue-4)'
    }
    const CURRENT_POINT = {
        code: 'violet.4',
        mantine: 'var(--mantine-color-violet-4)'
    }
    const MAX_POINT = {
        code: 'yellow.4',
        mantine: 'var(--mantine-color-yellow-4)'
    }
    const Q_StudentRankingInit = useCustomReactQuery({
        queryKey: ["ParticipationMonitoringCardChart", student?.id],
        axiosFn: () => service_ranking.getStudentRankingInit({
            studentId: student?.id || 0,
            isPreview: true,
        }),
    });

    useEffect(() => {
        const updatedData = Q_StudentRankingInit.data?.activityStudentInfoViewModels
            .sort((a, b) => (a.standardId ?? 0) - (b.standardId ?? 0))
            ?.map((item: any) => {
                const attendedPoints = item?.evidences
                    ?.filter((e: { isApply: boolean }) => e.isApply === true)
                    .reduce((sum: number, e: { point?: number }) => sum + (e.point || 0), 0) || 0;

                return {
                    "standard": `Điều ${item?.standardId}`,
                    "Điểm lập kế hoạch": item?.maxPoint || 0,
                    "Điểm đạt được": attendedPoints,
                    "Điểm tối đa": item?.standardMaxpoint || 0,
                };
            });
        setData(updatedData || []);
    }, [Q_StudentRankingInit.data, student?.id]);

    // Calculate summary statistics
    const summary = {
        totalPlanned: data.reduce((sum, item) => sum + item["Điểm lập kế hoạch"], 0),
        totalAchieved: data.reduce((sum, item) => sum + item["Điểm đạt được"], 0),
        totalMax: data.reduce((sum, item) => sum + item["Điểm tối đa"], 0),
    };
    const achievementRate = summary.totalMax > 0
        ? ((summary.totalAchieved / summary.totalMax) * 100).toFixed(1)
        : 0;

    return (
        <Card shadow="md" padding="lg" radius="md" withBorder style={{ height: '100%', position: 'relative' }}>
            <LoadingOverlay visible={Q_StudentRankingInit.isLoading} />

            <Stack gap="lg">
                {/* Header */}
                <Box>
                    <Group justify="space-between" align="center">
                        <Box>
                            <Text size="xs" tt="uppercase" fw={700} c="blue.7" mb={4}>
                                Biểu đồ thống kê điểm
                            </Text>
                        </Box>
                        <Tooltip label={
                            <>
                                <Text>Điểm đạt được: {summary.totalAchieved} điểm</Text>
                                <Text>Điểm tối đa: {summary.totalMax} điểm</Text>
                            </>
                        } withArrow>
                            <Badge size="lg" variant="light" color="green">
                                {achievementRate}% hoàn thành
                            </Badge>
                        </Tooltip>
                    </Group>
                    <Divider color="blue.2" mt="xs" />
                </Box>

                {/* Legend Summary */}
                <Group justify="space-around" grow>
                    <Box style={{ textAlign: 'center' }}>
                        <Text size="xs" c="dimmed" mb={4}>Lập kế hoạch</Text>
                        <Group justify="center" gap={4}>
                            <Box w={12} h={12} style={{
                                backgroundColor: PLAN_POINT.mantine,
                                borderRadius: '2px'
                            }} />
                            <Text size="lg" fw={700} c={PLAN_POINT.code}>{summary.totalPlanned}</Text>
                        </Group>
                    </Box>

                    <Box style={{ textAlign: 'center' }}>
                        <Text size="xs" c="dimmed" mb={4}>Đạt được</Text>
                        <Group justify="center" gap={4}>
                            <Box w={12} h={12} style={{
                                backgroundColor: CURRENT_POINT.mantine,
                                borderRadius: '2px'
                            }} />
                            <Text size="lg" fw={700} c={CURRENT_POINT.code}>{summary.totalAchieved}</Text>
                        </Group>
                    </Box>

                    <Box style={{ textAlign: 'center' }}>
                        <Text size="xs" c="dimmed" mb={4}>Tối đa</Text>
                        <Group justify="center" gap={4}>
                            <Box w={12} h={12} style={{
                                backgroundColor: MAX_POINT.mantine,
                                borderRadius: '2px'
                            }} />
                            <Text size="lg" fw={700} c={MAX_POINT.code}>{summary.totalMax}</Text>
                        </Group>
                    </Box>
                </Group>

                {/* Chart */}
                {data.length > 0 ? (
                    <Box mt="sm">
                        <BarChart
                            h={280}
                            data={data}
                            dataKey="standard"
                            withLegend
                            legendProps={{
                                verticalAlign: 'bottom',
                                height: 50
                            }}
                            series={[
                                { name: "Điểm lập kế hoạch", color: PLAN_POINT.code },
                                { name: "Điểm đạt được", color: CURRENT_POINT.code },
                                { name: "Điểm tối đa", color: MAX_POINT.code },
                            ]}
                            tickLine="xy"
                            gridAxis="xy"
                            withYAxis
                            withXAxis
                            yAxisProps={{
                                label: { value: 'Điểm', angle: -90, position: 'insideLeft' }
                            }}
                        />
                    </Box>
                ) : (
                    <Box style={{ textAlign: 'center', padding: '40px' }}>
                        <Text size="sm" c="dimmed">Không có dữ liệu để hiển thị</Text>
                    </Box>
                )}
            </Stack>
        </Card >
    );
}
