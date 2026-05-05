"use client"

import { object_documentTypes } from "@/constants/object/object_documentTypes"
import { MyPageContent } from "aq-fe-framework/components"
import { F_organizationPolicyDocs } from "aq-fe-framework/modules-features"

export default function Page() {
    return (

        <F_organizationPolicyDocs RegulationsTypeId={object_documentTypes.Regulations} />

    )
}
