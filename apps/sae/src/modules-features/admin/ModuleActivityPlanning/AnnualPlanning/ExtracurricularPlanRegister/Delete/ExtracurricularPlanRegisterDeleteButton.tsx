'use client'

import { service_event } from "@/api/services/service_event";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function ExtracurricularPlanRegisterDeleteButton({ code, id, loading }: { code: string; id: number, loading?: boolean }) {
    return <CustomActionIconDelete contextData={code} onSubmit={async () => await service_event.delete(id)} actionIconProps={{ loading: loading }} />
}