import { ITaskDetailReport } from '@/shared/interfaces/task/ITaskDetailReport';
import { service_EAQAnalysis } from '@/shared/APIs/service_EAQAnalysis';
import { useDisclosure } from '@mantine/hooks';
import { useMemo } from 'react';
import DateReportingCycleCreateUpdate from '../ImprovementReportingCycle/ImprovementReportingCycleUpdate/DateReportingCycleCreateUpdate';
import {
    DateReportingCycleDelete
} from '../ImprovementReportingCycle/ImprovementReportingCycleUpdate/DateReportingCycleDelete';
import DateReportingCycleDeleteList from '../ImprovementReportingCycle/ImprovementReportingCycleUpdate/DateReportingCycleDeleteList';
import DateReportingCycleExport from './AssuranceReportingCycleUpdate/DateReportingCycleExport';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomColumnDef, CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { CustomFieldset } from '@aq-fe/core-ui/shared/components/layout/CustomFieldset';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';

interface Props {
    taskDetailId?: number
    requiedmentCode?: string
}

export default function AssuranceReportingCycleUpdate({ taskDetailId, requiedmentCode }: Props) {
    const disc = useDisclosure();

    const queryTaskDetailReport = useCustomReactQuery({
        queryKey: ["task_detail_report_list", taskDetailId],
        axiosFn: () => service_EAQAnalysis.getEAQTaskDetailReportsByEAQTaskDetaiId({
            eaqTaskDetailId: taskDetailId,
        }),
        options: {
            enabled: disc[0]
        }
    });

    const columns = useMemo<CustomColumnDef<ITaskDetailReport>[]>(
        () => [
            {
                accessorKey: "requirementCode",
                header: "Mã yêu cầu",
                accessorFn: (row) => requiedmentCode
            },
            {
                accessorKey: "task.code",
                header: "Mã công việc",
                accessorFn: (row) => row.eaqTaskDetail?.code
            },
            {
                accessorKey: "task.name",
                header: "Tên công việc",
                size: 400,
                accessorFn: (row) => row.eaqTaskDetail?.name
            },
            {
                accessorKey: "accountCode",
                header: "Mã tài khoản",
                accessorFn: (row) => row.eaqTaskDetail?.user?.code
            },
            {
                accessorKey: "affiliatedPerson",
                header: "Nhân sự phụ trách",
                accessorFn: (row) => row.eaqTaskDetail?.user?.fullName
            },
            {
                accessorKey: "order",
                header: "Lần báo cáo",
            },
            {
                accessorKey: "reportDate",
                header: "Ngày báo cáo",
                type: "ddMMyyyy"
            },
        ],
        []
    );

    return (
        <CustomButtonModal

            disclosure={disc}
            isActionIcon
            modalProps={{
                size: "100%",
                title: "Danh sách ngày báo cáo"
            }}
            actionIconProps={{
                toolTipProps: { label: 'Cập nhật' },
                actionType: "update",
            }}
        >
            <CustomFieldset title="Danh sách ngày báo cáo">
                <CustomDataTable
                    isLoading={queryTaskDetailReport.isLoading}
                    isError={queryTaskDetailReport.isError}
                    enableRowSelection
                    columns={columns}
                    data={queryTaskDetailReport.data || []}
                    renderTopToolbarCustomActions={({ table }) => (
                        <>
                            <DateReportingCycleCreateUpdate
                                taskDetailId={taskDetailId}
                                listDataCurrent={queryTaskDetailReport.data}
                                loading={queryTaskDetailReport.isFetching}
                            />
                            <DateReportingCycleExport
                                table={table}
                                disabled={queryTaskDetailReport.isFetching}
                                requiedmentCode={requiedmentCode}
                            />
                            <DateReportingCycleDeleteList
                                table={table}
                                clearSelection={table.resetRowSelection}
                            />
                        </>
                    )}
                    renderRowActions={({ row, table }) => (
                        <CustomCenterFull>
                            <DateReportingCycleCreateUpdate
                                data={row.original}
                                loading={queryTaskDetailReport.isFetching}
                            />
                            <DateReportingCycleDelete
                                data={row.original}
                                clearSelection={table.resetRowSelection}
                                disabled={queryTaskDetailReport.isFetching}
                            />
                        </CustomCenterFull>
                    )}
                />
            </CustomFieldset>
        </CustomButtonModal>
    )
}
