import { contractService } from "@/shared/APIs/contractService";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

export default function ExecuteContractDeleteList(
    { values, loading }:
        { values: SRMContract[], loading?: boolean }
) {
    return (
        <CustomButtonDeleteList
            contextData={values.map((item: SRMContract) => item.code + " - " + item.name).join(", ")}
            onSubmit={() => contractService.deleteList(values)}
            loading={loading}
        />
    )
}
