"use client"
import { object_documentTypes } from '@/constants/object/object_documentTypes'
import { MyPageContent } from 'aq-fe-framework/components'
import { F_formTemplateDocs } from 'aq-fe-framework/modules-features'

export default function Page() {
    return (
        <MyPageContent >
            <F_formTemplateDocs FormTypeId={object_documentTypes.Form} />
        </MyPageContent>
    )
}
