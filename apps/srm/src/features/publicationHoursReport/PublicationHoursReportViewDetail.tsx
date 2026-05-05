import { publicationDeclarationService } from "@/shared/APIs/publicationDeclarationService"
import Shared_PublicationDeclarationViewDetail from "@/shared/features/PublicationDeclaration/Shared_PublicationDeclarationViewDetail"
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery"

export default function PublicationHoursReportViewDetail({ publicationDeclarationId }: { publicationDeclarationId?: number }) {
    const query = useCustomReactQuery({
        queryKey: ['PublicationDeclaration', 'byId', publicationDeclarationId],
        axiosFn: () => publicationDeclarationService.getSRMPublicationDeclarationById({ SRMPublicationDeclarationId: publicationDeclarationId })
    })
    return (
        <Shared_PublicationDeclarationViewDetail
            data={query.data}
            loading={query.isLoading}
        />
    )
}
