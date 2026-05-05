'use client';
import { service_ranking } from "@/api/services/service_ranking";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Box, Flex, Group, LoadingOverlay, Paper, Stack, Text } from "@mantine/core";
import SchoolStatisticsReportTable from "./SchoolStatisticsReportTable";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { SchoolStatisticsReportResult } from "@/modules-features/admin/ModuleStatisticsReport/SchoolStatisticsReport/SchoolStatisticsReportResult";
import { FacultyStatisticsReportChart } from "@/modules-features/admin/ModuleStatisticsReport/FacultyStatisticsReport/FacultyStatisticsReportChart";
import { SchoolStatisticsReportChart } from "@/modules-features/admin/ModuleStatisticsReport/SchoolStatisticsReport/SchoolStatisticsReportChart";

export default function SchoolStatisticsReportLayout() {
    const activityPlanStore = useS_Shared_ActivityPlan()
    const querySchoolReport = useCustomReactQuery({
        queryKey: ["SchoolStatisticsReportLayout_RankingSchoolReport", activityPlanStore.state.ActivityPlan?.id],
        axiosFn: () => service_ranking.getSchoolReport(activityPlanStore.state.ActivityPlan?.id),
    });

    if (querySchoolReport.isLoading) return <div>Loading...</div>;
    if (querySchoolReport.isError) return <div>Có lỗi xảy ra ....</div>;

    return (
        <CustomFlexColumn>
            {/* Loading State */}
            {querySchoolReport.isLoading && (
                <Paper withBorder p="xl" radius="md" style={{ position: 'relative', minHeight: '200px' }}>
                    <LoadingOverlay visible={true} />
                    <Text ta="center" c="dimmed">Đang tải dữ liệu...</Text>
                </Paper>
            )}

            {/* Error State */}
            {querySchoolReport.isError && (
                <Paper withBorder p="xl" radius="md" style={{ textAlign: 'center' }}>
                    <Text c="red" fw={500}>Có lỗi xảy ra khi tải dữ liệu</Text>
                </Paper>
            )}
            {querySchoolReport.data && (
                <Stack gap="lg">
                    <Group align="stretch" style={{ alignItems: 'stretch' }}>
                        <Box style={{ flex: 1, minWidth: 0 }}>
                            <SchoolStatisticsReportResult data={querySchoolReport.data.rateInfo} />
                        </Box>
                        <Box style={{ flex: 1, minWidth: 0 }}>
                            <SchoolStatisticsReportChart data={querySchoolReport.data.rateInfo} />
                        </Box>
                    </Group>
                    <SchoolStatisticsReportTable data={querySchoolReport.data.facultyReports} />
                </Stack>
            )}

        </CustomFlexColumn>
    );
}
