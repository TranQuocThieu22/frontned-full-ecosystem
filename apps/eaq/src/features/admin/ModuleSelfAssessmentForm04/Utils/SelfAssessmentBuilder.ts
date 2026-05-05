import { IEvidenceUsageHistories } from "@/shared/interfaces/selfAssessment/IEvidenceUsageHistories";
import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";

/**
 * Xây dựng ISelfAssessment object từ dữ liệu hiện tại
 */
export function BuildSelfAssessment(
    defaultValue: ISelfAssessment | undefined,
    updatedDescription: string,
    filteredData: IEvidenceUsageHistories[]
): ISelfAssessment {
    const base: ISelfAssessment = (defaultValue ?? {}) as ISelfAssessment;

    return {
        ...base,
        description: updatedDescription,
        eaqEvidenceUsages: filteredData.map((item) => ({
            eaqEvidenceId: item.id,
            reportName: item.reportName,
        })),
        eaqEvidenceUsageHistories: filteredData,
    };
}
