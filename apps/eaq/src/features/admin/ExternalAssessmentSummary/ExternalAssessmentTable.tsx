import { service_EAQComment } from '@/shared/APIs/service_EAQComment';
import { service_EAQEvaluationPlan } from '@/shared/APIs/service_EAQEvaluationPlan';
import { IComment } from '@/shared/interfaces/comment/IComment';
import useS_Shared_Filter from '@/shared/stores/useS_Shared_Filter';
import { Group } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import ExternalAssessmentExportButton from './ExternalAssessmentExportButton';
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { commentGroupEnum } from '@/shared/constants/enum/CommentGroupEnum';

export default function ExternalAssessmentTable() {
    const standardSetStore = useS_Shared_Filter();

    const taskDetailQuery = useCustomReactQuery({
        axiosFn: () => service_EAQEvaluationPlan.GetEAQTaskDetailsByEAQPhaseId({
            eaqPhaseId: standardSetStore.state.Phase?.id
        }),
        queryKey: ["GetTaskDetailByPhase", standardSetStore.state.Phase?.id],
        options: {
            enabled: !!standardSetStore.state.Phase
        }
    })

    const externalAssessmentQuery = useCustomReactQuery({
        // axiosFn: () => service_EAQComment.getAll(),
        axiosFn: () => service_EAQComment.GetCommentsByEAQTaskDetailIds(
            {
                eaqTaskDetailIds: taskDetailQuery.data?.map((item: any) => item.id),
                isExternal: true
            }
        ),
        queryKey: ["ExternalAssessmentRead", standardSetStore.state.Phase?.id],
        options: {
            enabled: !!standardSetStore.state.Phase && !!taskDetailQuery.data
        }
    })

    const externalAssessmentColumns = useMemo<MRT_ColumnDef<IComment>[]>(
        () => [
            { header: "Mã tiêu chuẩn", accessorKey: 'eaqSelfAssessment.eaqTaskDetail.eaqCriteria.eaqStandard.code', size: 120 },
            { header: "Mã tiêu chí", accessorKey: 'eaqSelfAssessment.eaqTaskDetail.eaqCriteria.code', size: 120 },
            {
                header: "Nhóm nội dung", accessorKey: 'name', size: 250,
                accessorFn: (row) => {
                    if (!row.selfAssessmentType) return "";
                    return commentGroupEnum[row.selfAssessmentType];
                }
            },
            { header: "Nội dung đề cập", accessorKey: 'content', size: 500 },
            { header: "Nhận xét và yêu cầu hiệu chỉnh", accessorKey: 'commentDetail', size: 500 }
        ], []
    )

    return (
        <CustomFieldset title="Danh sách nhận xét đánh giá ngoài">
            <CustomDataTable
                isLoading={externalAssessmentQuery.isLoading}
                isError={externalAssessmentQuery.isError}
                columns={externalAssessmentColumns || []}
                data={externalAssessmentQuery.data || []}
                enableRowSelection={true}
                enableColumnFilters
                enableRowNumbers
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows = table.getSelectedRowModel().flatRows.map(row => row.original);

                    return (
                        <Group>
                            <ExternalAssessmentExportButton
                                isLoading={externalAssessmentQuery.isFetching}
                                selectedRows={selectedRows}
                                allRows={
                                    externalAssessmentQuery.data || []
                                }
                            />
                        </Group>
                    )
                }}
            />
        </CustomFieldset>
    );
}
