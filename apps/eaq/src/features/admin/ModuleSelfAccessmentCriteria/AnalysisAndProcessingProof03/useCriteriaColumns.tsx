import { CriteriaAssignmentStatusBadge } from "@/features/admin/ModuleSelfAccessmentCriteria/AnalysisAndProcessingProof03/CriteriaAssignmentStatusBadge";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export const useCriteriaColumns = () => {
    return useMemo<MRT_ColumnDef<ITaskDetail>[]>(
        () => [
            {
                header: "Mã kế hoạch TDG",
                accessorKey: "displayPlanCode",
            },
            {
                header: "Chương trình đào tạo",
                accessorKey: "displayProgram",
                size: 400
            },
            {
                header: "Mã giai đoạn",
                accessorKey: "displayPhase",
            },
            {
                header: "Nhóm công tác",
                size: 300,
                accessorKey: "eaqTask.eaqCouncilGroup.name",
                accessorFn(row) {
                    return `${row.eaqTask?.eaqCouncilGroup?.code}, ${row.eaqTask?.eaqCouncilGroup?.name}`;
                },
            },
            {
                header: "Thành viên phụ trách",
                accessorKey: "user.fullName"
            },
            {
                header: "Mã Tiêu chí",
                accessorKey: "eaqCriteria.code"
            },
            {
                header: "Tên Tiêu chí",
                accessorKey: "eaqCriteria.name", size: 600
            },
            {
                header: "Trạng thái phân tích",
                accessorKey: "analysisStatus",
                accessorFn(row) {
                    return <CriteriaAssignmentStatusBadge status={row.analysisStatus ?? -1} />;
                },
                size: 250
            },

        ],
        []
    );
};
