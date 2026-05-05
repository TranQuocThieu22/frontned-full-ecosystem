'use client'

import { documentAttributeService } from "@aq-fe/core-ui/shared/APIs/documentAttributeService"
import { CustomActionIconSafeDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconSafeDelete"
import { DocumentAttribute } from "@aq-fe/core-ui/shared/interfaces/DocumentAttribute"

export function F_documentCategories_Delete({ value, context }: { value: DocumentAttribute, context?: string }) {
    return (
        <CustomActionIconSafeDelete
            contextData={context}
            onSubmit={() => documentAttributeService.safeDelete(value)}
        />
    )
}
