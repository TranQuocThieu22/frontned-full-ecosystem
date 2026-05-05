import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { ITaskDetailReport } from "@/shared/interfaces/task/ITaskDetailReport";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import DateReportingCycleCreateUpdate from "./ImprovementReportingCycleUpdate/DateReportingCycleCreateUpdate";
import {
    DateReportingCycleDelete
} from "./ImprovementReportingCycleUpdate/DateReportingCycleDelete";
import DateReportingCycleDeleteList from "./ImprovementReportingCycleUpdate/DateReportingCycleDeleteList";
import DateReportingCycleExport from "./ImprovementReportingCycleUpdate/DateReportingCycleExport";
import DateReportingCycleImport from "./ImprovementReportingCycleUpdate/DateReportingCycleImport";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";

interface Props {
    taskDetailId?: number
}

export default function ImprovementReportingCycleUpdateButton({ taskDetailId }: Props) {
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

    const columns = useMemo<MRT_ColumnDef<ITaskDetailReport>[]>(
        () => [
            {
                accessorKey: "weaknessCode",
                header: "Mã hạn chế",
                accessorFn: (row) => row.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.code
            },
            {
                accessorKey: "jobCode",
                header: "Mã công việc",
                accessorFn: (row) => row.eaqTaskDetail?.eaqAnalysis?.code
            },
            {
                accessorKey: "jobName",
                header: "Tên công việc",
                size: 500,
                accessorFn: (row) => row.eaqTaskDetail?.eaqAnalysis?.name
            },
            {
                accessorKey: "userCode",
                header: "Mã người dùng",
                accessorFn: (row) => row.eaqTaskDetail?.user?.code
            },
            {
                accessorKey: "assignedPerson",
                header: "Nhân sự phụ trách",
                accessorFn: (row) => row.eaqTaskDetail?.user?.fullName
            },
            {
                accessorKey: "order",
                header: "Lần báo cáo"
            },
            {
                accessorKey: "reportDate",
                header: "Ngày báo cáo",
                accessorFn: (row) => dateUtils.toDDMMYYYY(row.reportDate)
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
                            <DateReportingCycleImport taskDetailId={taskDetailId} />
                            <DateReportingCycleExport
                                table={table}
                                disabled={queryTaskDetailReport.isFetching}
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
};
