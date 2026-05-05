import { service_standard } from "@/api/services/service_standard"
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete"

export default function EvaluationScoreButtonDelete({ code, id }: { code: string, id: number }) {
    return (
        <CustomActionIconDelete contextData={code} onSubmit={async () => await service_standard.delete(id)} />
    )
}
