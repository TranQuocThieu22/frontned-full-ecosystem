'use client'

import { documentTypesObject } from "@/shared/constants/object/DocumentTypesObject"
import { F_securityPolicyDocs } from "@aq-fe/core-ui/features/core/securityPolicyDocs/F_securityPolicyDocs"

export default function Page() {
    return (
        <F_securityPolicyDocs SecurityTypeId={documentTypesObject.Security} />
    )
}
