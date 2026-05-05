import {
    TaskDetailReportStatusEnumColor,
    TaskDetailReportStatusEnumStatus,
    TaskDetailReportStatusEnumLabel,
    TaskDetailReportStatusEnum
} from "@/shared/constants/enum/TaskDetailReportStatusEnum";
import { IReport } from "@/shared/interfaces/report/IReport";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { Center, Group, Tooltip } from "@mantine/core";
import { IconBrowserCheck, IconEdit } from "@tabler/icons-react";
import { UseQueryResult } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { const_notHaveDataYet, MyCustomListColumn } from "../MyCustomListColumn";
import { isNullOrEmptyList } from "../PeriodicQualityImprovementReportFunctions";
import CompletedTaskDeleteListButton from "./CompletedTaskDeleteListButton";
import CompletedTaskExportButton from "./CompletedTaskExportButton";
import CompletedTaskSubmitButton from "./CompletedTaskSubmitButton";
import CompletedTaskUpdateModal from "./CompletedTaskUpdateModal";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

interface Props {
    periodicReportQuery: UseQueryResult<ITaskDetail[], Error> & {
        dataCount: number;
        rawData: CustomApiResponse<ITaskDetail[]> | null;
    }
}

export default function CompletedTaskTable({ periodicReportQuery }: Props) {

    const completedTaskColumns = useMemo<MRT_ColumnDef<IReport>[]>(
        () => [
            {
                header: "Mã tiêu chí",
                accessorKey: "eaqTaskDetail.eaqAnalysis.eaqLimitation.eaqCriteria.code",
            },
            {
                header: "Tên tiêu chí",
                accessorKey: "eaqTaskDetail.eaqAnalysis.eaqLimitation.eaqCriteria.name",
                size: columnSizeObject.name
            },
            {
                header: "Mã hạn chế",
                accessorKey: "eaqTaskDetail.eaqAnalysis.eaqLimitation.code",
            },
            {
                header: "Mã công việc",
                accessorKey: "eaqTaskDetail.code",
            },
            {
                header: "Tên công việc",
                accessorKey: "eaqTaskDetail.name",
                size: columnSizeObject.name
            },
            {
                header: "Mã minh chứng dự kiến",
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
                header: "Thời hạn",
                accessorKey: "eaqTaskDetail.duration",
            },
            {
                header: "Kết quả dự kiến",
                accessorKey: "eaqTaskDetail.expectedResult",
                size: columnSizeObject.name
            },
            {
                header: "Nhân sự phụ trách",
                accessorKey: "eaqTaskDetail.user.fullName",
            },
            {
                header: "Lần báo cáo",
                accessorKey: "order",
            },
            {
                header: "Ngày hết hạn",
                accessorKey: "reportDate",
                accessorFn: (row) => row.reportDate ? dateUtils.toDDMMYYYY(row.reportDate) : ""
            },
            {
                header: "Trạng thái báo cáo",
                accessorKey: "reportStatus",
                accessorFn: (row) =>
                    <CustomEnumBadge
                        value={row.reportStatus}
                        enumLabel={TaskDetailReportStatusEnumLabel}
                        enumColor={TaskDetailReportStatusEnumColor}
                        enumIcon={TaskDetailReportStatusEnumStatus}
                    />
            },
            {
                header: "Đã nộp",
                accessorKey: "submitted",
                accessorFn: (row) => (
                    <Center>
                        <CustomThemeIconSquareCheck checked={row.reportStatus == TaskDetailReportStatusEnum.IsSubmitted} />
                    </Center>
                )
            },
            {
                header: "Kết quả cải tiến",
                accessorKey: "result",
                size: columnSizeObject.description,
                accessorFn: (row) => <CustomHtmlWrapper html={row.result || ""} />
            },
            {
                header: "Mã minh chứng",
                accessorKey: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.code",
                accessorFn: (row) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.code ?? const_notHaveDataYet
                    }

                    return (
                        <MyCustomListColumn
                            data={row.eaqTaskDetail?.eaqTaskDetailEvidences}
                            noDataText={const_notHaveDataYet}
                        >
                            {(item) => item.eaqEvidence?.code}
                        </MyCustomListColumn>
                    )
                },
            },
            {
                header: "Tên minh chứng",
                accessorKey: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.name",
                size: columnSizeObject.name,
                accessorFn: (row) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.name ?? const_notHaveDataYet
                    }

                    return (
                        <MyCustomListColumn
                            data={row.eaqTaskDetail?.eaqTaskDetailEvidences}
                            noDataText={const_notHaveDataYet}
                        >
                            {(item) => item.eaqEvidence?.name}
                        </MyCustomListColumn>
                    )
                },
            },
        ],
        []
    );

    return (
        <CustomFieldset title="Danh sách minh chứng">
            <CustomDataTable
                isLoading={periodicReportQuery.isLoading}
                isError={periodicReportQuery.isError}
                enableRowSelection
                columns={completedTaskColumns}
                data={periodicReportQuery.data || []}
                renderTopToolbarCustomActions={({ table }) => {
                    // Get selected rows from table of destructured object
                    const selectedRow = table.getSelectedRowModel().rows.map((item) => item.original);

                    return (
                        <Group>
                            <CompletedTaskExportButton table={table} />
                            <CompletedTaskDeleteListButton
                                values={selectedRow}
                                resetRowSelection={table.resetRowSelection}
                            />
                        </Group>
                    );
                }}
                renderRowActions={({ row }) => {
                    if (row.original.reportStatus != TaskDetailReportStatusEnum.IsSubmitted) {
                        return (
                            <Group gap={5} wrap="nowrap">
                                <CompletedTaskSubmitButton values={row.original} />
                                <CompletedTaskUpdateModal values={row.original} />
                            </Group>
                        );
                    } else {
                        return (
                            <Group gap={5} wrap="nowrap" justify="center">
                                <Tooltip label="Đã nộp báo cáo">
                                    <CustomButton actionType="update" leftSection={<IconBrowserCheck />} disabled>Nộp</CustomButton>
                                </Tooltip>
                                <Tooltip label="Đã nộp báo cáo">
                                    <CustomButton actionType="update" leftSection={<IconEdit />} disabled>Sửa</CustomButton>
                                </Tooltip>
                            </Group>
                        );
                    }
                }}
            />
        </CustomFieldset>
    );
};
