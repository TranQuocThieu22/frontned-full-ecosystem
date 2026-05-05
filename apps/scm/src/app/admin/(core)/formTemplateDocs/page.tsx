"use client"
import { const_object_documentTypes } from '@/const'
import { MyPageContent } from 'aq-fe-framework/components'
import { F_formTemplateDocs } from 'aq-fe-framework/modules-features'

export default function Page() {
    return (
        <MyPageContent >
            <F_formTemplateDocs FormTypeId={const_object_documentTypes.Form} />
        </MyPageContent>
    )
}
