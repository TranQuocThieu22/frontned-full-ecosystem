"use client"
import { documentTypesObject } from '@/shared/consts/object/documentTypesObject'
import { FormTemplateDocsLayout } from '@aq-fe/core-ui/features/core/formTemplateDocs/FormTemplateDocsLayout'


export default function Page() {
    return (
        <FormTemplateDocsLayout documentType={documentTypesObject.Form} />
    )
}
