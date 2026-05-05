"use client"
import { F_organizationPolicyDocs } from '@/modules-features/admin/core/organizationPolicyDocs/F_organizationPolicyDocs'
import { documentTypesObject } from '@/shared/consts/documentTypesObject'

export default function Page() {
    return (
        <F_organizationPolicyDocs RegulationsTypeId={documentTypesObject.Regulations} />
    )
}
