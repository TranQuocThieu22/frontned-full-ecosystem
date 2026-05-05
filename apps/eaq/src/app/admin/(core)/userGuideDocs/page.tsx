"use client"

import { documentTypesObject } from "@/shared/constants/object/DocumentTypesObject"
import { F_userGuideDocs } from "@aq-fe/core-ui/features/core/userGuideDocs/F_userGuideDocs"

export default function Page() {
    return (
        <F_userGuideDocs GuidelineTypeId={documentTypesObject.Guideline} />
    )
}
