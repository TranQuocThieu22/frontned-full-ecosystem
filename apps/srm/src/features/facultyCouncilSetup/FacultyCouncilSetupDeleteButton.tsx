import { acceptanceCouncilService } from "@/shared/APIs/acceptanceCouncilService";
import { SRMAcceptanceCouncil } from "@/shared/interfaces/SRMAcceptanceCouncil";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
    data: SRMAcceptanceCouncil;
    table: MRT_TableInstance<SRMAcceptanceCouncil>;
    isLoading: boolean
}

export default function FacultyCouncilSetupDeleteButton({ data, table, isLoading }: Props) {
    return (
        <CustomActionIconDelete
            contextData={data.code}
            actionIconProps={{
                loading: isLoading
            }}
            onSubmit={() => { return acceptanceCouncilService.delete(data.id ?? -1) }}
            onSuccess={() => { table.resetRowSelection() }}
        />
    );
}