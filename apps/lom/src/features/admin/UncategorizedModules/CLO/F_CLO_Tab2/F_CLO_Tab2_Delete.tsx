'use client'

import { service_COECLO } from "@/api/services/service_COECLO";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function F_CLO_Tab2_Delete({ id, code }: { id: number, code: string }) {
    return <CustomActionIconDelete contextData={code} onSubmit={async () => await service_COECLO.delete(id)}></CustomActionIconDelete>
}

