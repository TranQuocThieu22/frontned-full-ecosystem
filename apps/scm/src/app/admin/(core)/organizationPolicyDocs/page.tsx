"use client"
import { const_object_documentTypes } from '@/const'
import { MyPageContent } from 'aq-fe-framework/components'
import { F_organizationPolicyDocs } from 'aq-fe-framework/modules-features'

export default function Page() {
    return (
        <MyPageContent>
            <F_organizationPolicyDocs RegulationsTypeId={const_object_documentTypes.Regulations} />
        </MyPageContent>
    )
}
