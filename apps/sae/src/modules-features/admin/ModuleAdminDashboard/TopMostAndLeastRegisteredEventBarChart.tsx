import { service_dashboard } from '@/api/services/service_dashboard';
import useS_Shared_ActivityPlan from '@/shared/features/ActivityPlan/useS_Shared_ActivityPlan';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { BarChart } from '@mantine/charts';
import { Center, Grid, Paper, Text, useMantineColorScheme } from '@mantine/core';
import { useInViewport } from '@mantine/hooks';
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";
import { useEffect } from 'react';

export default function TopMostAndLeastRegisteredEventBarChart() {
    const colorTheme = useMantineColorScheme();
    const activityPlanStore = useS_Shared_ActivityPlan();
    const { ref, inViewport } = useInViewport();

    const topEventQuery = useCustomReactQuery({
        queryKey: ["dasboard_top_event", activityPlanStore.state.ActivityPlan?.id],
        axiosFn: () => service_dashboard.getTopMostAndTopLeastRegisteredEvent({
            activityPlanId: activityPlanStore.state.ActivityPlan?.id,
            quantity: 5
        }),
        options: {
            enabled: false,
            refetchOnWindowFocus: false
        }
    });

    useEffect(() => {
        if (
            inViewport &&
            (!topEventQuery.data || topEventQuery.isError) &&
            activityPlanStore.state.ActivityPlan?.id! > 0
        ) {
            topEventQuery.refetch();
        }
    }, [inViewport, activityPlanStore.state.ActivityPlan?.id,]);

    const renderLoading = (height: number) => (
        <Center style={{ width: "100%", height, flexDirection: "column", gap: 10 }}>
            <Mirage size="40" speed="1.1" color="#1d8cf8" />
            <Text c="#1d8cf8" fw={600}>Đang tải dữ liệu...</Text>
        </Center>
    );

    return (
        <Grid ref={ref}>
            <Grid.Col span={{ base: 12 }}>
                <Paper mt={"md"} p={'24'} pos={"relative"}>
                    <Text fz={20} fw={700} mb={"20"}>Biểu đồ theo dõi 5 hoạt động ngoại khóa nhiều người đăng ký nhất</Text>
                    {
                        topEventQuery.isFetching
                            ? renderLoading(300)
                            : topEventQuery.data && topEventQuery.data.topMostRegisteredEvents && topEventQuery.data.topMostRegisteredEvents?.length > 0
                                ? <BarChart
                                    h={300}
                                    w={"96%"}
                                    data={
                                        topEventQuery.data?.topMostRegisteredEvents?.map(e => ({
                                            ...e,
                                            eventName: stripHtml(e.eventName || "")
                                        })) || []
                                    }
                                    dataKey="eventName"
                                    orientation="vertical"
                                    yAxisProps={{ width: 300 }}
                                    tooltipProps={{
                                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                                    }}
                                    tooltipAnimationDuration={200}
                                    series={[{ name: 'registrationCount', color: '#59a89c', label: 'eventName' }]}
                                    barProps={{
                                        label: {
                                            position: 'right',
                                            value: 'amount',
                                            fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                                        },
                                        animationDuration: 600,
                                        isAnimationActive: true,
                                    }}
                                    maxBarWidth={20}
                                    tickLine="x"
                                    yAxisLabel="Số lượng đăng ký"
                                    xAxisLabel="Tên hoạt động ngoại khóa"
                                /> : <Center><Text fs="italic" h={300}>Chưa có dữ liệu</Text></Center>
                    }
                </Paper >
            </Grid.Col >
            <Grid.Col span={{ base: 12 }}>
                <Paper mt={"md"} p={'24'} pos={"relative"}>
                    <Text fz={20} fw={700} mb={"20"}>Biểu đồ theo dõi 5 hoạt động ngoại khóa ít người đăng ký nhất</Text>
                    {
                        topEventQuery.isFetching
                            ? renderLoading(300)
                            : topEventQuery.data && topEventQuery.data.topLeastRegisteredEvents && topEventQuery.data.topLeastRegisteredEvents?.length > 0
                                ?
                                <BarChart
                                    h={300}
                                    w={"96%"}
                                    data={
                                        topEventQuery.data?.topLeastRegisteredEvents?.map(e => ({
                                            ...e,
                                            eventName: stripHtml(e.eventName || "")
                                        })) || []
                                    }
                                    dataKey="eventName"
                                    orientation="vertical"
                                    yAxisProps={{ width: 300 }}
                                    tooltipProps={{
                                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                                    }}
                                    tooltipAnimationDuration={200}
                                    series={[{ name: 'registrationCount', color: '#e02b35', label: 'eventName' }]}
                                    barProps={{
                                        label: {
                                            position: 'right',
                                            value: 'amount',
                                            fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                                        },
                                        animationDuration: 400,
                                        isAnimationActive: true,
                                    }}
                                    maxBarWidth={20}
                                    tickLine="x"
                                    yAxisLabel="Số lượng đăng ký"
                                    xAxisLabel="Tên hoạt động ngoại khóa"
                                />
                                : <Center><Text fs="italic" h={300}>Chưa có dữ liệu</Text></Center>
                    }
                </Paper >
            </Grid.Col >
        </Grid >

    );
}


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
                    Số lượng đăng ký: {item.value}
                </Text>
            ))}
        </Paper>
    );
}

function stripHtml(html: string): string {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, "");
}
