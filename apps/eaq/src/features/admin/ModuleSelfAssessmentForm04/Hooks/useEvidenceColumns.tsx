import ReportNameCell from "@/features/admin/ModuleSelfAssessmentForm04/components/EvidenceTable/ReportNameCell";
import StatusCell from "@/features/admin/ModuleSelfAssessmentForm04/components/EvidenceTable/StatusCell";
import { getEvidenceRowKey, getCurrentReportName } from "@/features/admin/ModuleSelfAssessmentForm04/Utils/EvidenceHelpers";
import { IEvidenceUsageHistories } from "@/shared/interfaces/selfAssessment/IEvidenceUsageHistories";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export function useEvidenceColumns(
    editMode: boolean | undefined,
    reportNameChanges: Map<string, string>,
    onReportNameChange: (rowKey: string, newName: string) => void,
    checkDuplicate: (rowKey: string, name: string) => boolean
): MRT_ColumnDef<IEvidenceUsageHistories>[] {
    return useMemo<MRT_ColumnDef<IEvidenceUsageHistories>[]>(
        () => [
            {
                header: "Mã minh chứng báo cáo",
                accessorKey: "reportName",
                Cell: ({ row }) => {
                    const rowKey = getEvidenceRowKey(row.original);
                    const currentName = getCurrentReportName(
                        row.original,
                        reportNameChanges
                    );
                    const isDuplicate = checkDuplicate(rowKey, currentName);

                    return (
                        <ReportNameCell
                            rowKey={rowKey}
                            currentReportName={currentName}
                            isDuplicate={isDuplicate}
                            editMode={editMode}
                            onChange={(value) => onReportNameChange(rowKey, value)}
                        />
                    );
                },
            },
            {
                header: "Mã minh chứng",
                accessorKey: "code",
            },
            {
                header: "Tên minh chứng",
                accessorKey: "name",
            },
            {
                header: "Trạng thái hiệu lực",
                accessorKey: "status",
                Cell: ({ row }) => (
                    <StatusCell
                        expiredDate={row.original.eaqEvidenceCurrentVersion?.expiredDate}
                    />
                ),
            },
        ],
        [editMode, reportNameChanges, onReportNameChange, checkDuplicate]
    );
}
