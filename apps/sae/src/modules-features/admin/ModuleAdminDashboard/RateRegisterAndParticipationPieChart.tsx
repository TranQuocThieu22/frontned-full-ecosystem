import { service_dashboard } from "@/api/services/service_dashboard";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { ChartTooltipProps, PieChart } from "@mantine/charts";
import { Center, Grid, Group, Paper, Text } from "@mantine/core";
import { useInViewport } from "@mantine/hooks";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";
import { useEffect, useMemo } from "react";

const colorArr: string[] = ["rgb(42, 84, 161)", "rgb(52, 179, 231)", "rgb(254, 207, 22)", "rgb(246, 164, 23)", "rgb(235, 95, 26)", "rgb(122, 42, 160)"];

export function RateRegisterAndParticipationPieChart() {
    const activityPlanStore = useS_Shared_ActivityPlan();
    const activityPlanId = activityPlanStore.state.ActivityPlan?.id!;
    const { ref, inViewport } = useInViewport();

    const eventPointQuery = useCustomReactQuery({
        queryKey: ["dasboard_event_point", activityPlanId],
        axiosFn: () => service_dashboard.getRegistrationAndParticipationPoint({ activityPlanId }),
        options: { enabled: false, refetchOnWindowFocus: false },
    });

    useEffect(() => {
        if (inViewport && activityPlanId > 0 && (!eventPointQuery.data || eventPointQuery.isError)) {
            eventPointQuery.refetch();
        }
    }, [inViewport, activityPlanId]);

    const fullRegistration = useMemo(
        () =>
            eventPointQuery.data?.registrationPoints?.map((e, indx) => ({
                name: e.rateName ?? "",
                value: e.quantity ?? 0,
                color: colorArr[indx] ?? "gray",
            })) || [],
        [eventPointQuery.data]
    );
    const dataRegistration = useMemo(() => fullRegistration.filter((e) => e.value > 0), [fullRegistration]);

    const fullParticipation = useMemo(
        () =>
            eventPointQuery.data?.participationPoints?.map((e, indx) => ({
                name: e.rateName ?? "",
                value: e.quantity ?? 0,
                color: colorArr[indx] ?? "gray",
            })) || [],
        [eventPointQuery.data]
    );
    const dataParticipation = useMemo(() => fullParticipation.filter((e) => e.value > 0), [fullParticipation]);

    const renderChart = (data: typeof dataRegistration) => (
        <PieChart
            startAngle={90}
            endAngle={-270}
            strokeWidth={1}
            withLabelsLine
            labelsPosition="outside"
            pieProps={{ isAnimationActive: true, animationDuration: 600 }}
            withLabels
            labelsType="percent"
            data={data}
            tooltipDataSource="all"
            tooltipAnimationDuration={300}
            withTooltip
            style={{ width: 360 }}
        />
    );

    const renderCard = (title: string, chartData: typeof dataRegistration, legendData: typeof fullRegistration) => (
        <Paper radius="xl" mt="md" p="24" h={320} pos="relative">
            <Text fz={20} fw={700} mb="20">
                {title}
            </Text>
            {eventPointQuery.isFetching ? (
                <Center style={{ width: "100%", height: 240, flexDirection: "column", gap: 10 }}>
                    <Mirage size="56" speed="1.2" color="#1d8cf8" />
                    <Text c="#1d8cf8" fz="md" fw={600} ta="center">
                        Đang tải dữ liệu...
                    </Text>
                </Center>
            ) : (
                <Grid>
                    <Grid.Col span={{ base: 8, md: 8 }} style={{ display: "flex", justifyContent: "center" }}>
                        <Center style={{ width: 360 }}>{renderChart(chartData)}</Center>
                    </Grid.Col>
                    <Grid.Col pt={40} span={{ base: 4, md: 4 }}>
                        {legendData?.map((item, index) => (
                            <Group key={index} wrap="nowrap">
                                <div
                                    style={{
                                        width: 12,
                                        height: 12,
                                        backgroundColor: item.color,
                                        borderRadius: "50%",
                                        marginRight: 8,
                                    }}
                                ></div>
                                <Text>{item.name}</Text>
                            </Group>
                        ))}
                    </Grid.Col>
                </Grid>
            )}
        </Paper>
    );

    return (
        <Grid ref={ref} w="100%">
            <Grid.Col span={{ base: 12, lg: 6 }}>
                {renderCard("Biểu đồ theo dõi tỉ lệ xếp loại điểm đăng ký", dataRegistration, fullRegistration)}
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 6 }}>
                {renderCard("Biểu đồ theo dõi tỉ lệ xếp loại điểm ghi nhận", dataParticipation, fullParticipation)}
            </Grid.Col>
        </Grid>
    );
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;

    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            <Text fw={500} mb={5}>
                {label}
            </Text>
            {payload.map((item: any) => (
                <Text key={item.name} c={item.color} fw={500} fz="sm">
                    {item.name}: {item.value}
                </Text>
            ))}
        </Paper>
    );
}
