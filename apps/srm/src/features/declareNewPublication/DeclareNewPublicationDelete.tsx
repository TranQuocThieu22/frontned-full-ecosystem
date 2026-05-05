import { publicationDeclarationService } from "@/shared/APIs/publicationDeclarationService";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function DeclareNewPublicationDelete({ code, id }: { code: string, id: number }) {
    return (
        <CustomActionIconDelete
            onSubmit={() => publicationDeclarationService.delete(id)}
            contextData={code}
        />
    );
}