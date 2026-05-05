import { evaluationCommitteeService } from "@/shared/APIs/evaluationCommitteeService";
import { EnumColorProposalReviewStatus, EnumIconProposalReviewStatus, EnumLabelProposalReviewStatus } from "@/shared/consts/enum/EnumProposalReviewStatus";
import { EnumColorTopicStatus, EnumIconTopicStatus, EnumLabelTopicStatus } from "@/shared/consts/enum/EnumTopicStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomNumberFormatter } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomNumberFormatter";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Center } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DisplayEnumBadge } from "../submitMissionReport/DisplayEnumBadge";
import SubmitMissionReportDetailButton from "../submitMissionReport/SubmitMissionReportDetailButton";
import PresentationApprovalExport from "./PresentationApprovalExport";
import PresentationApprovalModal from "./PresentationApprovalModal";

export default function PresentationApprovalTable() {
    const store = useAcademicYearStore();

    const PresentationApprovalQuery = useCustomReactQuery({
        queryKey: ["PresentationApprovalQuery_GetAll", store.state.academicYear?.id],
        axiosFn: () => evaluationCommitteeService.getSRMEvaluationTopicProposal({ AcademicYearId: store.state.academicYear?.id || -1 }),
        options: {
            enabled: !!store.state.academicYear?.id
        }
    });

    const column = useMemo<MRT_ColumnDef<SRMTopic>[]>(() => [
        {
            header: "Mã đăng ký",
            accessorKey: "code",
            size: 150
        }, // 
        {
            header: "Tên đề tài",
            accessorKey: "registerName",
            size: 500
        },
        {
            header: "Thời gian thực hiện",
            accessorKey: "duration",
        },
        {
            header: "Đơn vị chủ trì",
            accessorKey: "hostOrganization",
        },
        {
            header: "Đơn vị quản lý",
            accessorKey: "managingOrganization",
        },
        {
            header: "Tổng kinh phí thực hiện",
            accessorKey: "totalCost",
            accessorFn: (row) => {
                if (!row.totalCost || row.totalCost === 0) return "";
                return <CustomNumberFormatter value={row.totalCost} />
            },
            size: 200
        }, //
        {
            header: "Loại hình đề tài",
            accessorKey: "srmTypeName",
            accessorFn: (row) => row.srmType?.name
        }, //
        { header: "Lĩnh vực", accessorKey: "area", accessorFn: (row) => row.srmArea?.name }, //
        {
            header: "Chủ nhiệm đề tài",
            accessorKey: "SRMTopicLeader",
            size: 300,
            accessorFn: (row) => row.srmTopicMembers
                ?.flatMap((m) => (m.srmTitle?.isLeader ? [m.user?.fullName ?? ""] : []))
                .join(", ") ?? ""
        },
        {
            header: "Tình trạng của đề tài",
            accessorKey: "status",
            size: 350,
            accessorFn: (row) => <Center>
                <DisplayEnumBadge
                    enumStatus={row.status}
                    enumLabel={EnumLabelTopicStatus}
                    enumColor={EnumColorTopicStatus}
                    enumIcon={EnumIconTopicStatus} />
            </Center>
        }, //
        {
            header: "File thuyết minh",
            accessorKey: "attachmentPath",
            accessorFn: (row) => {
                if (!row.attachmentPath) return "";
                return <Center><CustomButtonViewFileAPI filePath={row.attachmentPath} /></Center>
            }
        },
        {
            header: "Trạng thái duyệt",
            accessorKey: "proposalStatus",
            size: 200,
            accessorFn: (row) => <Center>
                <DisplayEnumBadge
                    enumStatus={row.proposalStatus ?? 1}
                    enumLabel={EnumLabelProposalReviewStatus}
                    enumColor={EnumColorProposalReviewStatus}
                    enumIcon={EnumIconProposalReviewStatus} />
            </Center>
        }, //
        { header: "Nhận xét", accessorKey: "proposalReview" }, //
        {
            header: "Đã gửi thông báo",
            accessorKey: "proposalIsSentMail",
            accessorFn: (row) => <Center><CustomThemeIconSquareCheck checked={row.proposalIsSentMail} /></Center>
        }, //
    ], []);

    return (
        <CustomFieldset title="Danh sách hợp đồng">
            <CustomDataTable
                enableRowNumbers={false}
                isError={PresentationApprovalQuery.isError}
                isLoading={PresentationApprovalQuery.isLoading}
                columns={column}
                data={PresentationApprovalQuery.data || []}
                enableRowSelection
                enableColumnPinning
                initialState={{
                    columnPinning: {
                        right: ['proposalStatus'],
                    },

                }}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedData = table.getSelectedRowModel().flatRows.flatMap((item) => item.original) || [];
                    return (
                        <>
                            <PresentationApprovalExport data={
                                selectedData.length > 0 ?
                                    table.getSelectedRowModel().flatRows.flatMap((item) => item.original) :
                                    PresentationApprovalQuery.data ||
                                    []
                            } loading={PresentationApprovalQuery.isFetching} />
                        </>
                    )
                }}
                renderRowActions={({ row }) => (
                    <CustomFlexRow gap="xs">
                        <SubmitMissionReportDetailButton topic={row.original} loading={PresentationApprovalQuery.isFetching} />
                        <PresentationApprovalModal data={row.original} loading={PresentationApprovalQuery.isFetching} />
                    </CustomFlexRow>
                )}
            />
        </CustomFieldset>
    )
}
