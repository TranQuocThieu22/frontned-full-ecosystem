"use client";

import { evaluationCommitteeService } from "@/shared/APIs/evaluationCommitteeService";
import { EnumProposalReviewStatus } from "@/shared/consts/enum/EnumProposalReviewStatus";
import { EnumColorTopicStatus, EnumIconTopicStatus, EnumLabelTopicStatus } from "@/shared/consts/enum/EnumTopicStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { DisplayEnumBadge } from "./DisplayEnumBadge";
import SubmitMissionExportButton from "./SubmitMissionExportButton";
import SubmitMissionReportUpdateButton from "./SubmitMissionReportUpdateButton";

export default function SubmitMissionReportTable() {
    const academicStore = useAcademicYearStore();

    const dics = useDisclosure();
    const [dataUpdate, setDataUpdate] = useState<SRMTopic>();

    const topicsQuery = useCustomReactQuery({
        queryKey: ['topic_list', academicStore.state.academicYear?.id],
        axiosFn: () => evaluationCommitteeService.getSRMEvaluationTopicProposal({ AcademicYearId: academicStore.state.academicYear?.id })
    })

    const columns = useMemo<MRT_ColumnDef<SRMTopic>[]>(
        () => [
            { accessorKey: 'code', header: 'Mã đăng ký' },
            { accessorKey: 'registerName', header: 'Tên đề tài', size: 500 },
            {
                accessorKey: 'duration',
                header: 'Thời gian thực hiện',
            },
            {
                accessorKey: 'fromDate',
                header: 'Từ tháng/ năm',
                accessorFn: (row) => dateUtils.toMMYYYY(row.fromDate)
            },
            {
                accessorKey: 'toDate',
                header: 'Đến tháng/ năm',
                accessorFn: (row) => dateUtils.toMMYYYY(row.toDate)
            },
            {
                accessorKey: 'hostOrganization',
                header: 'Đơn vị chủ trì',
                size: 200
            },
            {
                accessorKey: 'managingOrganization',
                header: 'Đơn vị quản lý',
                size: 200
            },
            {
                accessorKey: 'totalCost',
                header: 'Tổng kinh phí thực hiện',
                accessorFn: (row) => currencyUtils.formatWithSuffix(row.totalCost, " VNĐ"),
                size: 200
            },
            {
                accessorKey: 'srmTypeId',
                header: 'Loại hình đề tài',
                accessorFn: (row) => row.srmType?.name
            },
            {
                accessorKey: 'srmAreaId',
                header: 'Lĩnh vực',
                accessorFn: (row) => row.srmArea?.name,
                size: 200
            },
            {
                accessorKey: 'topicLeader',
                header: 'Chủ nhiệm đề tài',
                size: 200,
                accessorFn: (row) => row.srmTopicMembers?.
                    flatMap((m) => (m.srmTitle?.isLeader ? [m.user?.fullName ?? ""] : []))
                    .join(", ") ?? ""
            },
            {
                accessorKey: 'status',
                header: 'Tình trạng của đề tài',
                size: 400,
                Cell: ({ row }) => <Center>
                    <DisplayEnumBadge
                        enumStatus={row.original.status}
                        enumLabel={EnumLabelTopicStatus}
                        enumColor={EnumColorTopicStatus}
                        enumIcon={EnumIconTopicStatus}
                    />
                </Center>
            },
            {
                accessorKey: 'attachmentPath',
                header: 'File thuyết minh',
                size: 200,
                Cell: ({ row }) => <Center><CustomButtonViewFileAPI filePath={row.original.attachmentPath} /></Center>
            },
        ],
        []
    );

    return (
        <>
            <CustomFieldset title="Danh sách thuyết minh đề tài">
                <CustomDataTable
                    isLoading={topicsQuery.isLoading}
                    isError={topicsQuery.isError}
                    enableRowSelection
                    columns={columns}
                    data={topicsQuery.data || []}
                    renderTopToolbarCustomActions={({ table }) => {
                        const dataSelected = table.getSelectedRowModel().flatRows.flatMap((item) => item.original);
                        return (
                            <SubmitMissionExportButton dataSelected={dataSelected?.length > 0 ? dataSelected : topicsQuery.data || []} topicCode={topicsQuery.data?.[0]?.academicYear?.name || ""} />
                        );
                    }}
                    renderRowActions={({ row, table }) => {
                        const status = row.original.proposalStatus;
                        return (
                            <CustomCenterFull>
                                <CustomActionIcon
                                    actionType="update"
                                    disabled={topicsQuery.isFetching || status === EnumProposalReviewStatus.Approved || status === EnumProposalReviewStatus.NotApproved}
                                    onClick={() => {
                                        setDataUpdate(row.original);
                                        dics[1].open();
                                    }}
                                />
                            </CustomCenterFull>
                        );
                    }}
                />
            </CustomFieldset>
            <SubmitMissionReportUpdateButton disclosure={dics} topic={dataUpdate} />
        </>
    );
}
