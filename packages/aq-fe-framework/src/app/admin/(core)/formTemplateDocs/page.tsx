"use client"
import { F_formTemplateDocs } from '@/modules-features/admin/core/formTemplateDocs/F_formTemplateDocs'
import { documentTypesObject } from '@/shared/consts/documentTypesObject'

export default function Page() {
    return (
        <F_formTemplateDocs FormTypeId={documentTypesObject.Form} />
    )
}
