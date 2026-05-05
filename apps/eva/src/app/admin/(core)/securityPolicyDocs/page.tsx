'use client'

import { documentTypesObject } from "@/shared/consts/object/documentTypesObject"
import { F_securityPolicyDocs } from "aq-fe-framework/modules-features"

export default function Page() {
    return (
        <F_securityPolicyDocs SecurityTypeId={documentTypesObject.Security} />
    )
}
