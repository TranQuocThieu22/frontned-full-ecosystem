'use client'

import { service_COECG } from "@/api/services/service_COECG";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";


export default function F_CLO_Tab1_Delete({ id, code }: { id: number, code: string }) {
    return <CustomActionIconDelete contextData={code} onSubmit={async () => await service_COECG.delete(id)}></CustomActionIconDelete>
}

