'use client';
import { taskProposalService } from "@/shared/APIs/taskProposalService";
import { EnumIconProposalStatus, EnumProposalStatus, EnumProposalStatusColors, EnumProposalStatusLabels } from "@/shared/consts/enum/EnumProposalStatus";
import { EnumTaskProposalType } from "@/shared/consts/enum/EnumTaskProposalType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useMemo } from "react";
import SubmitStudentProposalCreateOrUpdate from "./SubmitStudentProposalCreateOrUpdate";
import SubmitStudentProposalDeleteButton from "./SubmitStudentProposalDeleteButton";
import SubmitStudentProposalDeleteListButton from "./SubmitStudentProposalDeleteListButton";
import SubmitStudentProposalExportButton from "./SubmitStudentProposalExportButton";
import SubmitStudentProposalImportButton from "./SubmitStudentProposalImportButton";
import SubmitStudentProposalView from "./SubmitStudentProposalView";

export default function SubmitStudentProposalTable() {
    const academicYearStore = useAcademicYearStore();

    const taskProposalStudent = useCustomReactQuery({
        queryKey: ['taskProposalStudent', academicYearStore.state.academicYear?.id],
        axiosFn: () => taskProposalService.getAllByAcademicYear({
            academicYearId: academicYearStore.state.academicYear?.id ?? 0,
            type: EnumTaskProposalType.StudentProposal,
        }),
        options: {
            enabled: !!academicYearStore.state.academicYear?.id
        }
    })

    const columns = useMemo<CustomColumnDef<SRMTaskProposal>[]>(() => [
        {
            header: "Mã đề xuất",
            accessorKey: "code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "name",
            size: 260
        },
        {
            accessorKey: "attachmentPath",
            header: 'File Phiếu đề xuất',
            type: 'viewFile'
        },
        {
            header: 'Lĩnh vực',
            accessorKey: 'srmArea.name'
        },
        {
            header: "Tính cấp thiết",
            accessorKey: "necessity",
            size: 300
        },
        {
            header: "Mục tiêu",
            accessorKey: "objective",
            size: 300
        },
        {
            header: "Tổng chi phí dự kiến",
            accessorKey: "estimatedBudget",
            type: 'currency'
        },
        {
            header: "Yêu cầu đối với kết quả",
            accessorKey: "requirement",
            size: 300
        },
        {
            header: "Kết quả chính",
            accessorKey: "result",
            size: 300
        },
        {
            header: "Phương án ứng dụng",
            accessorKey: "expectedOutput",
            size: 300
        },
        {
            header: "Thời gian thực hiện (tháng)",
            accessorKey: "duration",
        },
        {
            header: "Mã sinh viên đăng ký",
            accessorKey: "user.code",
        },
        {
            header: "Tên sinh viên đăng ký",
            accessorKey: "user.fullName",
        },
        {
            header: "Mã khoa",
            accessorKey: "user.facultyCode",
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
    ], [])


    const isEditable = (row: SRMTaskProposal) => {
        if (row.proposalStatus === EnumProposalStatus.PendingPreliminaryCheck || row.proposalStatus == EnumProposalStatus.UnderRevision) {
            return true
        }
        return false
    };

    const canDeleteList = (selectedRows: SRMTaskProposal[]) => {
        return selectedRows.length === 0 || selectedRows.some(row =>
            !isEditable(row)
        )
    }

    return (
        <CustomFieldset
            title="Danh sách đề xuất">
            <CustomDataTableAPI
                columns={columns}
                enableRowSelection={true}
                query={taskProposalStudent}
                initialState={{
                    columnPinning: {
                        right: ['proposalStatus'],
                    },
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    const select = table.getSelectedRowModel().flatRows.flatMap((item) => item.original) || [];
                    const disableDeleteList = canDeleteList(select)
                    return <>
                        <SubmitStudentProposalCreateOrUpdate />
                        <SubmitStudentProposalImportButton />
                        <SubmitStudentProposalExportButton table={table} loading={taskProposalStudent.isFetching} />
                        <SubmitStudentProposalDeleteListButton table={table} disabled={disableDeleteList} />
                    </>
                }}
                renderRowActions={({ row }) => {
                    if (isEditable(row.original)) return (
                        <CustomCenterFull>
                            <SubmitStudentProposalCreateOrUpdate initValues={row.original!} />
                            <SubmitStudentProposalDeleteButton data={row.original!} />
                        </CustomCenterFull>
                    )
                    return (
                        <CustomCenterFull>
                            <SubmitStudentProposalView values={row.original!} />
                        </CustomCenterFull>
                    )
                }}
            />
        </CustomFieldset>
    );
}