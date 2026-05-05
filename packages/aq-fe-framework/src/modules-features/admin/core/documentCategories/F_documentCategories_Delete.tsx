'use client'

import { documentAttributeService } from "@/APIs/documentAttributeService"
import { MyActionIconDelete } from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete"

export function F_documentCategories_Delete({ id, context }: { id: number, context?: string }) {
    return (
        <MyActionIconDelete
            // onSubmit={
            //     async () => await baseAxios.post("/DocumentAttribute/Delete", { id: id })
            // }
            contextData={context}
            onSubmit={() => documentAttributeService.delete(id)}
        />
    )
}
