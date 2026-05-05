import {
    TaskDetailReportStatusEnum,
    TaskDetailReportStatusEnumColor,
    TaskDetailReportStatusEnumLabel,
    TaskDetailReportStatusEnumStatus
} from "@/shared/constants/enum/TaskDetailReportStatusEnum";
import { IReport } from "@/shared/interfaces/report/IReport";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Center, Group, Tooltip } from "@mantine/core";
import { IconBrowserCheck, IconEdit } from "@tabler/icons-react";
import { UseQueryResult } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { const_notHaveDataYet, MyCustomListColumn } from "../MyCustomListColumn";
import CompletedTaskDeleteListButton from "./CompletedTaskDeleteListButton";
import CompletedTaskExportButton from "./CompletedTaskExportButton";
import CompletedTaskSubmitButton from "./CompletedTaskSubmitModal";
import CompletedTaskUpdateModal from "./CompletedTaskUpdateModal";

interface Props {
    qualityReportQuery: UseQueryResult<ITaskDetail[], Error> & {
        dataCount: number;
        rawData: CustomApiResponse<ITaskDetail[]> | null;
    }
}

export function CompletedTaskTable({ qualityReportQuery }: Props) {

    const completedTaskColumns = useMemo<MRT_ColumnDef<IReport>[]>(() => [
        {
            header: 'Mã tiêu chuẩn',
            accessorKey: 'eaqTaskDetail.eaqAnalysis.eaqRequirement.eaqCriteria.eaqStandard.code',
        },
        {
            header: 'Mã tiêu chí',
            accessorKey: "eaqTaskDetail.eaqAnalysis.eaqRequirement.eaqCriteria.code",
        },
        {
            header: 'Mã yêu cầu',
            accessorKey: 'eaqTaskDetail.eaqAnalysis.eaqRequirement.code',
        },
        {
            header: 'Tên yêu cầu',
            accessorKey: 'eaqTaskDetail.eaqAnalysis.eaqRequirement.name',
            size: columnSizeObject.name
        },
        {
            header: 'Mã công việc',
            accessorKey: 'eaqTaskDetail.code',
        },
        {
            header: 'Tên công việc',
            accessorKey: 'eaqTaskDetail.name',
            size: columnSizeObject.name
        },
        {
            header: 'Mã minh chứng dự kiến',
            accessorKey: "eaqTaskDetail.eaqTaskDetailEvidences.code",
            accessorFn(row) {
                return <MyCustomListColumn
                    data={row.eaqTaskDetail?.eaqTaskDetailEvidences}
                    noDataText={const_notHaveDataYet}
                >
                    {(item) => item.code}
                </MyCustomListColumn>
            },
        },
        {
            header: "Tên minh chứng dự kiến",
            accessorKey: "eaqTaskDetail.eaqTaskDetailEvidences.name",
            size: columnSizeObject.name,
            accessorFn(row) {
                return <MyCustomListColumn
                    data={row.eaqTaskDetail?.eaqTaskDetailEvidences}
                    noDataText={const_notHaveDataYet}
                >
                    {(item) => item.name}
                </MyCustomListColumn>
            },
        },
        {
            header: 'Tên Đơn vị chủ trì',
            accessorKey: 'eaqTaskDetail.hostUnit.name',
            size: columnSizeObject.name,
        },
        {
            header: 'Nhân sự phụ trách',
            accessorKey: 'eaqTaskDetail.user.fullName',
            size: columnSizeObject.name,
        },
        {
            header: 'Tên đơn vị phối hợp',
            accessorKey: 'eaqTaskDetail.supportUnit',
            size: columnSizeObject.name,
        },
        {
            header: 'Lần báo cáo',
            accessorKey: 'order',
        },
        {
            header: 'Ngày báo cáo',
            accessorKey: 'reportDate',
            accessorFn: (row) => row.reportDate ? dateUtils.toDDMMYYYY(row.reportDate) : ""
        },
        {
            header: 'Trạng thái báo cáo',
            accessorKey: 'reportStatus',
            accessorFn: (row) =>
                <CustomEnumBadge
                    value={row.reportStatus}
                    enumLabel={TaskDetailReportStatusEnumLabel}
                    enumColor={TaskDetailReportStatusEnumColor}
                    enumIcon={TaskDetailReportStatusEnumStatus}
                />
        },
        {
            header: 'Đã nộp',
            accessorKey: 'submitted',
            accessorFn: (row) => (
                <Center>
                    <CustomThemeIconSquareCheck checked={row.reportStatus == TaskDetailReportStatusEnum.IsSubmitted} />
                </Center>
            )
        },
        {
            header: 'Công việc đã thực hiện',
            accessorKey: 'result',
            size: columnSizeObject.description,
            Cell: ({ row }) => (
                <div style={{ whiteSpace: 'pre-wrap' }}>
                    {row.original.result}
                </div>
            )
        }
    ], [qualityReportQuery.data]);

    return (
        <CustomFieldset title="Danh sách công việc cần thực hiện">
            <CustomDataTable
                rowActionSize={250}
                isLoading={qualityReportQuery.isLoading}
                isError={qualityReportQuery.isError}
                enableRowSelection
                enableRowNumbers={false}
                columns={completedTaskColumns}
                data={qualityReportQuery.data || []}
                renderTopToolbarCustomActions={({ table }) => {
                    // Get selected rows from table of destructured object
                    const selectedRows = table.getSelectedRowModel().rows.map((item) => item.original);

                    return (
                        <Group>
                            <CompletedTaskExportButton table={table} />
                            <CompletedTaskDeleteListButton
                                values={selectedRows}
                                resetRowSelection={table.resetRowSelection}
                            />
                        </Group>
                    )
                }}
                renderRowActions={({ row }) => {
                    if (row.original.reportStatus != TaskDetailReportStatusEnum.IsSubmitted) {
                        return (
                            <CustomCenterFull >
                                <CompletedTaskSubmitButton values={row.original} />
                                <CompletedTaskUpdateModal values={row.original} />
                            </CustomCenterFull>
                        );
                    } else {
                        return (
                            <CustomCenterFull >
                                <Tooltip label="Đã nộp báo cáo">
                                    <CustomButton actionType="update" leftSection={<IconBrowserCheck />} disabled>Nộp</CustomButton>
                                </Tooltip>
                                <Tooltip label="Đã nộp báo cáo">
                                    <CustomButton actionType="update" leftSection={<IconEdit />} disabled>Sửa</CustomButton>
                                </Tooltip>
                            </CustomCenterFull>
                        );
                    }
                }}
            />
        </CustomFieldset>
    );
}

