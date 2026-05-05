import { acceptanceCouncilService } from "@/shared/APIs/acceptanceCouncilService";
import { SRMAcceptanceCouncil } from "@/shared/interfaces/SRMAcceptanceCouncil";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
    values: SRMAcceptanceCouncil[],
    table: MRT_TableInstance<SRMAcceptanceCouncil>
    isFetchingTable: boolean
}

export default function SchoolCouncilSetupDeleteListButton({ values, table, isFetchingTable }: Props) {
    return (
        <CustomButtonDeleteList
            loading={isFetchingTable}
            contextData={values.map((item: any) => item.code).join(", ")}
            onSubmit={() => { return acceptanceCouncilService.deleteList(values) }}
            onSuccess={() => { table.resetRowSelection() }}
        />
    );
}
