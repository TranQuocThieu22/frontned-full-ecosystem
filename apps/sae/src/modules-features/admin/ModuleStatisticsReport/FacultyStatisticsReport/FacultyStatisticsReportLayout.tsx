'use client'
import { service_faculty } from "@/api/services/service_faculty";
import { service_ranking } from "@/api/services/service_ranking";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { PaginationState } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Stack, Text, Card, Group, Box, Paper, LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";
import { FacultyStatisticsReportResult } from "./FacultyStatisticsReportResult";
import FacultyStatisticsReportTable from "./FacultyStatisticsReportTable";
import { FacultyStatisticsReportChart } from "./FacultyStatisticsReportChart";

export default function FacultyStatisticsReportLayout() {
    const activityPlanStore = useS_Shared_ActivityPlan();
    const paginationState = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 30
    });

    const Q_Faculty = useCustomReactQuery({
        queryKey: ["faculty"],
        axiosFn: () => service_faculty.getAll()
    });

    const facultyState = useState<number | undefined>(0);

    useEffect(() => {
        if (Q_Faculty.data && Q_Faculty.data[0]?.id) {
            facultyState[1](Q_Faculty.data[0].id);
        }
    }, [Q_Faculty.data]);

    const Q_Student_Faculty = useCustomReactQuery({
        queryKey: [
            "FacultyStatisticsReportLayout_ReportByFaculty",
            paginationState[0],
            facultyState[0] || 1,
            activityPlanStore.state.ActivityPlan?.id
        ],
        axiosFn: () => service_ranking.getReportByFaculty({
            facultyId: facultyState[0] || 1,
            activityPlanId: activityPlanStore.state.ActivityPlan?.id,
            pageNumber: paginationState[0].pageIndex + 1,
            pageSize: paginationState[0].pageSize
        }),
        options: {
            enabled: !!facultyState[0],
        },
    });

    return (
        <CustomFlexColumn gap="lg">
            <Stack gap="lg">
                {/* Faculty Selection */}
                <Card shadow="sm" padding="md" radius="md" withBorder>
                    <Group align="center">
                        <Text size="sm" fw={600} style={{ minWidth: '80px' }}>
                            Chọn khoa:
                        </Text>
                        {Q_Faculty.data && (
                            <CustomSelect
                                data={Q_Faculty.data
                                    ?.filter((item) => item.name !== undefined && item.name !== "Toàn Trường")
                                    .map((item) => ({
                                        value: String(item.id),
                                        label: `${item.code} - ${item.name}`
                                    })) || []}
                                placeholder="Chọn Khoa"
                                searchable={true}
                                maxDropdownHeight={400}
                                style={{ flex: 1, maxWidth: '400px' }}
                                clearable={false}
                                value={facultyState[0] ? String(facultyState[0]) : undefined}
                                onChange={(value) => value && facultyState[1](Number(value))}
                            />
                        )}
                    </Group>
                </Card>

                {/* Loading State */}
                {Q_Student_Faculty.isLoading && (
                    <Paper withBorder p="xl" radius="md" style={{ position: 'relative', minHeight: '200px' }}>
                        <LoadingOverlay visible={true} />
                        <Text ta="center" c="dimmed">Đang tải dữ liệu...</Text>
                    </Paper>
                )}

                {/* Error State */}
                {Q_Student_Faculty.isError && (
                    <Paper withBorder p="xl" radius="md" style={{ textAlign: 'center' }}>
                        <Text c="red" fw={500}>Có lỗi xảy ra khi tải dữ liệu</Text>
                    </Paper>
                )}

                {/* Main Content */}
                {Q_Student_Faculty.data && (
                    <Stack gap="lg">
                        {/* Statistics Cards - Side by Side */}
                        <Group align="stretch" style={{ alignItems: 'stretch' }}>
                            <Box style={{ flex: 1, minWidth: 0 }}>
                                <FacultyStatisticsReportResult data={Q_Student_Faculty.data.rateInfo} />
                            </Box>
                            <Box style={{ flex: 1, minWidth: 0 }}>
                                <FacultyStatisticsReportChart data={Q_Student_Faculty.data.rateInfo} />
                            </Box>
                        </Group>

                        {/* Data Table */}
                        <FacultyStatisticsReportTable
                            studentTotalCount={Q_Student_Faculty.data.totalCount}
                            isLoading={Q_Student_Faculty.isLoading}
                            isError={Q_Student_Faculty.isError}
                            rowCount={Q_Student_Faculty.data.totalCount}
                            data={Q_Student_Faculty.data.facultyReportDetails || []}
                            falcutyId={facultyState[0] || 1}
                            pagination={paginationState[0]}
                            onPaginationChange={paginationState[1]}
                        />
                    </Stack>
                )}
            </Stack>
        </CustomFlexColumn >
    );
}
