"use client"
import { documentTypesObject } from '@/shared/consts/object/documentTypesObject'
import { F_userGuideDocs } from '@aq-fe/core-ui/features/core/userGuideDocs/F_userGuideDocs'

export default function Page() {
    return (
        <F_userGuideDocs GuidelineTypeId={documentTypesObject.Guideline} />
    )
}
