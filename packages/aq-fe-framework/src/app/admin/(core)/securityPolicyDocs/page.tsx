'use client'
import { F_securityPolicyDocs } from "@/modules-features/admin/core/securityPolicyDocs/F_securityPolicyDocs";
import { documentTypesObject } from "@/shared/consts/documentTypesObject";

export default function Page() {
    return (
        <F_securityPolicyDocs SecurityTypeId={documentTypesObject.Security} />
    )
}
