'use client'

import { service_department } from "@/api/services/service_department";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function WorkingUnitDepartmentDeleteButton({ code, id }: { code: string, id: number }) {
    return <CustomActionIconDelete contextData={code} onSubmit={
        async () =>
            await service_department.delete(id)
    } />
}
