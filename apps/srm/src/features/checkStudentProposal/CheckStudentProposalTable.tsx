'use client'
import { taskProposalService } from "@/shared/APIs/taskProposalService";
import { EnumIconProposalStatus, EnumProposalStatusColors, EnumProposalStatusLabels } from "@/shared/consts/enum/EnumProposalStatus";
import { EnumTaskProposalType } from "@/shared/consts/enum/EnumTaskProposalType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { useMemo } from "react";
import CheckModalButton from "./CheckModalButton";
import CheckStudentProposalExportButton from "./CheckStudentProposalExportButton";
import CheckStudentProposalViewButton from "./CheckStudentProposalViewButton";

export default function CheckStudentProposalTable() {
    const academicYearStore = useAcademicYearStore();

    const taskProposalQuery = useCustomReactQuery({
        queryKey: ['taskProposal', academicYearStore.state.academicYear?.id],
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
            size: columnSizeObject.name
        },
        {
            header: 'File Phiếu đề xuất',
            accessorKey: "attachmentPath",
            type: 'viewFile',
        },
        {
            header: 'Lĩnh vực',
            accessorKey: 'srmArea.name'
        },
        {
            header: 'Tính cấp thiết',
            accessorKey: 'necessity'
        },
        {
            header: "Mục tiêu",
            accessorKey: "objective",
        },
        {
            header: "Tổng kinh phí dự kiến",
            accessorKey: "estimatedBudget",
            accessorFn: (row) => {
                return currencyUtils.formatWithSuffix(row.estimatedBudget, " VNĐ")
            }
        },
        {
            header: "Yêu cầu đối với kết quả",
            accessorKey: "requirement",
        },
        {
            header: "Kết quả chính",
            accessorKey: "result",
        },
        {
            header: "Phương án ứng dụng",
            accessorKey: "expectedOutput",
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
            header: "Họ Tên sinh viên đăng ký",
            accessorKey: "user.fullName",
        },
        {
            header: "Mã khoa",
            accessorKey: "user.facultyName1", //BE nói tạm để trống
        },
        {
            header: "Nhận xét kiểm tra sơ bộ",
            accessorKey: "preliminaryReview",
            size: 320
        },
        {
            header: "Đã gửi thông báo",
            accessorKey: "preliminaryIsSentMail",
            type: "squareCheck",
            minSize: 200,
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
                initialState={{
                    columnPinning: {
                        right: ['proposalStatus'],
                    },
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <CheckStudentProposalExportButton table={table} />
                    );
                }}
                renderRowActions={({ row }) => {
                    return (
                        <CustomCenterFull>
                            <CheckStudentProposalViewButton values={row.original} />
                            <CheckModalButton value={row.original!} />
                        </CustomCenterFull>
                    )
                }}
            />
        </CustomFieldset>
    );
}
