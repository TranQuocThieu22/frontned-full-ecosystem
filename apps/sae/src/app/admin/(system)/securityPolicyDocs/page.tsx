"use client"
import { object_documentTypes } from "@/constants/object/object_documentTypes";
import { F_securityPolicyDocs } from "@aq-fe/core-ui/features/core/securityPolicyDocs/F_securityPolicyDocs";

export default function Page() {
    return (
        <F_securityPolicyDocs SecurityTypeId={object_documentTypes.Security} />
    )
}
