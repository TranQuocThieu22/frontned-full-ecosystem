"use client";

import DeleteListOnClientButton from "@/features/reviewCommitteeSetup/ComponentShared/DeleteListOnClientButton";
import DeleteOnClientButton from "@/features/reviewCommitteeSetup/ComponentShared/DeleteOnClientButton";
import { formatListMessage } from "@/features/reviewCommitteeSetup/ComponentShared/ReviewCommitteeFunction";
import { IUseArrayRefController } from "@/features/reviewCommitteeSetup/hooks/useArrayRef";
import { EnumIconProposalStatus, EnumProposalStatusColors, EnumProposalStatusLabels } from "@/shared/consts/enum/EnumProposalStatus";
import { SRMApprovedProposal } from "@/shared/interfaces/SRMApprovedProposal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { MRT_ColumnDef } from "mantine-react-table";
import { MutableRefObject, useMemo, useState } from "react";
import CreateProposalButton from "./CreateProposalButton";
import ProposalExportButton from "./ProposalExportButton";

interface Props {
    approvedProposalList: IUseArrayRefController<SRMApprovedProposal>;
    approvedProposalDisableList?: MutableRefObject<SRMApprovedProposal[]>;
    hasChange: MutableRefObject<boolean>;
    decisionCode?: string;
    readOnly?: boolean
}

export default function ProposalTable({ approvedProposalList, approvedProposalDisableList, hasChange, decisionCode = "", readOnly }: Props) {
    const [, reRenderComponent] = useState(false);

    const handleDeleteProposal = (proposal: SRMApprovedProposal) => {
        // nếu chưa có id thì xóa nó luôn
        if (!proposal.id) {
            approvedProposalList.removeItem(proposal);
            return;
        }
        // nếu có id thì đưa nó qua mảng disable để khi lưu gửi lên server
        const proposalRemoved = approvedProposalList.removeItem(proposal);
        proposalRemoved && (proposalRemoved.isEnabled = false, approvedProposalDisableList?.current.push(proposalRemoved));
    }

    const handleDeleteListProposal = (listProposal: SRMApprovedProposal[]) => {
        listProposal.map((item) => {
            handleDeleteProposal(item);
        })
        reRenderComponent(prev => !prev);
        hasChange.current = true;
    }

    const handleAddProposal = (listProposal: SRMApprovedProposal[]) => {
        const arrayItemAddSuccess: string[] = [];

        listProposal.map((item) => {
            const newProposal = {
                code: item.code,
                name: item.name,
                srmTaskProposal: item,
                srmTaskProposalId: item.id,
                isEnabled: true
            } as SRMApprovedProposal;
            approvedProposalList.addItem(newProposal);
            arrayItemAddSuccess.push(item.code || "");
        })

        const messageSuccess =
            arrayItemAddSuccess.length > 0 ? (
                <>
                    Thêm đề xuất{" "}
                    {formatListMessage(arrayItemAddSuccess, "#1971c2")}
                    {" "}vào hội đồng thành công
                </>
            ) : undefined;

        reRenderComponent(prev => !prev);
        hasChange.current = true;
        return { messageSuccess };
    }

    const columns = useMemo<MRT_ColumnDef<SRMApprovedProposal>[]>(() => [
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
            header: 'Mục tiêu',
            accessorKey: 'srmTaskProposal.objective',
            accessorFn: (row) => row.srmTaskProposal?.objective ?? ""
        },
        {
            header: 'Tổng kinh phí dự kiến',
            accessorKey: 'srmTaskProposal.estimatedBudget',
            accessorFn: (row) => row.srmTaskProposal?.estimatedBudget ?? ""
        },
        {
            header: 'Kết quả chính',
            accessorKey: 'srmTaskProposal.result',
            accessorFn: (row) => row.srmTaskProposal?.result ?? ""
        },
        {
            header: 'Phương án ứng dụng',
            accessorKey: 'srmTaskProposal.resexpectedOutputult',
            accessorFn: (row) => row.srmTaskProposal?.expectedOutput ?? ""
        },
        {
            header: 'Thời gian thực hiện (tháng)',
            accessorKey: 'srmTaskProposal.duration',
            accessorFn: (row) => row.srmTaskProposal?.duration ?? ""
        },
        {
            header: "Mã sinh viên đăng ký",
            accessorKey: "srmTaskProposal.user.code",
            accessorFn: (row) => row.srmTaskProposal?.user?.code ?? ""
        },
        {
            header: "Họ tên sinh viên đăng ký",
            accessorKey: "srmTaskProposal.user.fullName",
            accessorFn: (row) => row.srmTaskProposal?.user?.fullName ?? ""
        },
        {
            header: 'Mã khoa',
            accessorKey: 'srmTaskProposal.user.faculty.code',
            accessorFn: (row) => row.srmTaskProposal?.user?.faculty?.code ?? ""
        },
        {
            header: "Trạng thái đề xuất",
            accessorKey: "proposalStatus",
            size: 240,
            accessorFn(originalRow) {
                return (
                    <CustomEnumBadge
                        value={originalRow.srmTaskProposal?.proposalStatus}
                        enumLabel={EnumProposalStatusLabels}
                        enumColor={EnumProposalStatusColors}
                        enumIcon={EnumIconProposalStatus}
                    />
                )
            },
        }
    ], []);

    return (
        <CustomDataTable
            enableRowSelection
            columns={columns}
            getRowId={(row) => String(row.srmTaskProposalId)}
            data={approvedProposalList.values()}
            renderTopToolbarCustomActions={readOnly ? undefined : ({ table }) => {
                const dataSelected = table.getSelectedRowModel().flatRows.flatMap((item) => item.original);
                return (
                    <>
                        <CreateProposalButton
                            handleCreate={handleAddProposal}
                            currentProposalList={approvedProposalList}
                        />
                        <ProposalExportButton
                            table={table}
                            decisionCode={decisionCode}
                        />
                        <DeleteListOnClientButton
                            values={dataSelected}
                            handleDeleteList={handleDeleteListProposal}
                            handlResetSelection={table.resetRowSelection}
                        />
                    </>
                );
            }}
            renderRowActions={readOnly ? undefined : ({ row, table }) => {
                return (
                    <CustomCenterFull>
                        <DeleteOnClientButton
                            contextData={row.original.code || ""}
                            handleDelete={() => {
                                handleDeleteProposal(row.original);
                                reRenderComponent(prev => !prev);
                                hasChange.current = true;
                            }}
                            handlResetSelection={table.resetRowSelection}
                        />
                    </CustomCenterFull>
                );
            }}
        />
    );
}
