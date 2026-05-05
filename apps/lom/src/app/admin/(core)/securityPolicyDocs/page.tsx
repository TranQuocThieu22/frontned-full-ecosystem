'use client'

import { object_documentTypes } from "@/constants/object/object_documentTypes"
import { F_securityPolicyDocs } from "@aq-fe/core-ui/features/core/securityPolicyDocs/F_securityPolicyDocs"
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent"

export default function Page() {
    return (
        <CustomPageContent>
            <F_securityPolicyDocs SecurityTypeId={object_documentTypes.Security} />
        </CustomPageContent>
    )
}
