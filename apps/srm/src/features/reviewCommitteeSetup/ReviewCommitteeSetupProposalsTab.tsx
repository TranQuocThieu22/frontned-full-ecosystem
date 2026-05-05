import { taskProposalService } from "@/shared/APIs/taskProposalService";
import { EnumIconProposalStatus, EnumProposalStatusColors, EnumProposalStatusLabels } from "@/shared/consts/enum/EnumProposalStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMReviewProposal } from "@/shared/interfaces/SRMReviewProposal";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import CustomTableSelect from "@aq-fe/core-ui/shared/components/withAPI/CustomTableSelect";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { useMemo } from "react";

export default function ReviewCommitteeSetupProposalsTab({
    values,
    onChange
}: {
    values: SRMReviewProposal[],
    onChange: (values: SRMReviewProposal[]) => void
}) {
    const academicStore = useAcademicYearStore();
    const proposalsQuery = useCustomReactQuery({
        queryKey: ['proposals'],
        axiosFn: () => taskProposalService.getProposalToCouncil({
            AcademicYearId: academicStore.state.academicYear?.id || 0,
        }),
    })
    const relationColumns = useMemo<CustomColumnDef<SRMReviewProposal>[]>(() => [
        {
            header: "Mã đề xuất",
            accessorKey: "srmTaskProposal.code",
            accessorFn: (row) => row.srmTaskProposal?.code ?? ""
        },
        {
            header: "Tên đề tài",
            accessorKey: "srmTaskProposal.name",
            size: 300,
            accessorFn: (row) => row.srmTaskProposal?.name ?? ""
        },
        {
            header: 'Lĩnh vực',
            accessorKey: 'srmTaskProposal.srmResearchArea.name',
            accessorFn: (row) => row.srmTaskProposal?.srmArea?.name ?? ""
        },
        {
            header: "Mã viên chức",
            accessorKey: "srmTaskProposal.user.code",
            accessorFn: (row) => row.srmTaskProposal?.user?.code ?? ""
        },
        {
            header: "Tên viên chức",
            accessorKey: "srmTaskProposal.user.fullName",
            accessorFn: (row) => row.srmTaskProposal?.user?.fullName ?? ""
        },
    ], []);
    const childrenColumns = useMemo<CustomColumnDef<SRMTaskProposal>[]>(() => [
        {
            header: "Mã đề xuất",
            accessorKey: "code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "name",
            size: 300
        },
        {
            header: 'Lĩnh vực',
            accessorKey: 'srmResearchArea.name',
            accessorFn: (row) => row.srmArea?.name ?? ""
        },
        {
            header: "Mã viên chức đăng ký",
            accessorKey: "user.code",
            accessorFn: (row) => row.user?.code ?? ""
        },
        {
            header: "Tên viên chức đăng ký",
            accessorKey: "user.fullName",
            accessorFn: (row) => row.user?.fullName ?? ""
        },
        {
            header: "Tổng kinh phí dự kiến",
            accessorKey: "estimatedBudget",
            accessorFn: (row) => currencyUtils.formatWithSuffix(row.estimatedBudget, " VNĐ")
        },
        {
            header: "Loại đề tài",
            accessorKey: "srmType.code",
            accessorFn: (row) => row.srmType?.name || "",
        },
        {
            header: "Nhận xét kiểm tra sơ bộ",
            accessorKey: "preliminaryReview",
            size: 400
        },
        {
            header: "Đã gửi thông báo",
            accessorKey: "preliminaryIsSentMail",
            accessorFn: (row) => <CustomThemeIconSquareCheck checked={row.preliminaryIsSentMail === true} />
        },
        {
            header: "Trạng thái đề xuất",
            accessorKey: "proposalStatus",
            size: 240,
            accessorFn(originalRow) {
                return (
                    <CustomEnumBadge
                        value={originalRow.proposalStatus}
                        enumLabel={EnumProposalStatusLabels}
                        enumColor={EnumProposalStatusColors}
                        enumIcon={EnumIconProposalStatus}
                    />
                )
            },
        }
    ], []);
    return (
        <CustomTableSelect<SRMReviewProposal, SRMTaskProposal>
            columns={relationColumns}
            createRelationValue={(taskProposal) => ({ srmTaskProposal: taskProposal, srmTaskProposalId: taskProposal.id })}
            getChildrenValue={(reviewProposal) => reviewProposal.srmTaskProposal!}
            customButtonSelectTableProps={{
                customDataTableAPIProps: {
                    query: proposalsQuery,
                    columns: childrenColumns
                }
            }}
            onChange={onChange}
            values={values}
        />
    )
}
