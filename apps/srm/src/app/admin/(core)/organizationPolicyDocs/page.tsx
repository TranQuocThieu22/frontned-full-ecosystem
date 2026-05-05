"use client"

import { documentTypesObject } from "@/shared/consts/object/documentTypesObject"
import { OrganizationPolicyDocsLayout } from "@aq-fe/core-ui/features/core/organizationPolicyDocs/OrganizationPolicyDocsLayout"

export default function Page() {
    return (
        <OrganizationPolicyDocsLayout documentType={documentTypesObject.Regulations} />
    )
}
