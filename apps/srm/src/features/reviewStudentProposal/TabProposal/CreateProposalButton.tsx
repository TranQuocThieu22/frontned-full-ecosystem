"use client";

import { IUseArrayRefController } from "@/features/reviewCommitteeSetup/hooks/useArrayRef";
import { taskProposalService } from "@/shared/APIs/taskProposalService";
import { EnumIconProposalStatus, EnumProposalStatus, EnumProposalStatusColors, EnumProposalStatusLabels } from "@/shared/consts/enum/EnumProposalStatus";
import { EnumTaskProposalType } from "@/shared/consts/enum/EnumTaskProposalType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMApprovedProposal } from "@/shared/interfaces/SRMApprovedProposal";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface Props {
    handleCreate: Function;
    currentProposalList?: IUseArrayRefController<SRMApprovedProposal>;
}

export default function CreateProposalButton({ handleCreate, currentProposalList }: Props) {
    const dics = useDisclosure();
    const academicStore = useAcademicYearStore();

    const proposalsQuery = useCustomReactQuery({
        queryKey: ['proposals'],
        axiosFn: () => taskProposalService.getAllByAcademyYearAndProposalStatus({
            AcademyYearId: academicStore.state.academicYear?.id || 0,
            ProposalStatus: EnumProposalStatus.Approved,
            Type: EnumTaskProposalType.StudentProposal,
            cols: 'User,SRMArea'
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
            header: 'Mục tiêu',
            accessorKey: 'srmTaskProposal.objective',
            accessorFn: (row) => row.objective ?? ""
        },
        {
            header: 'Tổng kinh phí dự kiến',
            accessorKey: 'srmTaskProposal.estimatedBudget',
            accessorFn: (row) => row.estimatedBudget ?? ""
        },
        {
            header: 'Kết quả chính',
            accessorKey: 'srmTaskProposal.result',
            accessorFn: (row) => row.result ?? ""
        },
        {
            header: 'Phương án ứng dụng',
            accessorKey: 'srmTaskProposal.resexpectedOutputult',
            accessorFn: (row) => row.expectedOutput ?? ""
        },
        {
            header: 'Thời gian thực hiện (tháng)',
            accessorKey: 'srmTaskProposal.duration',
            accessorFn: (row) => row.duration ?? ""
        },
        {
            header: "Mã sinh viên đăng ký",
            accessorKey: "srmTaskProposal.user.code",
            accessorFn: (row) => row.user?.code ?? ""
        },
        {
            header: "Họ tên sinh viên đăng ký",
            accessorKey: "srmTaskProposal.user.fullName",
            accessorFn: (row) => row.user?.fullName ?? ""
        },
        {
            header: 'Mã khoa',
            accessorKey: 'user.faculty.code',
            accessorFn: (row) => row.user?.faculty?.code ?? ""
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
                actionType: 'create'
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
                    return !currentProposalList?.hasItem((item) => item.srmTaskProposalId === row.original.id);
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
