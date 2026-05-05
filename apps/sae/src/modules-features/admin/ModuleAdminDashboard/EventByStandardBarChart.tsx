import { service_dashboard } from "@/api/services/service_dashboard";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { BarChart } from "@mantine/charts";
import { Center, Paper, Text, useMantineColorScheme } from "@mantine/core";
import { useInViewport, useMediaQuery } from "@mantine/hooks";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";
import { useEffect } from "react";

export default function EventByStandardBarChart() {
    const colorTheme = useMantineColorScheme();
    const barSizeResponsive = useMediaQuery("(min-width: 48em)") ? 42 : 18;
    const activityPlanStore = useS_Shared_ActivityPlan();
    const { ref, inViewport } = useInViewport();

    const eventByStandardQuery = useCustomReactQuery({
        queryKey: ["dasboard_standard_count", activityPlanStore.state.ActivityPlan?.id],
        axiosFn: () => service_dashboard.eventByStandardCount({ activityPlanId: activityPlanStore.state.ActivityPlan?.id }),
        options: {
            enabled: false,
            refetchOnWindowFocus: false,
        },
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

    const renderLoading = () => (
        <Center style={{ width: "100%", height: 300, flexDirection: "column", gap: 10 }}>
            <Mirage size="40" speed="1.1" color="#1d8cf8" />
            <Text c="#1d8cf8" fw={600}>Đang tải dữ liệu...</Text>
        </Center>
    );

    return (
        <Paper ref={ref} p={"xl"} mt={"md"} pos={"relative"} radius="xl">
            <Text fw={"bold"} fz={20} mb={"50"}>Biểu đồ theo dõi triển khai hoạt động theo điều</Text>
            {eventByStandardQuery.isFetching
                ? renderLoading()
                : eventByStandardQuery.data && eventByStandardQuery.data.length > 0
                    ? (
                        <BarChart
                            h={300}
                            data={eventByStandardQuery.data || []}
                            dataKey="standardCode"
                            withLegend
                            legendProps={{ verticalAlign: "bottom", height: 50 }}
                            series={[
                                { name: "eventRequiredCount", color: "blue.6", label: "Hoạt động bắt buộc" },
                                { name: "eventNotRequiredCount", color: "yellow.8", label: "Hoạt động tuỳ chọn" },
                            ]}
                            tooltipProps={{
                                content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                            }}
                            tooltipAnimationDuration={400}
                            yAxisLabel="Số lượng hoạt động"
                            tickLine="y"
                            barProps={{
                                label: {
                                    formatter: (value: number) => value,
                                    position: "top",
                                    value: "amount",
                                    fill: colorTheme.colorScheme === "dark" ? "gray" : "black",
                                },
                                animationDuration: 400,
                                isAnimationActive: true,
                            }}

                            barChartProps={{ barSize: barSizeResponsive, barCategoryGap: 20, barGap: 1 }}
                        />
                    )
                    : <Center>
                        <Text fs="italic" h={300}>Chưa có dữ liệu</Text>
                    </Center>}
        </Paper>
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
            <Text fw={360} mb={5}>
                {label}: {payload[0]?.payload.standardName}
            </Text>
            {payload.map((item: any) => (
                <Text key={item.name} c={item.color} fw={500} fz="sm">
                    {item.name === "eventRequiredCount" ? "Hoạt động bắt buộc" : "Hoạt động tuỳ chọn"}: {item.value}
                </Text>
            ))}
        </Paper>
    );
}
