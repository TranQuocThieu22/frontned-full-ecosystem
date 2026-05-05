"use client"
import { object_documentTypes } from '@/constants/object/object_documentTypes'
import { F_organizationPolicyDocs } from '@aq-fe/core-ui/features/core/organizationPolicyDocs/F_organizationPolicyDocs'
import { CustomPageContent } from '@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent'

export default function Page() {
    return (
        <CustomPageContent>
            <F_organizationPolicyDocs RegulationsTypeId={object_documentTypes.Regulations} />
        </CustomPageContent>
    )
}
