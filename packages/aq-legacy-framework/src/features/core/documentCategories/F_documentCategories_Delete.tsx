'use client'

import { documentAttributeService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentAttributeService"
import { CustomActionIconSafeDelete } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomActionIconSafeDelete"
import { DocumentAttribute } from "@aq-fe/aq-legacy-framework/shared/interfaces/DocumentAttribute"

export function F_documentCategories_Delete({ value, context }: { value: DocumentAttribute, context?: string }) {
    return (
        <CustomActionIconSafeDelete
            contextData={context}
            onSubmit={() => documentAttributeService.safeDelete(value)}
        />
    )
}
