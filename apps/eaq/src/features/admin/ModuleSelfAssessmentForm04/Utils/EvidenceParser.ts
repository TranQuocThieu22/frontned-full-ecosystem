// utils/evidenceParser.ts
import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { IEvidenceUsageHistories } from "@/shared/interfaces/selfAssessment/IEvidenceUsageHistories";

interface EvidenceInstance {
    evidenceId: number;
    reportName: string;
    position: number;
}

interface ParsedMatch {
    fullTagContent: string;
    evidenceId?: string;
    reportName: string;
    index?: string;
}

/**
 * Tìm vị trí thẻ đóng </a> tương ứng với thẻ mở
 */
function findClosingTagPosition(
    htmlContent: string,
    openTagStart: number,
    openTagLength: number
): number {
    let depth = 1;
    let pos = openTagStart + openTagLength;
    let closeTagPos = -1;

    while (pos < htmlContent.length && depth > 0) {
        const nextOpen = htmlContent.indexOf("<a", pos);
        const nextClose = htmlContent.indexOf("</a>", pos);

        if (nextClose === -1) break;

        if (nextOpen !== -1 && nextOpen < nextClose) {
            depth++;
            pos = nextOpen + 2;
        } else {
            depth--;
            if (depth === 0) {
                closeTagPos = nextClose;
            }
            pos = nextClose + 4;
        }
    }

    return closeTagPos;
}

/**
 * Kiểm tra xem reportName có nằm trong thẻ <a> con không
 */
function isReportNameInNestedTag(
    tagContent: string,
    reportNameStart: number
): boolean {
    const beforeReportName = tagContent.substring(0, reportNameStart);
    const openTagsBefore = (beforeReportName.match(/<[Aa][^>]*>/g) || []).length;
    const closeTagsBefore = (beforeReportName.match(/<\/[Aa]>/g) || []).length;

    // Nếu số thẻ mở = số thẻ đóng => không nằm trong thẻ con
    return openTagsBefore !== closeTagsBefore;
}

/**
 * Trích xuất reportName từ nội dung thẻ <a>
 */
function extractReportNamesFromTag(
    fullTagContent: string,
    openTagContent: string,
    evidenceId?: string
): ParsedMatch[] {
    const matches: ParsedMatch[] = [];
    const tagContent = fullTagContent.substring(
        openTagContent.length,
        fullTagContent.length - 4
    );

    const reportNamePattern = /\[([^\]]+)\]\s*(?:\((\d+)\))?/g;
    let reportNameMatch;

    while ((reportNameMatch = reportNamePattern.exec(tagContent)) !== null) {
        const reportNameStart = reportNameMatch.index;

        // Chỉ lấy reportName nếu nó không nằm trong thẻ con
        if (!isReportNameInNestedTag(tagContent, reportNameStart)) {
            matches.push({
                fullTagContent,
                evidenceId,
                reportName: reportNameMatch[1] || '',
                index: reportNameMatch[2],
            });
        }
    }

    return matches;
}

/**
 * Parse tất cả các thẻ <a> có evidenceId từ HTML content
 */
function parseEvidenceTags(htmlContent: string): ParsedMatch[] {
    const matches: ParsedMatch[] = [];
    const openTagPattern = /<[Aa][^>]*href="[^"]*evidenceId=(\d+)[^"]*"[^>]*>/gi;
    const openTags = Array.from(htmlContent.matchAll(openTagPattern));

    openTags.forEach((openTagMatch) => {
        const evidenceId = openTagMatch[1];
        const openTagStart = openTagMatch.index!;
        const openTagContent = openTagMatch[0];

        const closeTagPos = findClosingTagPosition(
            htmlContent,
            openTagStart,
            openTagContent.length
        );

        if (closeTagPos !== -1) {
            const fullTagContent = htmlContent.substring(
                openTagStart,
                closeTagPos + 4
            );

            const tagMatches = extractReportNamesFromTag(
                fullTagContent,
                openTagContent,
                evidenceId
            );

            matches.push(...tagMatches);
        }
    });

    return matches;
}

/**
 * Tạo uniqueId từ match hoặc generate mới
 */
function getOrCreateUniqueId(
    fullMatch: string,
    evidenceId: number,
    index: number
): string | undefined {
    const uniqueIdMatch = fullMatch.match(/uniqueId=([^"&]+)/);
    return uniqueIdMatch
        ? uniqueIdMatch[1]
        : `${evidenceId}_${Date.now()}_${index}`;
}

/**
 * Chuyển đổi parsed matches thành map của evidence instances
 */
function buildEvidenceInstanceMap(
    matches: ParsedMatch[]
): Map<string, EvidenceInstance> {
    const evidenceInstanceMap = new Map<string, EvidenceInstance>();

    matches.forEach((match, index) => {
        const evidenceId = parseInt(match.evidenceId!);
        const uniqueId = getOrCreateUniqueId(match.fullTagContent, evidenceId, index);

        evidenceInstanceMap.set(uniqueId!, {
            evidenceId,
            reportName: match.reportName || "",
            position: index,
        });
    });

    return evidenceInstanceMap;
}

/**
 * Tạo evidence map để tra cứu nhanh
 */
function createEvidenceMap(evidenceList: IEvidence[]): Map<number, IEvidence> {
    const evidenceMap = new Map<number, IEvidence>();

    evidenceList.forEach((evidence) => {
        if (evidence.id) {
            evidenceMap.set(evidence.id, evidence);
        }
    });

    return evidenceMap;
}

/**
 * Chuyển đổi evidence instance map thành danh sách IEvidenceUsageHistories
 */
function buildEvidenceUsageList(
    instanceMap: Map<string, EvidenceInstance>,
    evidenceMap: Map<number, IEvidence>
): IEvidenceUsageHistories[] {
    const parsedEvidence: IEvidenceUsageHistories[] = [];
    const evidenceIdCountMap = new Map<number, number>();

    // Sắp xếp theo position để đảm bảo thứ tự đúng
    const sortedInstances = Array.from(instanceMap.entries()).sort(
        (a, b) => a[1].position - b[1].position
    );

    sortedInstances.forEach(([uniqueId, instanceInfo]) => {
        const evidence = evidenceMap.get(instanceInfo.evidenceId);
        if (evidence) {
            const currentCount =
                (evidenceIdCountMap.get(instanceInfo.evidenceId) || 0) + 1;
            evidenceIdCountMap.set(instanceInfo.evidenceId, currentCount);

            parsedEvidence.push({
                ...evidence,
                reportName: instanceInfo.reportName,
                eaqEvidenceId: instanceInfo.evidenceId,
                index: currentCount,
                uniqueId: uniqueId,
            });
        }
    });

    return parsedEvidence;
}

/**
 * Main function: Parse evidence từ HTML content
 */
export function ParseEvidenceFromInput(
    htmlContent: string,
    evidenceIds: number[],
    allEvidence: IEvidence[]
): IEvidenceUsageHistories[] {
    // Early return nếu không có dữ liệu
    if (!htmlContent || evidenceIds.length === 0) {
        return [];
    }

    // 1. Tạo evidence map để tra cứu nhanh
    const evidenceMap = createEvidenceMap(allEvidence);

    // 2. Parse tất cả thẻ <a> có evidenceId
    const matches = parseEvidenceTags(htmlContent);

    // 3. Build evidence instance map
    const instanceMap = buildEvidenceInstanceMap(matches);

    // 4. Chuyển đổi thành danh sách IEvidenceUsageHistories
    const result = buildEvidenceUsageList(instanceMap, evidenceMap);

    return result;
}
