import { service_dashboard } from '@/api/services/service_dashboard';
import useS_Shared_ActivityPlan from '@/shared/features/ActivityPlan/useS_Shared_ActivityPlan';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { BarChart } from '@mantine/charts';
import { Box, Center, Paper, Text, useMantineColorScheme } from '@mantine/core';
import { useInViewport } from '@mantine/hooks';
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";
import { useEffect } from 'react';

export default function StudentRankPerUnitBarChart({ rankingName }: { rankingName?: string }) {
    const colorTheme = useMantineColorScheme();
    const activityPlanStore = useS_Shared_ActivityPlan();
    const { ref, inViewport } = useInViewport();

    const eventByStandardQuery = useCustomReactQuery({
        queryKey: ["dasboard_student_ranking_count", rankingName, activityPlanStore.state.ActivityPlan?.id],
        axiosFn: () => service_dashboard.studentRankingFacultyCount({
            activityPlanId: activityPlanStore.state.ActivityPlan?.id,
            rankingName: rankingName
        }),
        options: {
            enabled: false,
            refetchOnWindowFocus: false
        }
    });

    useEffect(() => {
        if (
            inViewport &&
            (!eventByStandardQuery.data || eventByStandardQuery.isError) &&
            activityPlanStore.state.ActivityPlan?.id! > 0
        ) {
            eventByStandardQuery.refetch();
        }
    }, [inViewport, activityPlanStore.state.ActivityPlan?.id]);

    const rankingLabel = rankingName?.toLowerCase() || "";

    const renderLoading = () => (
        <Center style={{ width: "100%", height: 560, flexDirection: "column", gap: 10 }}>
            <Mirage size="40" speed="1.1" color="#1d8cf8" />
            <Text c="#1d8cf8" fw={600}>Đang tải dữ liệu...</Text>
        </Center>
    );

    return (
        <Paper ref={ref} mt={"md"} p={'24'} >
            <Text fw={700} fz={20} mb={"20"}>Biểu đồ theo dõi phân bổ sinh viên xếp loại {rankingLabel}</Text>
            {eventByStandardQuery.isFetching
                ? renderLoading()
                : eventByStandardQuery.data && eventByStandardQuery.data.length > 0
                    ? <BarChart
                        h={560}
                        w={"96%"}
                        data={eventByStandardQuery.data || []}
                        dataKey="facultyName"
                        orientation="vertical"
                        yAxisProps={{ width: 220 }}
                        tooltipProps={{
                            content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} rankingLabel={rankingLabel} />,
                        }}
                        tooltipAnimationDuration={200}
                        series={[{ name: 'studentCount', color: '#7a2aa0', label: 'facultyName' }]}
                        barProps={{
                            label: {
                                position: 'right',
                                value: 'amount',
                                fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                            },
                            animationDuration: 200,
                            isAnimationActive: true,
                        }}
                        maxBarWidth={20}
                        tickLine="x"
                        yAxisLabel="Danh sách khoa"
                        xAxisLabel={`Tổng số sinh viên xếp loại ${rankingLabel}`}
                    />
                    : <Box h={560}>
                        <Center h="100%">
                            <Text fs="italic">Chưa có dữ liệu</Text>
                        </Center>
                    </Box>
            }
        </Paper >
    );
}

interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
    rankingLabel: string;
}

function ChartTooltip({ label, payload, rankingLabel }: ChartTooltipProps) {
    if (!payload) return null;
    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            <Text fw={500} mb={5}>
                {label}
            </Text>
            {payload.map((item: any) => (
                <Text key={item.name} c={"black"} fz="sm">
                    Tổng số SV xếp loại {rankingLabel}: {item.value}
                </Text>
            ))}
        </Paper>
    );
}
