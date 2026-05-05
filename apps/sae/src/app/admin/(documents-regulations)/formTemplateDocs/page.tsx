"use client"
import { object_documentTypes } from '@/constants/object/object_documentTypes'
import { F_formTemplateDocs } from '@aq-fe/core-ui/features/core/formTemplateDocs/F_formTemplateDocs'

export default function Page() {
    return (
        <F_formTemplateDocs FormTypeId={object_documentTypes.Form} />
    )
}
