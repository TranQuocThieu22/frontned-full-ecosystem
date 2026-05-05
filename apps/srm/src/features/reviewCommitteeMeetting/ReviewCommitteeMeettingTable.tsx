"use client";

import { reviewCommitteeService } from "@/shared/APIs/reviewCommitteeService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMReviewProposal } from "@/shared/interfaces/SRMReviewProposal";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useMemo } from "react";
import DisplayConclusionStatus from "../councilConclusionList/DisplayConclusionStatus";
import ReviewCommitteeMettingUpdate from "./ReviewCommitteeMettingUpdate";

export default function ReviewCommitteeMeettingTable() {
    const academicStore = useAcademicYearStore();

    const reviewProposalQuery = useCustomReactQuery({
        queryKey: ['review_proposal_list', academicStore.state.academicYear?.id],
        axiosFn: () => reviewCommitteeService.getReviewProposalByAcademyYear({ AcademicYearId: academicStore.state.academicYear?.id })
    })

    const columns = useMemo<CustomColumnDef<SRMReviewProposal>[]>(
        () => [
            {
                accessorKey: 'reviewCommitteeCode',
                header: 'Mã hội đồng',
                accessorFn: (row) => row.srmReviewCommittee?.code
            },
            {
                accessorKey: 'reviewCommitteeName',
                header: 'Tên hội đồng',
                size: columnSizeObject.name,
                accessorFn: (row) => row.srmReviewCommittee?.name
            },
            {
                accessorKey: 'meetingDate',
                header: 'Ngày họp',
                type: "ddMMyyyy"
            },
            {
                accessorKey: 'code',
                header: 'Mã đề xuất',
            },
            {
                accessorKey: 'name',
                header: 'Tên đề tài',
                size: columnSizeObject.name
            },
            {
                accessorKey: 'srmTaskProposal.srmArea.name',
                header: 'Lĩnh vực',
                size: columnSizeObject.name,
            },
            {
                accessorKey: 'userCode',
                header: 'Mã viên chức đăng ký',
                accessorFn: (row) => row.srmTaskProposal?.user?.code
            },
            {
                accessorKey: 'userName',
                header: 'Tên viên chức đăng ký',
                accessorFn: (row) => row.srmTaskProposal?.user?.fullName
            },
            {
                accessorKey: 'srmConclusion.name',
                size: 200,
                header: 'Kết luận của hội đồng',
                Cell: ({ row }) => (
                    <DisplayConclusionStatus
                        title={row.original.srmConclusion?.name}
                        color={row.original.srmConclusion?.color}
                        fz={13}
                    />
                )
            },
            {
                accessorKey: 'recommendation',
                header: 'Kiến nghị',
                size: columnSizeObject.description
            },
            {
                accessorKey: 'attachmentPath',
                header: 'Phiếu nhận xét',
                type: "viewFile"
            },
        ],
        []
    );
    return (
        <>
            <CustomFieldset title="Danh sách đề xuất">
                <CustomDataTableAPI
                    enableRowSelection
                    pinningRightColumns={['srmConclusion.name']}
                    columns={columns}
                    query={reviewProposalQuery}
                    exportProps={{
                        fileName: "Danh sách đề xuất"
                    }}
                    renderRowActions={({ row }) => {
                        return (
                            <>
                                {/* <ReviewCommitteeMeettingUpdateButtonOld reviewProposalId={row.original.id} /> */}
                                <ReviewCommitteeMettingUpdate values={row.original} />
                            </>
                        );
                    }}
                />
            </CustomFieldset>
        </>
    );
}

