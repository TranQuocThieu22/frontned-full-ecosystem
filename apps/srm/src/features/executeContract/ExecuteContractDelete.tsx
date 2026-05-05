import { contractService } from "@/shared/APIs/contractService";
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import { MRT_Row } from "mantine-react-table";

export default function ExecuteContractDelete({
    row,
    loading
}: {
    row: MRT_Row<SRMContract>;
    loading?: boolean
}
) {

    return (
        <CustomActionIconDelete
            contextData={row.original.code + " - " + row.original.name}
            onSubmit={() => contractService.delete(row.original.id!)}
            actionIconProps={{
                loading: loading
            }}
        />
    )
}