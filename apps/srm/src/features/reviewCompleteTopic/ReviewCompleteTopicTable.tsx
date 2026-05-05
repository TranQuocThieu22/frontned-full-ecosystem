import { evaluationCommitteeService } from "@/shared/APIs/evaluationCommitteeService";
import { EnumColorProposalReviewStatus, EnumIconProposalReviewStatus, EnumLabelProposalReviewStatus } from "@/shared/consts/enum/EnumProposalReviewStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Center } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DisplayEnumBadge } from "../submitMissionReport/DisplayEnumBadge";
import ApproveButton from "./ApproveButton";
import ReviewCompleteTopicExportButton from "./ReviewCompleteTopicExportButton";

export default function CheckFinalReport() {
    const academicStore = useAcademicYearStore();

    const topicsQuery = useCustomReactQuery({
        queryKey: ['topic_list', academicStore.state.academicYear?.id],
        axiosFn: () => evaluationCommitteeService.getSRMEvaluationTopicProposal({ AcademicYearId: academicStore.state.academicYear?.id })
    })

    const columns = useMemo<MRT_ColumnDef<SRMTopic>[]>(() => [
        {
            accessorKey: "code",
            header: "Mã đăng ký",
        },
        {
            accessorKey: "registerName",
            header: "Tên đề tài",
            size: 600,
        },
        {
            accessorKey: "duration",
            header: "Thời gian thực hiện",
        },
        {
            accessorKey: "fromDate",
            header: "Từ tháng/năm",
            accessorFn: (row) => dateUtils.toMMYYYY(row.fromDate)
        },
        {
            accessorKey: "toDate",
            header: "Đến tháng/năm",
            accessorFn: (row) => dateUtils.toMMYYYY(row.toDate)
        },
        {
            accessorKey: "hostOrganization",
            header: "Đơn vị chủ trì",
        },
        {
            accessorKey: "managingOrganization",
            header: "Đơn vị quản lý",
        },
        {
            accessorKey: "totalCost",
            header: "Tổng kinh phí thực hiện",
            size: 200,
            accessorFn: (row) => currencyUtils.formatWithSuffix(row.totalCost, " VNĐ")
        },
        {
            accessorKey: "typeName",
            header: "Loại đề tài",
            accessorFn: (row) => row.srmType?.name
        },
        {
            accessorKey: "areaName",
            header: "Lĩnh vực",
            accessorFn: (row) => row.srmArea?.name

        },
        {
            accessorKey: "leader",
            header: "Chủ nhiệm đề tài",
            size: 300,
            accessorFn: (row) => row.srmTopicMembers
                ?.flatMap((m) => (m.srmTitle?.isLeader ? [m.user?.fullName ?? ""] : []))
                .join(", ") ?? ""
        },
        {
            accessorKey: "proposalStatus",
            header: "Trạng thái duyệt",
            size: 200,
            accessorFn: (row) =>
                <Center>
                    <DisplayEnumBadge
                        enumStatus={row.proposalStatus || 1}
                        enumLabel={EnumLabelProposalReviewStatus}
                        enumColor={EnumColorProposalReviewStatus}
                        enumIcon={EnumIconProposalReviewStatus}
                    />
                </Center>

        },
        {
            accessorKey: "proposalReview",
            header: "Nhận xét duyệt",
            size: columnSizeObject.description,
        },
        {
            accessorKey: "proposalIsSentMail",
            header: "Gửi thông báo duyệt",
            accessorFn: (row) => <Center><CustomThemeIconSquareCheck checked={row.proposalIsSentMail} /></Center>
        },
        {
            accessorKey: "attachmentPath",
            header: "File thuyết minh hoàn thiện",
            Cell: ({ row }) => <Center><CustomButtonViewFileAPI filePath={row.original.attachmentPath} /></Center>
        },
        {
            accessorKey: "completeStatus",
            header: "Trạng thái kiểm tra hoàn thiện",
            size: 200,
            accessorFn: (row) =>
                <Center>
                    <DisplayEnumBadge
                        enumStatus={row.completeStatus || 1}
                        enumLabel={EnumLabelProposalReviewStatus}
                        enumColor={EnumColorProposalReviewStatus}
                        enumIcon={EnumIconProposalReviewStatus}
                    />
                </Center>

        },
        {
            accessorKey: "completeReview",
            header: "Nhận xét kiểm tra hoàn thiện",
            size: columnSizeObject.description,
        },
        {
            accessorKey: "completeIsSentMail",
            header: "Đã gửi thông báo kiểm tra hoàn thiện",
            accessorFn: (row) => <Center><CustomThemeIconSquareCheck checked={row.completeIsSentMail} /></Center>
        },
    ], []);

    return (
        <CustomFieldset title="Danh sách thuyết minh đề tài" >
            <CustomDataTable
                isLoading={topicsQuery.isLoading}
                isError={topicsQuery.isError}
                enableRowSelection
                initialState={{
                    columnPinning: {
                        right: ['completeStatus'],
                    },
                }}
                enableRowNumbers={false}
                columns={columns}
                data={topicsQuery.data || []}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows = table.getSelectedRowModel().flatRows.map((item) => item.original) || [];
                    return (
                        <ReviewCompleteTopicExportButton
                            dataSelected={selectedRows?.length > 0 ? selectedRows : topicsQuery.data || []}
                            disabled={topicsQuery.isFetching}
                        />
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <CustomCenterFull>
                            <ApproveButton data={row.original} loadingButton={topicsQuery.isFetching} />
                        </CustomCenterFull>
                    )
                }}
            />
        </CustomFieldset>
    )
}