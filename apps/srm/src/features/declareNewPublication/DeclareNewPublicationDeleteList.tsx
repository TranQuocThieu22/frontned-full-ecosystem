import { publicationDeclarationService } from "@/shared/APIs/publicationDeclarationService";
import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { MRT_TableInstance } from "mantine-react-table";

interface Props {
    values: SRMPublicationDeclaration[],
    table: MRT_TableInstance<SRMPublicationDeclaration>
    isFetchingTable?: boolean
}

export default function DeclareNewPublicationDeleteList({ values, table, isFetchingTable }: Props) {
    return (
        <CustomButtonDeleteList
            loading={isFetchingTable}
            contextData={values.map((item: SRMPublicationDeclaration) => item.code).join(", ")}
            onSubmit={() => publicationDeclarationService.deleteListIds(values.map((item) => item.id!))}
            onSuccess={() => { table.resetRowSelection() }}
        />
    );
}
