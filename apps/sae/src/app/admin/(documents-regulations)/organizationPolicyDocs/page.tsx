"use client"
import { object_documentTypes } from '@/constants/object/object_documentTypes'
import { F_organizationPolicyDocs } from '@aq-fe/core-ui/features/core/organizationPolicyDocs/F_organizationPolicyDocs'

export default function Page() {
    return (
        <F_organizationPolicyDocs RegulationsTypeId={object_documentTypes.Regulations} />
    )
}
