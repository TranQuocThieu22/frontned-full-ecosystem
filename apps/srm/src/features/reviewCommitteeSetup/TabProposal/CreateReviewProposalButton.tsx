"use client";

import { IUseArrayRefController } from "@/features/reviewCommitteeSetup/hooks/useArrayRef";
import { taskProposalService } from "@/shared/APIs/taskProposalService";
import { EnumIconProposalStatus, EnumProposalStatusColors, EnumProposalStatusLabels } from "@/shared/consts/enum/EnumProposalStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMReviewProposal } from "@/shared/interfaces/SRMReviewProposal";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface Props {
    handleCreate: Function;
    proposalReviewList?: IUseArrayRefController<SRMReviewProposal>;
}

export default function CreateReviewProposalButton({ handleCreate, proposalReviewList }: Props) {
    const dics = useDisclosure();
    const academicStore = useAcademicYearStore();

    const proposalsQuery = useCustomReactQuery({
        queryKey: ['proposals'],
        axiosFn: () => taskProposalService.getProposalToCouncil({
            AcademicYearId: academicStore.state.academicYear?.id || 0,
        }),
        options: {
            enabled: dics[0]
        }
    })

    const columns = useMemo<MRT_ColumnDef<SRMTaskProposal>[]>(() => [
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

    const handleConfirmSelect = (listProposal: SRMTaskProposal[]) => {
        const { messageSuccess, messageError } = handleCreate(listProposal);
        if (messageSuccess) {
            dics[1].close();
            notifications.show({
                autoClose: 5000,
                color: "green",
                title: "Thêm thành công",
                message: (messageSuccess),
            });
        }
        if (messageError) {
            dics[1].close();
            notifications.show({
                autoClose: 5000,
                color: "red",
                title: "Thêm thất bại",
                message: (messageError),
            });
        }
    }

    return (
        <CustomButtonModal
            modalProps={{
                title: "Danh sách đề xuất",
                size: "100%"
            }}
            disclosure={dics}
            buttonProps={{
                actionType: "create"
            }}
        >
            <CustomDataTable
                enableRowNumbers={false}
                columns={columns}
                isError={proposalsQuery.isError}
                isLoading={proposalsQuery.isLoading}
                data={proposalsQuery.data || []}
                initialState={{
                    columnPinning: { right: ["proposalStatus"] }
                }}
                enableRowSelection={(row) => {
                    return !proposalReviewList?.hasItem((item) => item.srmTaskProposalId === row.original.id);
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    const selectedRows = table.getSelectedRowModel().flatRows.map((item) => item.original) || [];
                    return (
                        <>
                            <CustomButton
                                actionType="create"
                                onClick={() => {
                                    handleConfirmSelect(selectedRows);
                                    table.resetRowSelection();
                                }}
                                disabled={selectedRows.length === 0}
                            >
                                Chọn
                            </CustomButton>
                        </>
                    );
                }}
            />
        </CustomButtonModal>
    );
}
