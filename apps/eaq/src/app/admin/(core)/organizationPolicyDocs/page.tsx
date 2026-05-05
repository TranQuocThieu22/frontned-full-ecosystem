"use client"

import { F_organizationPolicyDocs } from "@aq-fe/core-ui/features/core/organizationPolicyDocs/F_organizationPolicyDocs"
import { documentTypesObject } from "@/shared/constants/object/DocumentTypesObject"

export default function Page() {
    return (
        <F_organizationPolicyDocs RegulationsTypeId={documentTypesObject.Regulations} />
    )
}
