import { IEvidenceUsageHistories } from "@/shared/interfaces/selfAssessment/IEvidenceUsageHistories"


/**
 * Escape special regex characters trong uniqueId
 */
function escapeRegexChars(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Tạo regex pattern để tìm evidence tag theo uniqueId
 */
function createUniqueIdPattern(uniqueId: string): RegExp {
    const escapedUniqueId = escapeRegexChars(uniqueId);
    return new RegExp(
        `<[Aa][^>]*href="[^"]*uniqueId=${escapedUniqueId}[^\"]*"[^>]*>(?:[\\s\\S]*?)\\[([^\\]]+)\\]\\s*(?:\\((\\d+)\\))?(?:[\\s\\S]*?)<\\/[Aa]>`,
        "gi"
    );
}

/**
 * Tạo map các thay thế cần thực hiện (oldContent -> newContent)
 */
export function buildReplacementMap(
    htmlContent: string,
    filteredData: IEvidenceUsageHistories[],
    reportNameChanges: Map<string, string>
): Map<string, string> {
    const replacementMap = new Map<string, string>();

    filteredData.forEach((item) => {
        const rowKey = item.uniqueId || `${item.eaqEvidenceId}-${item.index}`;
        const newReportName = reportNameChanges.get(rowKey);

        if (!newReportName || !item.uniqueId) return;

        const uniqueIdPattern = createUniqueIdPattern(item.uniqueId);
        const matches = Array.from(htmlContent.matchAll(uniqueIdPattern));

        matches.forEach((match) => {
            const fullMatch = match[0];
            const currentReportName = match[1];
            const newLink = fullMatch.replace(
                `[${currentReportName}]`,
                `[${newReportName}]`
            );
            replacementMap.set(fullMatch, newLink);
        });
    });

    return replacementMap;
}

/**
 * Áp dụng tất cả các thay thế vào HTML content
 */
export function applyReplacements(
    htmlContent: string,
    replacementMap: Map<string, string>
): string {
    let updatedContent = htmlContent;

    replacementMap.forEach((newContent, oldContent) => {
        updatedContent = updatedContent.replace(oldContent, newContent);
    });

    return updatedContent;
}

/**
 * Cập nhật reportName trong HTML description
 */
export function updateReportNamesInDescription(
    currentDescription: string,
    filteredData: IEvidenceUsageHistories[],
    reportNameChanges: Map<string, string>
): string {
    const replacementMap = buildReplacementMap(
        currentDescription,
        filteredData,
        reportNameChanges
    );

    return applyReplacements(currentDescription, replacementMap);
}
