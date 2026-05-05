'use client';

import { service_activityPlan } from '@/api/services/service_activityPlan';
import { service_ranking } from '@/api/services/service_ranking';
import { ReportCurrentPlan } from '@/interfaces/ranking';
import useS_Shared_ActivityPlan from '@/shared/features/ActivityPlan/useS_Shared_ActivityPlan';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { Button, Flex, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

interface Props {
    data?: ReportCurrentPlan[];
    facultyId?: number
}

export default function EvaluationScoreboardExport({ data, facultyId }: Props) {
    const disc = useDisclosure(false);
    const [activityType, setActivityType] = useState<string>('1');
    const [isExporting, setIsExporting] = useState(false);

    const activityPlanStore = useS_Shared_ActivityPlan();

    const activityPlanQuery = useCustomReactQuery({
        queryKey: ['activityPlanQuery'],
        axiosFn: () => service_activityPlan.getActivityPlans(),
    });

    const handleActivityTypeChange = (value: string | null) => {
        setActivityType(value || '1');
    };

    const activityTypeOptions = [
        { label: 'Tất cả', value: '1' },
        { label: 'Chỉ hoạt động bắt buộc', value: '2' },
        { label: 'Chỉ hoạt động tùy chọn', value: '3' },
    ];

    const handlePrepareExport = async () => {
        const activityPlanId = activityPlanStore.state.ActivityPlan?.id;

        if (!activityPlanId) {
            notifications.show({
                title: 'Lỗi',
                message: 'Vui lòng chọn năm học học kỳ',
                color: 'red',
            });
            return;
        }

        try {
            setIsExporting(true);
            const payloadActivityPlanId = Number(activityPlanId);
            const payloadActivityType = Number(activityType);


            // UNCOMMENT THIS WHEN API IS READY
            let response;
            if (!data || data.length === 0) {
                response = await service_ranking.StudentRankingInitByStudents({
                    activityPlanId: payloadActivityPlanId,
                    activityType: payloadActivityType,
                    facultyId: facultyId,
                    studentIds: undefined,
                    isPreview: true,
                });
            } else {
                response = await service_ranking.StudentRankingInitByStudents({
                    activityPlanId: payloadActivityPlanId,
                    activityType: payloadActivityType,
                    facultyId: facultyId,
                    studentIds: data.map((item) => item.studentId ?? 0),
                    isPreview: true,
                });
            }

            // Transform API response to export format
            if (response?.data) {
                const transformedData = response.data.data.map((item: any) => {
                    const exportItem: any = {
                        studentName: item.studentName || '',
                        studentCode: item.studentCode || '',
                        class: item.className || '',
                        facultyName: item.facultyName || '',
                        totalPoint: item.totalPoint || 0,
                        rateName: item.rateName || '',
                    };

                    item.activityStudentInfoViewModels?.forEach((standard: any, idx: number) => {
                        exportItem[`standard${idx + 1}`] = standard.maxPoint || 0;
                        exportItem[`standard${idx + 1}Name`] = standard.standardName || '';
                    });

                    return exportItem;
                });

                const maxStandards = Math.max(
                    ...transformedData.map((item) => {
                        const standardKeys = Object.keys(item).filter((key) =>
                            key.startsWith('standard') && !key.endsWith('Name')
                        );
                        return standardKeys.length;
                    })
                );

                const standardColumns = Array.from({ length: maxStandards }, (_, index) => ({
                    header: `Điều ${index + 1}`,
                    fieldName: `standard${index + 1}`,
                    formatFunction: (value: any, row: any) => {
                        return row[`standard${index + 1}`]?.toString() || '0';
                    },
                }));

                const exportConfig = {
                    fields: [
                        { fieldName: 'studentName', header: 'Họ tên' },
                        { fieldName: 'studentCode', header: 'MSSV' },
                        { fieldName: 'class', header: 'Lớp' },
                        { fieldName: 'facultyName', header: 'Khoa' },
                        ...standardColumns,
                        {
                            fieldName: 'totalPoint',
                            header: 'Tổng điểm',
                            formatFunction: (value: any, row: any) => row.totalPoint?.toString() || '0',
                        },
                        {
                            fieldName: 'rateName',
                            header: 'Xếp loại',
                        },
                    ],
                };

                const exportData = transformedData.map((row: any) => {
                    const newRow: any = {};
                    exportConfig.fields.forEach((field: any) => {
                        if (field.formatFunction) {
                            newRow[field.header] = field.formatFunction(row[field.fieldName], row);
                        } else {
                            newRow[field.header] = row[field.fieldName] || '';
                        }
                    });
                    return newRow;
                });

                const headers = exportConfig.fields.map(f => f.header).join(',');
                const rows = exportData.map((row: any) =>
                    exportConfig.fields.map(f => {
                        const value = row[f.header];
                        // Escape commas and quotes in CSV
                        return typeof value === 'string' && (value.includes(',') || value.includes('"'))
                            ? `"${value.replace(/"/g, '""')}"`
                            : value;
                    }).join(',')
                );
                const csv = [headers, ...rows].join('\n');

                const blob = new Blob(['\ufeff' + csv], { type: 'text/xlsx;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', `export đánh giá kết quả rèn luyện của sinh viên.xlsx`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            notifications.show({
                title: 'Thành công',
                message: 'Export dữ liệu thành công',
                color: 'green',
            });

            // Reset and close modal
            setActivityType('1');
            close();
        } catch (error) {
            // Error notification
            notifications.show({
                title: 'Lỗi',
                message: 'Export dữ liệu thất bại. Vui lòng thử lại.',
                color: 'red',
            });
            console.error('Export error:', error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <CustomButtonModal
            buttonProps={{
                actionType: 'export',
            }}
            disclosure={disc}
            modalProps={{
                title: 'Export Dữ liệu',
            }}
        >
            <Stack >
                <CustomSelect
                    w="100%"
                    readOnly
                    disabled
                    isLoading={activityPlanQuery.isLoading}
                    data={
                        (activityPlanQuery.data ?? []).map((p) => ({
                            label: p.name ?? '',
                            value: String(p.id),
                        }))
                    }
                    value={String(activityPlanStore.state.ActivityPlan?.id ?? '')}
                    onChange={() => { }}
                    placeholder="Chọn năm học học kỳ"
                    label="Học kỳ đánh giá"
                    clearable={false}
                    required
                />

                <CustomSelect
                    w="100%"
                    data={activityTypeOptions}
                    value={activityType}
                    onChange={handleActivityTypeChange}
                    label="Loại hoạt động ngoại khóa"
                    clearable={false}
                    required
                />

                <Flex justify="flex-end" gap={10}>
                    <Button variant="default" onClick={disc[1].close} disabled={isExporting}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handlePrepareExport}
                        disabled={!activityPlanStore.state.ActivityPlan?.id}
                        loading={isExporting}
                    >
                        Export
                    </Button>
                </Flex>
            </Stack>
        </CustomButtonModal>
    );
}
