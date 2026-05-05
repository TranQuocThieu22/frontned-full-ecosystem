"use client"
import { object_documentTypes } from '@/constants/object/object_documentTypes'
import { F_formTemplateDocs } from '@aq-fe/core-ui/features/core/formTemplateDocs/F_formTemplateDocs'
import { CustomPageContent } from '@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent'

export default function Page() {
    return (
        <CustomPageContent >
            <F_formTemplateDocs FormTypeId={object_documentTypes.Form} />
        </CustomPageContent>
    )
}
