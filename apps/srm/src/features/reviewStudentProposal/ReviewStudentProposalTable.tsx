"use client";

import { proposalApprovalService } from "@/shared/APIs/proposalApprovalService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMProposalApproval } from "@/shared/interfaces/SRMProposalApproval";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";
import ReviewStudentCRUModal from "./ReviewStudentCRUModal";
import ReviewStudentProposalExportButton from "./ReviewStudentProposalExportButton";
import ReviewStudentProposalImportButton from "./ReviewStudentProposalImportButton";

export default function ReviewStudentProposalTable() {
    const academicStore = useAcademicYearStore();
    const [dataUpdate, setDataUpdate] = useState<SRMProposalApproval | undefined>();
    const [readOnly, setReadOnly] = useState<boolean>(false);
    const disclosure = useDisclosure();

    const studentProposalQuery = useCustomReactQuery({
        queryKey: ['student_proposal_list', academicStore.state.academicYear?.id],
        axiosFn: () => proposalApprovalService.getAllByAcademicYear({
            academicYear: academicStore.state.academicYear?.id
        })
    })

    const columns = useMemo<CustomColumnDef<SRMProposalApproval>[]>(
        () => [
            {
                accessorKey: 'decisionCode',
                header: 'Số quyết định'
            },
            {
                accessorKey: 'decisionDate',
                header: 'Ngày quyết định',
                type: "ddMMyyyy"
            },
            {
                accessorKey: 'decisionName',
                header: 'Tên quyết định',
                size: 400,
            },
            {
                accessorKey: 'signer',
                header: 'Người ký',
            },
            {
                accessorKey: 'attachmentPath',
                header: 'File quyết định ',
                type: "viewFile"
            },
            {
                accessorKey: 'note',
                header: 'Ghi chú',
            },
        ], []
    );

    return (
        <>
            <CustomFieldset title="Danh sách quyết định phê duyệt danh mục đề xuất">
                <CustomDataTableAPI
                    enableRowSelection
                    columns={columns}
                    query={studentProposalQuery}
                    deleteListFn={proposalApprovalService.deleteListIds}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <Group>
                                <CustomButton
                                    actionType="create"
                                    onClick={() => {
                                        setReadOnly(false);
                                        setDataUpdate(undefined);
                                        disclosure[1].open();
                                    }}
                                />
                                <ReviewStudentProposalImportButton acdemicYearId={academicStore.state.academicYear?.id} />
                                <ReviewStudentProposalExportButton
                                    table={table}
                                    disabled={studentProposalQuery.isFetching}
                                />
                            </Group>
                        );
                    }}
                    renderRowActions={({ row, table }) => {
                        return <>
                            <CustomActionIcon
                                actionType="view"
                                loading={studentProposalQuery.isFetching}
                                onClick={() => {
                                    setReadOnly(true);
                                    setDataUpdate(row.original);
                                    disclosure[1].open();
                                }}
                            />
                            <CustomActionIcon
                                actionType="update"
                                loading={studentProposalQuery.isFetching}
                                onClick={() => {
                                    setReadOnly(false);
                                    setDataUpdate(row.original);
                                    disclosure[1].open();
                                }}
                            />
                            <CustomActionIconDelete
                                contextData={row.original.decisionCode}
                                onSubmit={() => proposalApprovalService.delete(row.original.id!)}
                            />
                        </>;
                    }}
                />
            </CustomFieldset>
            <ReviewStudentCRUModal disclosure={disclosure} values={dataUpdate} readOnly={readOnly} />
        </>
    );
}
