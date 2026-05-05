import { service_dashboard } from "@/api/services/service_dashboard";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CompositeChart } from "@mantine/charts";
import { Center, Paper, Text } from "@mantine/core";
import { useInViewport } from "@mantine/hooks";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";
import { useEffect } from "react";

export default function EventDeployedTrackingCompositeChart() {
    const activityPlanStore = useS_Shared_ActivityPlan();
    const { ref, inViewport } = useInViewport();

    const eventDeployTrackingQuery = useCustomReactQuery({
        queryKey: ["dasboard_event_deploy_tracking", activityPlanStore.state.ActivityPlan?.id],
        axiosFn: () => service_dashboard.eventDeploymentTracking({ activityPlanId: activityPlanStore.state.ActivityPlan?.id }),
        options: {
            enabled: false,
            refetchOnWindowFocus: false,
        },
    });

    useEffect(() => {
        if (
            inViewport &&
            (!eventDeployTrackingQuery.data || eventDeployTrackingQuery.isError) &&
            activityPlanStore.state.ActivityPlan?.id! > 0
        ) {
            eventDeployTrackingQuery.refetch();
        }
    }, [inViewport, activityPlanStore.state.ActivityPlan?.id]);

    const renderLoading = (height: number) => (
        <Center style={{ width: "100%", height, flexDirection: "column", gap: 10 }}>
            <Mirage size="40" speed="1.1" color="#1d8cf8" />
            <Text c="#1d8cf8" fw={600}>Đang tải dữ liệu...</Text>
        </Center>
    );

    return (
        <Paper ref={ref} mt={"md"} p={"24"} pos={"relative"} >
            <Text fz={20} fw={700} mb={"50"}>Biểu đồ theo dõi tiến độ triển khai đến thời điểm hiện tại</Text>
            {eventDeployTrackingQuery.isFetching
                ? renderLoading(300)
                : eventDeployTrackingQuery.data && eventDeployTrackingQuery.data.length > 0
                    ? (
                        <CompositeChart
                            h={300}
                            data={eventDeployTrackingQuery.data?.map(event => ({
                                ...event,
                                date: dateUtils.toDDMMYYYY(event.date),
                            })) || []}
                            dataKey="date"
                            withPointLabels
                            withLegend
                            yAxisLabel="Số lượng hoạt động"
                            xAxisLabel="Thời gian"
                            yAxisProps={{ style: { fontWeight: 700, fontSize: 16 } }}
                            xAxisProps={{ style: { fontWeight: 700, fontSize: 16 } }}
                            tooltipAnimationDuration={200}
                            legendProps={{ verticalAlign: "bottom", height: 50 }}
                            maxBarWidth={30}
                            series={[
                                {
                                    type: "line",
                                    name: "requiredCompletedsCount",
                                    color: "yellow.6",
                                    label: "HĐ bắt buộc đã hoàn thành",
                                },
                                {
                                    type: "line",
                                    name: "requiredRemainedCount",
                                    color: "pink.6",
                                    label: "Các HĐ bắt buộc còn lại",
                                },
                                {
                                    type: "line",
                                    name: "otherCompletedsCount",
                                    color: "cyan.6",
                                    label: "HĐ tuỳ chọn đã hoàn thành",
                                },
                                {
                                    type: "line",
                                    name: "otherRemainedCount",
                                    color: "orange.6",
                                    label: "Các HĐ tuỳ chọn còn lại",
                                },
                            ]}
                            tooltipProps={{
                                content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                            }}
                            lineProps={{
                                isAnimationActive: true,
                                animationDuration: 400,
                            }}
                            curveType="monotone"
                        />
                    )
                    : <Center><Text fs="italic" h={300}>Chưa có dữ liệu</Text></Center>}
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
            <Text fw={500} mb={5}>
                {label}
            </Text>
            {payload.map((item: any) => (
                <Text
                    key={item.name}
                    c={item.color}
                    fw={500}
                    fz="sm">
                    {item.name === "requiredCompletedsCount"
                        ? "HĐ bắt buộc đã hoàn thành"
                        : item.name === "requiredRemainedCount"
                            ? "Các HĐ bắt buộc còn lại"
                            : item.name === "otherCompletedsCount"
                                ? "HĐ tuỳ chọn đã hoàn thành"
                                : "Các HĐ tuỳ chọn còn lại"
                    }: {item.value}
                </Text>
            ))}
        </Paper>
    );
}
