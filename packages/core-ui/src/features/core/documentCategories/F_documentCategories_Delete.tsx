'use client'

import { documentAttributeService } from "@aq-fe/core-ui/shared/APIs/documentAttributeService"
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete"

export function F_documentCategories_Delete({ id, context }: { id: number, context?: string }) {
    return (
        <CustomActionIconDelete
            // onSubmit={
            //     async () => await baseAxios.post("/DocumentAttribute/Delete", { id: id })
            // }
            contextData={context}
            onSubmit={() => documentAttributeService.delete(id)}
        />
    )
}
