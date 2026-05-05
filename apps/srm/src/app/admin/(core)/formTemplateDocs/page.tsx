"use client"
import { documentTypesObject } from '@/shared/consts/object/documentTypesObject'
import { F_formTemplateDocs } from '@aq-fe/core-ui/features/core/formTemplateDocs/F_formTemplateDocs'

export default function Page() {
    return (
        <F_formTemplateDocs FormTypeId={documentTypesObject.Form} />
    )
}
