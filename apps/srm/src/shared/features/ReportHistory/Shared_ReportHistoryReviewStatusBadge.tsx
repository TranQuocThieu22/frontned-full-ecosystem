import { EnumColorReportHistoryReviewStatus, EnumIconReportHistoryReviewStatus, EnumLabelReportHistoryReviewStatus } from "@/shared/consts/enum/EnumReportHistoryReviewStatus";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";

export default function Shared_ReportHistoryReviewStatusBadge({ value }: { value?: number }) {
    return (
        <CustomEnumBadge
            value={value}
            enumLabel={EnumLabelReportHistoryReviewStatus}
            enumColor={EnumColorReportHistoryReviewStatus}
            enumIcon={EnumIconReportHistoryReviewStatus}
        />
    )
}
