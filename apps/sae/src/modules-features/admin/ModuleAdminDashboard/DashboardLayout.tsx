'use client'
import { service_dashboard } from "@/api/services/service_dashboard";
import AQStatCard from "@/modules-features/admin/ModuleAdminDashboard/AQStatCard";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Grid, SimpleGrid } from "@mantine/core";
import { IconCalendar, IconCalendarStats, IconChecklist, IconUser } from "@tabler/icons-react";
import EventByStandardBarChart from "./EventByStandardBarChart";
import EventDeployedTrackingCompositeChart from "./EventDeployedTrackingCompositeChart";
import { RateRegisterAndParticipationPieChart } from "./RateRegisterAndParticipationPieChart";
import SemesterProgressBar from "./SemesterProgressBar";
import StudentRankPerUnitBarChart from "./StudentRankPerUnitBarChart";
import TopMostAndLeastRegisteredEventBarChart from "./TopMostAndLeastRegisteredEventBarChart";

export default function DashboardLayout() {
    const activityPlanStore = useS_Shared_ActivityPlan();

    const generalInfoQuery = useCustomReactQuery({
        queryKey: ["dasboard_general_info", activityPlanStore.state.ActivityPlan?.id],
        axiosFn: () => service_dashboard.getGeneralInfo({ activityPlanId: activityPlanStore.state.ActivityPlan?.id }),
        options: {
            enabled: activityPlanStore.state.ActivityPlan?.id! > 0,
            refetchOnWindowFocus: false
        }
    });

    return (
        <>
            <SimpleGrid cols={{ base: 1, md: 2, lg: 2, xl: 4 }}>
                <AQStatCard
                    title="Tổng số sinh viên"
                    loading={generalInfoQuery.isFetching}
                    value={String(generalInfoQuery.data?.studentCount ?? 0)}
                    icon={<IconUser opacity="0.3" style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                />
                <AQStatCard
                    title="Hoạt động trong năm"
                    loading={generalInfoQuery.isFetching}
                    value={String(generalInfoQuery.data?.eventYearCount ?? 0)}
                    icon={<IconCalendarStats opacity="0.3" style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                />
                <AQStatCard
                    title="Hoạt động trong học kỳ"
                    loading={generalInfoQuery.isFetching}
                    value={String(generalInfoQuery.data?.eventActivityPlanCount ?? 0)}
                    icon={<IconCalendar opacity="0.3" style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                />
                <AQStatCard
                    title="Hoạt động đã triển khai"
                    loading={generalInfoQuery.isFetching}
                    value={String(generalInfoQuery.data?.eventDeloyedCount ?? 0)}
                    icon={<IconChecklist opacity="0.3" style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                />
            </SimpleGrid>

            <SemesterProgressBar
                startDate={generalInfoQuery.data?.activityPlanInfo?.startDate}
                endDate={generalInfoQuery.data?.activityPlanInfo?.endDate}
                curentDate={generalInfoQuery.data?.activityPlanInfo?.today}
                loading={generalInfoQuery.isFetching}
            />

            <Grid >
                <Grid.Col span={{ base: 12 }}>
                    <EventByStandardBarChart />
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                    <EventDeployedTrackingCompositeChart />
                </Grid.Col>
            </Grid>

            <RateRegisterAndParticipationPieChart />

            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <StudentRankPerUnitBarChart rankingName="Yếu" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <StudentRankPerUnitBarChart rankingName="Kém" />
                </Grid.Col>
            </Grid>

            <TopMostAndLeastRegisteredEventBarChart />
        </>
    )
}
