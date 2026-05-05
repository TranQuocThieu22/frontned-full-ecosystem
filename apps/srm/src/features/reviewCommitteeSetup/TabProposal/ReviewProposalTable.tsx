"use client";

import { IUseArrayRefController } from "@/features/reviewCommitteeSetup/hooks/useArrayRef";
import { SRMReviewProposal } from "@/shared/interfaces/SRMReviewProposal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { MRT_ColumnDef } from "mantine-react-table";
import { MutableRefObject, useMemo, useState } from "react";
import DeleteListOnClientButton from "../ComponentShared/DeleteListOnClientButton";
import DeleteOnClientButton from "../ComponentShared/DeleteOnClientButton";
import { formatListMessage } from "../ComponentShared/ReviewCommitteeFunction";
import CreateReviewProposalButton from "./CreateReviewProposalButton";
import ReviewProposalExportButton from "./ReviewProposalExportButton";

interface Props {
    proposalReviewList: IUseArrayRefController<SRMReviewProposal>;
    proposalReviewDisableList?: MutableRefObject<SRMReviewProposal[]>;
    hasChange: MutableRefObject<boolean>;
    reviewCommitteeCode?: string;
}

export default function ReviewProposalTable({ proposalReviewList, proposalReviewDisableList, hasChange, reviewCommitteeCode = "" }: Props) {
    const [, reRenderComponent] = useState(false);

    const handleDeleteReviewProposal = (reviewProposal: SRMReviewProposal) => {
        // nếu chưa có id thì xóa nó luôn
        if (!reviewProposal.id) {
            proposalReviewList.removeItem(reviewProposal);
            return;
        }
        // nếu có id thì đưa nó qua mảng disable để khi lưu gửi lên server
        const memberRemoved = proposalReviewList.removeItem(reviewProposal);
        memberRemoved && (memberRemoved.isEnabled = false, proposalReviewDisableList?.current.push(memberRemoved));
    }

    const handleDeleteListReviewProposal = (listProposal: SRMReviewProposal[]) => {
        listProposal.map((item) => {
            handleDeleteReviewProposal(item);
        })
        reRenderComponent(prev => !prev);
        hasChange.current = true;
    }

    const handleAddReviewProposal = (listProposal: SRMReviewProposal[]) => {
        const arrayItemAddSuccess: string[] = [];

        listProposal.map((item) => {
            const newReviewProposal = {
                code: item.code,
                name: item.name,
                srmTaskProposal: item,
                srmTaskProposalId: item.id,
                isEnabled: true
            } as SRMReviewProposal;
            proposalReviewList.addItem(newReviewProposal);
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

    const columns = useMemo<MRT_ColumnDef<SRMReviewProposal>[]>(() => [
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

    return (
        <CustomDataTable
            enableRowSelection
            enableRowActions
            columns={columns}
            getRowId={(row) => String(row.srmTaskProposalId)}
            data={proposalReviewList.values()}
            renderTopToolbarCustomActions={({ table }) => {
                const dataSelected = table.getSelectedRowModel().flatRows.flatMap((item) => item.original);
                return (
                    <>
                        <CreateReviewProposalButton
                            handleCreate={handleAddReviewProposal}
                            proposalReviewList={proposalReviewList}
                        />
                        <ReviewProposalExportButton
                            dataSelected={dataSelected?.length > 0 ? dataSelected : proposalReviewList?.values() || []}
                            reviewCommitteeCode={reviewCommitteeCode}
                        />
                        <DeleteListOnClientButton
                            values={dataSelected}
                            handleDeleteList={handleDeleteListReviewProposal}
                            handlResetSelection={table.resetRowSelection}
                        />
                    </>
                );
            }}
            renderRowActions={({ row, table }) => {
                return (
                    <CustomCenterFull>
                        <DeleteOnClientButton
                            contextData={row.original.code || ""}
                            handleDelete={() => {
                                handleDeleteReviewProposal(row.original);
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
