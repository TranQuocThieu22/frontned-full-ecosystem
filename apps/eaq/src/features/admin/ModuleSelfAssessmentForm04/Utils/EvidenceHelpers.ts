import { IEvidenceUsageHistories } from "@/shared/interfaces/selfAssessment/IEvidenceUsageHistories";

export function getEvidenceRowKey(item: IEvidenceUsageHistories): string {
    return item.uniqueId || `${item.eaqEvidenceId}-${item.index}`;
}

export function getCurrentReportName(
    item: IEvidenceUsageHistories,
    reportNameChanges: Map<string, string>
): string {
    const rowKey = getEvidenceRowKey(item);
    return (
        reportNameChanges.get(rowKey) ??
        item.reportName ??
        item.code ??
        ""
    );
}
