'use client'
import { taskProposalService } from "@/shared/APIs/taskProposalService";
import { EnumIconProposalStatus, EnumProposalStatusColors, EnumProposalStatusLabels } from "@/shared/consts/enum/EnumProposalStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CheckModalButton from "./CheckModalButton";
import ProposalCheckExport from "./ProposalCheckExport";
import ProposalViewDetailButton from "./ProposalViewDetailButton";

export default function ProposalCheckTable() {
    const academicYearStore = useAcademicYearStore();

    const taskProposalQuery = useCustomReactQuery({
        queryKey: ['taskProposal', academicYearStore.state.academicYear?.id],
        axiosFn: () => taskProposalService.getAllByAcademicYear({
            academicYearId: academicYearStore.state.academicYear?.id ?? 0,
            // params: `cols=SRMArea,SRMUnit,User,SRMType` => Backend đã detail check lỗi ngày 04/09/2025 taskID: 54656
        }),
        options: {
            enabled: !!academicYearStore.state.academicYear?.id
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
            size: columnSizeObject.name
        },
        {
            accessorKey: "file",
            header: 'File Phiếu đề xuất',
            accessorFn: (row) => (
                <CustomCenterFull>
                    <CustomButtonViewFileAPI filePath={row.attachmentPath} />
                </CustomCenterFull>
            )
        },
        {
            header: 'Lĩnh vực',
            accessorKey: 'srmArea.name'
        },
        {
            header: "Mục tiêu",
            accessorKey: "objective",
            size: columnSizeObject.description
        },
        {
            header: "Tổng chi phí dự kiến",
            accessorKey: "estimatedBudget",
            accessorFn: (row) => {
                return row.estimatedBudget?.toLocaleString('vi-VN')
            }
        },
        {
            header: "Kết quả chính",
            accessorKey: "result",
            size: columnSizeObject.description
        },
        {
            header: "Phương án ứng dụng",
            accessorKey: "expectedOutput",
            size: columnSizeObject.description
        },
        {
            header: "Thời gian thực hiện (tháng)",
            accessorKey: "duration",
        },
        {
            header: "Mã viên chức đăng ký",
            accessorKey: "user.code",
        },
        {
            header: "Tên viên chức đăng ký",
            accessorKey: "user.fullName",
        },
        {
            header: "Đơn vị đăng ký",
            accessorKey: "user.workingUnitName",
        },
        {
            header: "Loại đề tài",
            accessorKey: "srmType.name",
        },
        {
            header: "Nhận xét kiểm tra sơ bộ",
            accessorKey: "preliminaryReview",
            size: columnSizeObject.description
        },
        {
            header: "Đã gửi thông báo",
            accessorKey: "preliminaryIsSentMail",
            Cell: ({ row }) =>
                <CustomCenterFull>
                    <CustomThemeIconSquareCheck checked={row.original.preliminaryIsSentMail} />
                </CustomCenterFull>
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

    return (
        <CustomFieldset
            title="Danh sách đề xuất">
            <CustomDataTable
                columns={columns}
                isLoading={taskProposalQuery.isLoading}
                isError={taskProposalQuery.isError}
                enableRowSelection={true}
                enableRowNumbers={true}
                data={taskProposalQuery.data || []}
                rowActionSize={200}
                pinningRightColumns={['proposalStatus']}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <ProposalCheckExport table={table} />
                    );
                }}
                renderRowActions={({ row }) => {
                    return <CustomCenterFull>
                        <ProposalViewDetailButton values={row.original} />
                        <CheckModalButton value={row.original!} />
                    </CustomCenterFull>
                }}
            />
        </CustomFieldset>
    );
}
