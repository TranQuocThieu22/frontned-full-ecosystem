"use client"

import { documentTypesObject } from "@/shared/consts/object/documentTypesObject"
import { F_organizationPolicyDocs } from "@aq-fe/core-ui/features/core/organizationPolicyDocs/F_organizationPolicyDocs"

export default function Page() {
    return (
        <F_organizationPolicyDocs RegulationsTypeId={documentTypesObject.Regulations} />
    )
}
