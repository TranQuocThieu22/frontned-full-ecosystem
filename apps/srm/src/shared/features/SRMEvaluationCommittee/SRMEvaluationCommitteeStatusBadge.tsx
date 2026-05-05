import { SRMEvaluationCommitteeStatusColor, SRMEvaluationCommitteeStatusIcon, SRMEvaluationCommitteeStatusLabel } from "@/shared/consts/enum/SRMEvaluationCommitteeStatus";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";

export function SRMEvaluationCommitteeStatusBadge({ value }: { value?: number }) {
    return (
        <CustomEnumBadge
            value={value}
            enumLabel={SRMEvaluationCommitteeStatusLabel}
            enumColor={SRMEvaluationCommitteeStatusColor}
            enumIcon={SRMEvaluationCommitteeStatusIcon}
        />
    )
}

