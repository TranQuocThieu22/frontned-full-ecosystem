import { service_event } from "@/api/services/service_event"
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete"

export default function MandatoryActivityCatalogButtonDelete({ code, id }: { code: string, id: number }) {
    return (
        <CustomActionIconDelete contextData={code} onSubmit={async () => await service_event.delete(id)} />
    )
}
