import { EnumColorContractExecutionStatus, EnumContractExecutionStatus, EnumIconContractExecutionStatus, EnumLabelContractExecutionStatus } from "@/shared/consts/enum/EnumContractExecutionStatus";
import { StatusBadgeProps } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomEnumBadge } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomEnumBadge/CustomEnumBadge";

export default function Shared_ContractExecuteStatusBadge({ value }: { value?: number }) {
    return (
        <CustomEnumBadge
            value={value}
            enumLabel={EnumLabelContractExecutionStatus}
            enumColor={EnumColorContractExecutionStatus}
            enumIcon={EnumIconContractExecutionStatus}
        />
    )
}

export const ContractExecuteStatusBadgeProps: StatusBadgeProps = {
    enumObject: EnumContractExecutionStatus,
    enumLabel: EnumLabelContractExecutionStatus,
    enumColor: EnumColorContractExecutionStatus,
    enumIcon: EnumIconContractExecutionStatus
}