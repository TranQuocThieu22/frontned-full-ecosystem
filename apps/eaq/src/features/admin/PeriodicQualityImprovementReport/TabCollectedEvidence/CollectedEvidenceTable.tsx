import { TaskDetailReportStatusEnum } from "@/shared/constants/enum/TaskDetailReportStatusEnum";
import { IReport } from "@/shared/interfaces/report/IReport";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { Anchor, Center, Text, Tooltip } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { UseQueryResult } from "@tanstack/react-query";
import { useMemo } from "react";
import { const_minListItemWidth, const_notHaveDataYet, MyCustomListColumn } from "../MyCustomListColumn";
import { isNullOrEmptyList } from "../PeriodicQualityImprovementReportFunctions";
import CollectedEvidenceDeleteListButton from "./CollectedEvidenceDeleteListButton";
import CollectedEvidenceExportButton from "./CollectedEvidenceExportButton";
import CollectedEvidenceUpdateModal from "./CollectedEvidenceUpdateModal";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";

interface Props {
    periodicReportQuery: UseQueryResult<ITaskDetail[], Error> & {
        dataCount: number;
        rawData: CustomApiResponse<ITaskDetail[]> | null;
    }
}

export default function CollectedEvidenceTable({ periodicReportQuery }: Props) {

    const collectedEvidencecolumns = useMemo<CustomColumnDef<IReport>[]>(
        () => [
            {
                header: "Mã tiêu chuẩn",
                accessorKey: "eaqTaskDetail.eaqAnalysis.eaqLimitation.eaqCriteria.eaqStandard.code",
            },
            {
                header: "Mã tiêu chí",
                accessorKey: "eaqTaskDetail.eaqAnalysis.eaqLimitation.eaqCriteria.code",
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
                size: columnSizeObject.name,
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
            {
                header: "Tên file",
                accessorKey: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.attachFileName",
                size: columnSizeObject.name,
                accessorFn: (row) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.attachFileName ?? const_notHaveDataYet
                    }

                    return (
                        <MyCustomListColumn
                            data={row.eaqTaskDetail?.eaqTaskDetailEvidences}
                            noDataText={const_notHaveDataYet}
                        >
                            {(item) => item.eaqEvidence?.eaqEvidenceCurrentVersion?.attachFileName}
                        </MyCustomListColumn>
                    )
                },
            },
            {
                header: "File đính kèm",
                accessorKey: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.attachFile",
                size: const_minListItemWidth,
                accessorFn: (row) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        const attachFilePath = row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.attachFilePath;

                        if (!attachFilePath) return const_notHaveDataYet
                        return (<CustomButtonViewFileAPI filePath={attachFilePath} />)
                    }

                    return (<MyCustomListColumn
                        data={row.eaqTaskDetail?.eaqTaskDetailEvidences}
                        noDataText={const_notHaveDataYet}
                    >
                        {(item) => {
                            const attachFilePath = item.eaqEvidence?.eaqEvidenceCurrentVersion?.attachFilePath;
                            return (<CustomButtonViewFileAPI filePath={attachFilePath} />)
                        }}
                    </MyCustomListColumn>
                    )
                },
            },
            {
                header: "Link liên kết",
                accessorKey: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.link",
                accessorFn: (row) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        const link = row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.link;

                        if (!link) return const_notHaveDataYet
                        return (
                            <Anchor href={link} target="_blank">
                                <Text truncate maw={200}>{link}</Text>
                            </Anchor>
                        )
                    }

                    return (
                        <MyCustomListColumn
                            data={row.eaqTaskDetail?.eaqTaskDetailEvidences}
                            noDataText={const_notHaveDataYet}
                        >
                            {(item) => {
                                const link = item.eaqEvidence?.eaqEvidenceCurrentVersion?.link;
                                return link
                                    ? (
                                        <Anchor href={link} target="_blank">
                                            <Text truncate maw={200}>{link}</Text>
                                        </Anchor>
                                    )
                                    : undefined
                            }}
                        </MyCustomListColumn>
                    )
                },
            },
            {
                header: "Số - ngày ban hành",
                accessorKey: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.versionNumberIssueDate",
                size: columnSizeObject.name,
                accessorFn: (row) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.versionNumberIssueDate ?? const_notHaveDataYet
                    }

                    return (<MyCustomListColumn
                        data={row.eaqTaskDetail?.eaqTaskDetailEvidences}
                        noDataText={const_notHaveDataYet}
                    >
                        {(item) => item.eaqEvidence?.eaqEvidenceCurrentVersion?.versionNumberIssueDate}
                    </MyCustomListColumn>
                    )
                },
            },
            {
                header: "Đơn vị ban hành",
                accessorKey: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.department",
                size: columnSizeObject.name,
                accessorFn: (row) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.department?.toString() ?? const_notHaveDataYet
                    }

                    return (<MyCustomListColumn
                        data={row.eaqTaskDetail?.eaqTaskDetailEvidences}
                        noDataText={const_notHaveDataYet}
                    >
                        {(item) => item.eaqEvidence?.eaqEvidenceCurrentVersion?.department?.toString()}
                    </MyCustomListColumn>
                    )
                },
            },
            {
                header: "Hiệu lực từ ngày",
                accessorKey: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.validDate",
                size: const_minListItemWidth,
                accessorFn: (row) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        const validDate = row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.validDate;
                        return validDate ? dateUtils.toDDMMYYYY(validDate) : const_notHaveDataYet
                    }

                    return (
                        <MyCustomListColumn
                            data={row.eaqTaskDetail?.eaqTaskDetailEvidences}
                            noDataText={const_notHaveDataYet}
                        >
                            {(item) => {
                                const validDate = item.eaqEvidence?.eaqEvidenceCurrentVersion?.validDate;
                                return validDate ? dateUtils.toDDMMYYYY(validDate) : undefined;
                            }}
                        </MyCustomListColumn>
                    )
                },
            },
            {
                header: "Hiệu lực đến ngày",
                accessorKey: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.expiredDate",
                size: const_minListItemWidth,
                accessorFn: (row) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        const expiredDate = row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.expiredDate;
                        return expiredDate ? dateUtils.toDDMMYYYY(expiredDate) : const_notHaveDataYet
                    }

                    return (
                        <MyCustomListColumn
                            data={row.eaqTaskDetail?.eaqTaskDetailEvidences}
                            noDataText={const_notHaveDataYet}
                        >
                            {(item) => {
                                const expiredDate = item.eaqEvidence?.eaqEvidenceCurrentVersion?.expiredDate;
                                return expiredDate ? dateUtils.toDDMMYYYY(expiredDate) : undefined;
                            }}
                        </MyCustomListColumn>
                    );
                },
            },
            {
                header: "Ghi chú phiên bản",
                accessorKey: "eaqTaskDetail.eaqTaskDetailEvidences.eaqEvidence.eaqEvidenceCurrentVersion.attachFileDescription",
                size: columnSizeObject.description,
                accessorFn: (row) => {
                    if (isNullOrEmptyList(row.eaqTaskDetail?.eaqTaskDetailEvidences)) {
                        return row.eaqTaskDetail?.eaqEvidence?.eaqEvidenceCurrentVersion?.attachFileDescription ?? const_notHaveDataYet
                    }
                    return (
                        <MyCustomListColumn
                            data={row.eaqTaskDetail?.eaqTaskDetailEvidences}
                            noDataText={const_notHaveDataYet}
                        >
                            {(item) => item.eaqEvidence?.eaqEvidenceCurrentVersion?.attachFileDescription}
                        </MyCustomListColumn>
                    )
                },
            }
        ],
        []
    );

    return (
        <CustomFieldset mt="sm" title="Danh sách minh chứng">
            <CustomDataTable
                isLoading={periodicReportQuery.isLoading}
                isError={periodicReportQuery.isError}
                enableRowSelection
                columns={collectedEvidencecolumns}
                data={periodicReportQuery.data || []}
                renderTopToolbarCustomActions={({ table }) => {
                    // Get selected rows from table of destructured object
                    const selectedRow = table.getSelectedRowModel().rows.flatMap((item) => item.original);

                    return (
                        <>
                            <CollectedEvidenceExportButton table={table} />
                            <CollectedEvidenceDeleteListButton
                                values={selectedRow}
                                resetRowSelection={table.resetRowSelection}
                            />
                        </>);
                }}
                renderRowActions={({ row }) => {
                    if (row.original.reportStatus != TaskDetailReportStatusEnum.IsSubmitted) {
                        return (
                            <Center>
                                <CollectedEvidenceUpdateModal values={row.original} isLoading={periodicReportQuery.isLoading} />
                            </Center>
                        );
                    }
                    return (
                        <Center>
                            <Tooltip label="Đã nộp báo cáo">
                                <CustomButton actionType="update" leftSection={<IconEdit />} disabled>Sửa</CustomButton>
                            </Tooltip>
                        </Center>
                    );
                }}
            />
        </CustomFieldset>
    );
};
