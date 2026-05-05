import { EnumColorEnumSubmittedType, EnumIconEnumSubmittedType, EnumLabelEnumSubmittedType } from "@/shared/consts/enum/EnumSubmittedType";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";

export default function Shared_ReportHistorySubmittedTypeBadge({ value }: { value?: number }) {
    return (
        <CustomEnumBadge
            value={value}
            enumLabel={EnumLabelEnumSubmittedType}
            enumColor={EnumColorEnumSubmittedType}
            enumIcon={EnumIconEnumSubmittedType}
        />
    )
}
