import { evaluationCommitteeService } from "@/shared/APIs/evaluationCommitteeService";
import { EnumColorProposalReviewStatus, EnumIconProposalReviewStatus, EnumLabelProposalReviewStatus } from "@/shared/consts/enum/EnumProposalReviewStatus";
import { EnumColorTopicStatus, EnumIconTopicStatus, EnumLabelTopicStatus } from "@/shared/consts/enum/EnumTopicStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomNumberFormatter } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomNumberFormatter";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexRow } from "@aq-fe/core-ui/shared/components/layout/CustomFlexRow";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Center } from "@mantine/core";
import { useMemo } from "react";
import { DisplayEnumBadge } from "../submitMissionReport/DisplayEnumBadge";
import SubmitMissionReportDetailButton from "../submitMissionReport/SubmitMissionReportDetailButton";
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

    const column = useMemo<CustomColumnDef<SRMTopic>[]>(() => [
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
            Cell: ({ row }) => {
                if (!row.original.totalCost || row.original.totalCost === 0) return "";
                return <CustomNumberFormatter value={row.original.totalCost} />;
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
            accessorFn: (row) => (row.status != null ? EnumLabelTopicStatus[row.status as keyof typeof EnumLabelTopicStatus] ?? "" : ""),
            Cell: ({ row }) => (
                <Center>
                    <DisplayEnumBadge
                        enumStatus={row.original.status}
                        enumLabel={EnumLabelTopicStatus}
                        enumColor={EnumColorTopicStatus}
                        enumIcon={EnumIconTopicStatus} />
                </Center>
            )
        }, //
        {
            header: "File thuyết minh",
            accessorKey: "attachmentPath",
            accessorFn: (row) => (row.attachmentPath ? row.attachmentPath : "Không có file"),
            Cell: ({ row }) => {
                if (!row.original.attachmentPath) return "";
                return <Center><CustomButtonViewFileAPI filePath={row.original.attachmentPath} /></Center>;
            }
        },
        {
            header: "Trạng thái duyệt",
            accessorKey: "proposalStatus",
            size: 200,
            accessorFn: (row) => EnumLabelProposalReviewStatus[(row.proposalStatus ?? 1) as keyof typeof EnumLabelProposalReviewStatus] ?? "",
            Cell: ({ row }) => (
                <Center>
                    <DisplayEnumBadge
                        enumStatus={row.original.proposalStatus ?? 1}
                        enumLabel={EnumLabelProposalReviewStatus}
                        enumColor={EnumColorProposalReviewStatus}
                        enumIcon={EnumIconProposalReviewStatus} />
                </Center>
            )
        }, //
        { header: "Nhận xét", accessorKey: "proposalReview" }, //
        {
            header: "Đã gửi thông báo",
            accessorKey: "proposalIsSentMail",
            accessorFn: (row) => (row.proposalIsSentMail ? "Đã gửi thông báo" : "Chưa gửi thông báo"),
            Cell: ({ row }) => <Center><CustomThemeIconSquareCheck checked={row.original.proposalIsSentMail} /></Center>,
        }, //
    ], []);

    return (
        <CustomFieldset title="Danh sách hợp đồng">
            <CustomDataTableAPI
                enableRowNumbers={false}
                enableRowSelection
                enableColumnPinning
                pinningRightColumns={['proposalStatus']}
                query={PresentationApprovalQuery}
                columns={column}
                exportProps={{
                    fileName: "Danh sách phê duyệt thuyết minh"
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
