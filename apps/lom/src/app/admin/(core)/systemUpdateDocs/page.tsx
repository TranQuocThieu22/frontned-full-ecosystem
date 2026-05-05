"use client"

import { object_documentTypes } from "@/constants/object/object_documentTypes"
import { F_systemUpdateDocs } from "@aq-fe/core-ui/features/core/systemUpdateDocs/F_systemUpdateDocs"
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent"

export default function Page() {
    return (
        <CustomPageContent>
            <F_systemUpdateDocs RefinementTypeId={object_documentTypes.Refinement} />
        </CustomPageContent>
    )
}
