"use client"

import { object_documentTypes } from "@/constants/object/object_documentTypes"
import { MyPageContent } from "aq-fe-framework/components"
import { F_systemUpdateDocs } from "aq-fe-framework/modules-features"

export default function Page() {
    return (

        <F_systemUpdateDocs RefinementTypeId={object_documentTypes.Refinement} />

    )
}
