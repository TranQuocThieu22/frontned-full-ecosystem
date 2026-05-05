import { IEvidenceUsageHistories } from "@/shared/interfaces/selfAssessment/IEvidenceUsageHistories";

/**
 * Xây dựng map của tên dự kiến sau thay đổi
 */
export function BuildProposedNamesMap(
    filteredData: IEvidenceUsageHistories[],
    reportNameChanges: Map<string, string>
): Map<string, string> {
    const proposedNames = new Map<string, string>();

    filteredData.forEach((item) => {
        const rowKey = item.uniqueId || `${item.eaqEvidenceId}-${item.index}`;
        const proposed =
            reportNameChanges.get(rowKey) ?? item.reportName ?? item.code ?? "";
        proposedNames.set(rowKey, proposed);
    });

    return proposedNames;
}

/**
 * Đếm tần suất xuất hiện của mỗi tên
 */
export function CountNameFrequency(
    proposedNames: Map<string, string>
): Map<string, number> {
    const nameCount = new Map<string, number>();

    proposedNames.forEach((name) => {
        nameCount.set(name, (nameCount.get(name) || 0) + 1);
    });

    return nameCount;
}

/**
 * Tìm các uniqueId có tên bị trùng
 */
export function FindDuplicatedIds(
    proposedNames: Map<string, string>,
    nameCount: Map<string, number>
): Set<string> {
    const duplicatedUids = new Set<string>();

    proposedNames.forEach((name, uid) => {
        if ((nameCount.get(name) || 0) > 1) {
            duplicatedUids.add(uid);
        }
    });

    return duplicatedUids;
}

/**
 * Xác thực không có tên trùng lặp
 * @returns true nếu hợp lệ, false nếu có trùng
 */
export function ValidateUniqueReportNames(
    filteredData: IEvidenceUsageHistories[],
    reportNameChanges: Map<string, string>
): { isValid: boolean; duplicatedIds: Set<string> } {
    const proposedNames = BuildProposedNamesMap(filteredData, reportNameChanges);
    const nameCount = CountNameFrequency(proposedNames);
    const duplicatedIds = FindDuplicatedIds(proposedNames, nameCount);

    return {
        isValid: duplicatedIds.size === 0,
        duplicatedIds: duplicatedIds,
    };
}
